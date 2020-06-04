using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using CloudStorage.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CloudStorage.BLL.Services
{
    public class PermissionService : IPermissionService
    {
        public PermissionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private readonly IUnitOfWork _unitOfWork;

        public PermissionType GetFolderPermission(Guid folderId, Guid userId)
        {
            FolderPermissionModel fpm = _unitOfWork.FolderPermissionRepository
                .Find(p => p.User.Id == userId && p.Folder.Id == folderId)
                .FirstOrDefault();
            return fpm == null ? PermissionType.None : fpm.Value;
        }

        public PermissionType GetFilePermission(Guid fileId, Guid userId)
        {
            FilePermissionModel fpm = _unitOfWork.FilePermissionRepository
                .Find(p => p.User.Id == userId && p.File.Id == fileId)
                .FirstOrDefault();
            return fpm == null ? PermissionType.None : fpm.Value;
        }

        public void SetFolderPermission(Guid folderId, Guid ownerId, Guid userId, PermissionType permission)
        {
            FolderModel folderModel = _unitOfWork.FolderRepository.Get(folderId);
            if (folderModel == null)
                throw new Exception();

            if (folderModel.OwnerId != ownerId)
                throw new Exception();

            UserModel userModel = _unitOfWork.UserRepository.Get(userId);
            if (userModel == null)
                throw new Exception();

            if (folderModel.OwnerId == userId)
                throw new Exception();

            FolderPermissionModel fpm = _unitOfWork.FolderPermissionRepository
                    .Find(p => p.UserId == userId && p.FolderId == folderId)
                    .FirstOrDefault();

            //Create
            if (permission != PermissionType.None && fpm == null)
            {
                fpm = new FolderPermissionModel()
                {
                    User = userModel,
                    Folder = folderModel,
                    Value = permission
                };
                _unitOfWork.FolderPermissionRepository.Create(fpm);
            }
            //Update
            else if (permission != PermissionType.None && fpm != null)
            {
                fpm.Value = permission;
                _unitOfWork.FolderPermissionRepository.Update(fpm);
            }
            //Delete
            else if (permission == PermissionType.None && fpm != null)
            {
                _unitOfWork.FolderPermissionRepository.Delete(fpm.Id);
            }
            _unitOfWork.Save();
        }

        public void SetFilePermission(Guid fileId, Guid ownerId, Guid userId, PermissionType permission)
        {
            FileModel fileModel = _unitOfWork.FileRepository.Get(fileId);
            if (fileModel == null)
                throw new Exception();

            if (fileModel.OwnerId != ownerId)
                throw new Exception();

            UserModel userModel = _unitOfWork.UserRepository.Get(userId);
            if (userModel == null)
                throw new Exception();

            if (fileModel.OwnerId == userId)
                throw new Exception();

            FilePermissionModel fpm = _unitOfWork.FilePermissionRepository
                    .Find(p => p.UserId == userId && p.FileId == fileId)
                    .FirstOrDefault();

            //Create
            if (permission != PermissionType.None && fpm == null)
            {
                fpm = new FilePermissionModel()
                {
                    User = userModel,
                    File = fileModel,
                    Value = permission
                };
                _unitOfWork.FilePermissionRepository.Create(fpm);
            }
            //Update
            else if (permission != PermissionType.None && fpm != null)
            {
                fpm.Value = permission;
                _unitOfWork.FilePermissionRepository.Update(fpm);
            }
            //Delete
            else if (permission == PermissionType.None && fpm != null)
            {
                _unitOfWork.FilePermissionRepository.Delete(fpm.Id);
            }
            _unitOfWork.Save();
        }

        public List<User> GetUsersHaveFolderPermission(Guid folderId, Guid ownerId, PermissionType permission)
        {
            UserModel userModel = _unitOfWork.UserRepository.Get(ownerId);
            if (userModel == null)
                throw new Exception();

            FolderModel folderModel = _unitOfWork.FolderRepository.Get(folderId);
            if (folderModel == null)
                throw new Exception();

            if (folderModel.OwnerId != ownerId)
                throw new Exception();

            List<FolderPermissionModel> folderPermissions = _unitOfWork.FolderPermissionRepository
                .Find(p => p.FolderId == folderId && p.Value == permission)
                .ToList();

            List<User> users = new List<User>();

            foreach (FolderPermissionModel folderPermission in folderPermissions)
            {
                UserModel user = _unitOfWork.UserRepository.Get(folderPermission.UserId);
                users.Add(user);
            }

            return users;
        }

        public List<User> GetUsersHaveFilePermission(Guid fileId, Guid ownerId, PermissionType permission)
        {
            throw new NotImplementedException();
        }
    }
}
