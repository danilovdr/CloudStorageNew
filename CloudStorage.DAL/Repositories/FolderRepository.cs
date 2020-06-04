using CloudStorage.DAL.Exceptions;
using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.DAL.Repositories
{
    public class FolderRepository : IRepository<FolderModel>
    {
        public FolderRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IApplicationDbContext _dbContext;

        public void Create(FolderModel item)
        {
            _dbContext.Folders.Add(item);
        }

        public void Delete(Guid id)
        {
            FolderModel folder = _dbContext.Folders.Find(id);
            if (folder == null)
                throw new FolderNotFoundException("Удаляемая папка не найдена");
            _dbContext.Folders.Remove(folder);
        }

        public IQueryable<FolderModel> Find(Func<FolderModel, bool> predicate)
        {
            return _dbContext.Folders.Where(predicate).AsQueryable();
        }

        public FolderModel Get(Guid id)
        {
            return _dbContext.Folders.Find(id);
        }

        public IQueryable<FolderModel> GetAll()
        {
            return _dbContext.Folders;
        }

        public void Update(FolderModel item)
        {
            _dbContext.Folders.Update(item);
        }
    }
}
