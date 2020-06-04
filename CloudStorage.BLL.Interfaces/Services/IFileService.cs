using CloudStorage.BLL.Interfaces.DTO;
using System;

namespace CloudStorage.BLL.Interfaces.Services
{
    public interface IFileService
    {
        FileDTO CreateFile(FileDTO file, Guid userId);
        FileDTO UpdateFile(FileDTO file, Guid userId);
        void DeleteFile(Guid fileId, Guid userId);
        FileDTO GetFile(Guid fileId, Guid userId);
    }
}
