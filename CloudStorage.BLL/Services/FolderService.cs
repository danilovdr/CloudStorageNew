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

        public List<FolderDTO> GetUserFolders(Guid? parentId, Guid userId)
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
            List<FolderPermissionModel> fpm = _unitOfWork.FolderPermissionRepository
              .Find(p =>
                p.Folder.Parent.Id == parentId &&
                p.User.Id == userId &&
                p.Value != PermissionType.None)
              .ToList();

            foreach (FolderPermission folder in fpm)
            {
                FolderModel folderModel = _unitOfWork.FolderRepository.Get(folder.Id);
                FolderDTO folderDTO = new FolderDTO()
                {
                    Id = folderModel.Id,
                    Name = folderModel.Name,
                    ParentId = folderModel.ParentId
                };
                folders.Add(folderDTO);
            }
            return folders;
        }

        public List<FileDTO> GetUserFiles(Guid? parentId, Guid userId)
        {
            List<FileDTO> files = new List<FileDTO>();
            List<FileModel> fileModels = _unitOfWork.FileRepository
                .Find(p =>
                p.OwnerId == userId &&
                p.ParentId == parentId)
                .ToList();

            foreach (FileModel file in fileModels)
            {
                FileDTO fileDTO = new FileDTO()
                {
                    Id = file.Id,
                    Name = file.Name,
                    Content = file.Content,
                    ParentId = file.ParentId
                };
                files.Add(fileDTO);
            }
            return files;
        }

        public List<FileDTO> GetSharedFiles(Guid? parentId, Guid userId)
        {
            List<FileDTO> files = new List<FileDTO>();
            List<FilePermissionModel> fpm = _unitOfWork.FilePermissionRepository
             .Find(p =>
             p.File.ParentId == parentId &&
             p.UserId == userId &&
             p.Value != PermissionType.None)
             .ToList();

            foreach (FilePermissionModel file in fpm)
            {
                FileModel fileModel = _unitOfWork.FileRepository.Get(file.Id);
                FileDTO folderDTO = new FileDTO()
                {
                    Id = fileModel.Id,
                    Name = fileModel.Name,
                    Content = fileModel.Content,
                    ParentId = fileModel.ParentId
                };
                files.Add(folderDTO);
            }
            return files;
        }
    }
}
