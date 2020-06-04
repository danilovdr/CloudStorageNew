using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;

namespace CloudStorage.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public IRepository<UserModel> UserRepository { get; }
        public IRepository<FolderModel> FolderRepository { get; }
        public IRepository<FolderPermissionModel> FolderPermissionRepository { get; }
        public IRepository<FileModel> FileRepository { get; }
        public IRepository<FilePermissionModel> FilePermissionRepository { get; }

        public UnitOfWork(IApplicationDbContext dbContext, IRepository<UserModel> userRepository,
            IRepository<FolderModel> folderRepository, IRepository<FolderPermissionModel> userFolderRepository,
            IRepository<FileModel> fileRepository, IRepository<FilePermissionModel> userFileRepository)
        {
            _dbContext = dbContext;
            UserRepository = userRepository;
            FolderRepository = folderRepository;
            FolderPermissionRepository = userFolderRepository;
            FileRepository = fileRepository;
            FilePermissionRepository = userFileRepository;
        }

        private IApplicationDbContext _dbContext;

        public void Save()
        {
            _dbContext.Save();
        }
    }
}
