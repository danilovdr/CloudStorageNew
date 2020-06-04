using System;
using System.Linq;

namespace CloudStorage.DAL.Interfaces.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T Get(Guid id);
        IQueryable<T> Find(Func<T, bool> predicate);
        void Create(T item);
        void Update(T item);
        void Delete(Guid id);
    }
}
