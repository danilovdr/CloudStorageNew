using CloudStorage.DomainModels;
using System;
using System.Collections.Generic;

namespace CloudStorage.BLL.Interfaces.Services
{
    public interface IPermissionService
    {
        void SetFolderPermission(Guid folderId, Guid ownerId, Guid userId, PermissionType permission);
        void SetFilePermission(Guid fileId, Guid ownerId, Guid userId, PermissionType permission);
        PermissionType GetFolderPermission(Guid folderId, Guid userId);
        PermissionType GetFilePermission(Guid fileId, Guid userId);
        List<User> GetUsersHaveFolderPermission(Guid folderId, Guid ownerId, PermissionType permission);
        List<User> GetUsersHaveFilePermission(Guid fileId, Guid ownerId, PermissionType permission);
    }
}
