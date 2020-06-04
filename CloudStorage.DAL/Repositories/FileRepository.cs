using CloudStorage.DAL.Exceptions;
using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.DAL.Repositories
{
    public class FileRepository : IRepository<FileModel>
    {
        public FileRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IApplicationDbContext _dbContext;

        public IQueryable<FileModel> GetAll()
        {
            return _dbContext.Files;
        }

        public FileModel Get(Guid id)
        {
            return _dbContext.Files.Find(id);
        }

        public IQueryable<FileModel> Find(Func<FileModel, bool> predicate)
        {
            return _dbContext.Files.Where(predicate).AsQueryable();
        }

        public void Create(FileModel item)
        {
            _dbContext.Files.Add(item);
        }

        public void Update(FileModel item)
        {
            _dbContext.Files.Update(item);
        }

        public void Delete(Guid id)
        {
            FileModel file = _dbContext.Files.Find(id);
            if (file == null)
                throw new FileNotFoundException("Удаляемый файл не найден");
            _dbContext.Files.Remove(file);
        }
    }
}
