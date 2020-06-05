using CloudStorage.BLL.Interfaces.DTO;
using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using CloudStorage.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CloudStorage.BLL.Services
{
    public class FolderService : IFolderService
    {
        public FolderService(IUnitOfWork unitOfWork, IFileService fileService)
        {
            _unitOfWork = unitOfWork;
            _fileService = fileService;
        }

        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;

        public FolderDTO CreateFolder(FolderDTO folder, Guid userId)
        {
            UserModel owner = _unitOfWork.UserRepository.Get(userId);
            if (owner == null)
                throw new Exception();

            FolderModel folderModel = new FolderModel()
            {
                Name = folder.Name,
                Owner = owner
            };

            if (folder.ParentId == null)
            {
                folderModel.ParentId = null;
                folderModel.Parent = null;
            }
            else
            {
                FolderModel parent = _unitOfWork.FolderRepository.Get((Guid)folder.ParentId);
                if (parent == null)
                    throw new Exception();

                if (parent.OwnerId != userId)
                    throw new Exception();

                folderModel.ParentId = parent.Id;
                folderModel.Parent = parent;
            }

            _unitOfWork.FolderRepository.Create(folderModel);
            _unitOfWork.Save();
            return new FolderDTO()
            {
                Id = folderModel.Id,
                Name = folderModel.Name,
                ParentId = folderModel.ParentId
            };
        }

        public void DeleteFolder(Guid folderId, Guid userId)
        {
            FolderModel folderModel = _unitOfWork.FolderRepository.Get(folderId);
            if (folderModel == null)
                throw new Exception();

            if (folderModel.OwnerId != userId)
                throw new Exception();

            List<FileModel> files = _unitOfWork.FileRepository.Find(p => p.ParentId == folderId).ToList();
            foreach (FileModel file in files)
                _fileService.DeleteFile(file.Id, userId);

            List<FolderModel> folders = _unitOfWork.FolderRepository.Find(p => p.ParentId == folderId).ToList();
            foreach (FolderModel folder in folders)
                DeleteFolder(folder.Id, userId);

            _unitOfWork.FolderRepository.Delete(folderId);
            _unitOfWork.Save();
        }

        public List<FolderDTO> GetMyFolders(Guid? parentId, Guid userId)
        {
            List<FolderDTO> folders = new List<FolderDTO>();
            List<FolderModel> folderModels = _unitOfWork.FolderRepository
                .Find(p =>
                    p.OwnerId == userId &&
                    p.ParentId == parentId)
                .ToList();

            foreach (FolderModel folder in folderModels)
            {
                FolderDTO folderDTO = new FolderDTO()
                {
                    Id = folder.Id,
                    Name = folder.Name,
                    ParentId = folder.ParentId
                };
                folders.Add(folderDTO);
            }
            return folders;
        }

        public List<FolderDTO> GetSharedFolders(Guid? parentId, Guid userId)
        {
            List<FolderDTO> folders = new List<FolderDTO>();
            List<FolderPermissionModel> folderPermissions = _unitOfWork.FolderPermissionRepository
                .Find(p => p.UserId == userId)
                .ToList();

            foreach (FolderPermissionModel folderPermission in folderPermissions)
            {
                FolderModel folderModel = _unitOfWork.FolderRepository.Get(folderPermission.FolderId);
                if (folderModel.ParentId == parentId)
                {
                    FolderDTO folderDTO = new FolderDTO()
                    {
                        Id = folderModel.Id,
                        Name = folderModel.Name,
                        ParentId = folderModel.ParentId
                    };
                    folders.Add(folderDTO);
                }
            }

            return folders;
        }
    }
}
