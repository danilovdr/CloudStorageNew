using CloudStorage.DAL.Exceptions;
using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.DAL.Repositories
{
    public class UserRepository : IRepository<UserModel>
    {
        public UserRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IApplicationDbContext _dbContext;

        public IQueryable<UserModel> GetAll()
        {
            return _dbContext.Users;
        }

        public UserModel Get(Guid id)
        {
            return _dbContext.Users.Find(id);
        }

        public IQueryable<UserModel> Find(Func<UserModel, bool> predicate)
        {
            return _dbContext.Users.Where(predicate).AsQueryable();
        }

        public void Create(UserModel item)
        {
            _dbContext.Users.Add(item);
        }

        public void Update(UserModel item)
        {
            _dbContext.Users.Update(item);
        }

        public void Delete(Guid id)
        {
            UserModel user = _dbContext.Users.Find(id);
            if (user == null)
                throw new UserNotFoundException("Удаляемый пользователь не найден");
            _dbContext.Users.Remove(user);
        }
    }
}
