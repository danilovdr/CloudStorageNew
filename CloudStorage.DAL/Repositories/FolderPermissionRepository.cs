using CloudStorage.DAL.Exceptions;
using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.DAL.Repositories
{
    public class FolderPermissionRepository : IRepository<FolderPermissionModel>
    {
        public FolderPermissionRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IApplicationDbContext _dbContext;

        public IQueryable<FolderPermissionModel> GetAll()
        {
            return _dbContext.FolderPermissions;
        }

        public FolderPermissionModel Get(Guid id)
        {
            return _dbContext.FolderPermissions.Find(id);
        }

        public IQueryable<FolderPermissionModel> Find(Func<FolderPermissionModel, bool> predicate)
        {
            return _dbContext.FolderPermissions.Where(predicate).AsQueryable();
        }

        public void Create(FolderPermissionModel item)
        {
            _dbContext.FolderPermissions.Add(item);
        }

        public void Update(FolderPermissionModel item)
        {
            _dbContext.FolderPermissions.Update(item);

        }

        public void Delete(Guid id)
        {
            FolderPermissionModel folderPermission = _dbContext.FolderPermissions.Find(id);
            if (folderPermission == null)
                throw new UserFolderNotFoundException("Удалямая запись о пользователе-папке не найдена");
            _dbContext.FolderPermissions.Remove(folderPermission);
        }
    }
}
