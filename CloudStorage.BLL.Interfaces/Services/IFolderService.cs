using CloudStorage.BLL.Interfaces.DTO;
using System;
using System.Collections.Generic;

namespace CloudStorage.BLL.Interfaces.Services
{
    public interface IFolderService
    {
        FolderDTO CreateFolder(FolderDTO folder, Guid userId);
        void DeleteFolder(Guid folderId, Guid userId);
        List<FolderDTO> GetUserFolders(Guid? parentFolderId, Guid userId);
        List<FolderDTO> GetSharedFolders(Guid? parentFolderId, Guid userId);
        List<FileDTO> GetUserFiles(Guid? parentFolderId, Guid userId);
        List<FileDTO> GetSharedFiles(Guid? parentFolderId, Guid userId);
    }
}
