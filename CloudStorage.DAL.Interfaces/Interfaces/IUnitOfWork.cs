using CloudStorage.DAL.Interfaces.Models;

namespace CloudStorage.DAL.Interfaces.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<UserModel> UserRepository { get; }
        IRepository<FolderModel> FolderRepository { get; }
        IRepository<FolderPermissionModel> FolderPermissionRepository { get; }
        IRepository<FileModel> FileRepository { get; }
        IRepository<FilePermissionModel> FilePermissionRepository { get; }

        void Save();

    }
}
