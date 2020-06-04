using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.DAL.Repositories
{
    public class FilePermissionRepository : IRepository<FilePermissionModel>
    {
        public FilePermissionRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IApplicationDbContext _dbContext;

        public void Create(FilePermissionModel item)
        {
            _dbContext.FilePermissions.Add(item);
        }

        public void Delete(Guid id)
        {
            FilePermissionModel filePermission = _dbContext.FilePermissions.Find(id);
            if (filePermission == null)
                throw new Exception();
            _dbContext.FilePermissions.Remove(filePermission);
        }

        public IQueryable<FilePermissionModel> Find(Func<FilePermissionModel, bool> predicate)
        {
            return _dbContext.FilePermissions.Where(predicate).AsQueryable();
        }

        public FilePermissionModel Get(Guid id)
        {
            return _dbContext.FilePermissions.Find(id);
        }

        public IQueryable<FilePermissionModel> GetAll()
        {
            return _dbContext.FilePermissions;
        }

        public void Update(FilePermissionModel item)
        {
            _dbContext.FilePermissions.Update(item);
        }
    }
}
