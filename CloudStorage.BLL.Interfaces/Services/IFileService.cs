using CloudStorage.BLL.Interfaces.DTO;
using System;
using System.Collections.Generic;

namespace CloudStorage.BLL.Interfaces.Services
{
    public interface IFileService
    {
        FileDTO CreateFile(FileDTO file, Guid userId);
        FileDTO UpdateFile(FileDTO file, Guid userId);
        void DeleteFile(Guid fileId, Guid userId);
        FileDTO GetFile(Guid fileId, Guid userId);
        List<FileDTO> GetMyFiles(Guid? parentId, Guid userId);
        List<FileDTO> GetSharedFiles(Guid? parentId, Guid userId);
    }
}
