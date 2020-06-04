using System;

namespace CloudStorage.BLL.Interfaces.Services
{
    public interface IUserService
    {
        Guid Registration(string name, string password);
        bool HasUser(string name, string password);
        Guid GetUserId(string name);
        string GetUserName(Guid id);
        void ChangePassword(Guid id, string password);
    }
}
