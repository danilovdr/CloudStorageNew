using CloudStorage.BLL.Interfaces.DTO;
using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using CloudStorage.DomainModels;
using System;
using System.ComponentModel;

namespace CloudStorage.BLL.Services
{
    public class FileService : IFileService
    {
        public FileService(IUnitOfWork unitOfWork, IPermissionService permissionService)
        {
            _unitOfWork = unitOfWork;
            _permissionService = permissionService;
        }

        private IUnitOfWork _unitOfWork;
        private IPermissionService _permissionService;

        public FileDTO CreateFile(FileDTO file, Guid userId)
        {
            if (file.Name == null)
                throw new Exception();

            UserModel creator = _unitOfWork.UserRepository.Get(userId);
            if (creator == null)
                throw new Exception();

            FileModel fileModel = new FileModel()
            {
                Name = file.Name,
                Content = file.Content,
                Creator = creator,
            };

            if (file.ParentId == null)
            {
                fileModel.ParentId = null;
                fileModel.Parent = null;
                fileModel.Owner = creator;

                _unitOfWork.FileRepository.Create(fileModel);
            }
            else
            {
                FolderModel parent = _unitOfWork.FolderRepository.Get((Guid)file.ParentId);
                if (parent == null)
                    throw new Exception();

                fileModel.ParentId = parent.Id;
                fileModel.Parent = parent;
                fileModel.Owner = parent.Owner;

                if (parent.OwnerId != userId)
                {
                    PermissionType permission = _permissionService.GetFolderPermission((Guid)file.ParentId, userId);
                    if (permission == PermissionType.None)
                        throw new Exception();
                }

                _unitOfWork.FileRepository.Create(fileModel);

                if (parent.OwnerId != userId)
                {
                    _permissionService.SetFilePermission(fileModel.Id, parent.OwnerId, userId, PermissionType.Edit);
                }
            }

            _unitOfWork.Save();
            return new FileDTO()
            {
                Id = fileModel.Id,
                Name = fileModel.Name,
                Content = fileModel.Content,
                ParentId = fileModel.ParentId
            };
        }

        public FileDTO UpdateFile(FileDTO file, Guid userId)
        {
            FileModel fileModel = _unitOfWork.FileRepository.Get(file.Id);
            if (fileModel == null)
                throw new Exception();

            if (fileModel.OwnerId != userId)
            {
                PermissionType permission = _permissionService.GetFilePermission(file.Id, userId);
                if (permission != PermissionType.Edit)
                    throw new Exception();
            }

            fileModel.Name = file.Name;
            fileModel.Content = file.Content;
            _unitOfWork.FileRepository.Update(fileModel);
            _unitOfWork.Save();
            return new FileDTO()
            {
                Id = fileModel.Id,
                Name = fileModel.Name,
                Content = fileModel.Content,
                ParentId = fileModel.ParentId
            };
        }

        public void DeleteFile(Guid fileId, Guid userId)
        {
            FileModel fileModel = _unitOfWork.FileRepository.Get(fileId);
            if (fileModel == null)
                throw new Exception();

            if (fileModel.OwnerId != userId)
            {
                PermissionType permission = _permissionService.GetFilePermission(fileId, userId);
                if (permission != PermissionType.Edit)
                    throw new Exception();
            }

            _unitOfWork.FileRepository.Delete(fileId);
            _unitOfWork.Save();
        }

        public FileDTO GetFile(Guid fileId, Guid userId)
        {
            FileModel fileModel = _unitOfWork.FileRepository.Get(fileId);
            if (fileModel == null)
                throw new Exception();

            if (fileModel.OwnerId != userId)
            {
                PermissionType permission = _permissionService.GetFilePermission(fileId, userId);
                if (permission == PermissionType.None)
                    throw new Exception();
            }

            return new FileDTO()
            {
                Id = fileModel.Id,
                Name = fileModel.Name,
                Content = fileModel.Content,
                ParentId = fileModel.ParentId
            };
        }
    }
}
