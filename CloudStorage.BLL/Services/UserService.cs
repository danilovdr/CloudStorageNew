using CloudStorage.BLL.Exceptions;
using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using System;
using System.Linq;

namespace CloudStorage.BLL.Services
{
    public class UserService : IUserService
    {
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private IUnitOfWork _unitOfWork;

        public Guid Registration(string name, string password)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new Exception();

            if (string.IsNullOrWhiteSpace(password))
                throw new Exception();

            bool hasUser = _unitOfWork.UserRepository.Find(p => p.Name == name).Any();
            if (hasUser)
                throw new CreateUserException("Пользователь с таким именем уже существует", name);

            UserModel userModel = new UserModel()
            {
                Name = name,
                Password = password
            };

            _unitOfWork.UserRepository.Create(userModel);
            _unitOfWork.Save();
            return userModel.Id;
        }

        public void ChangePassword(Guid id, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception();

            UserModel userModel = _unitOfWork.UserRepository.Get(id);
            if (userModel == null)
                throw new Exception();

            userModel.Password = password;
            _unitOfWork.UserRepository.Update(userModel);
            _unitOfWork.Save();
        }

        public Guid GetUserId(string name)
        {
            UserModel userModel = _unitOfWork.UserRepository.Find(p => p.Name == name)
                .FirstOrDefault();
            if (userModel == null)
                throw new Exception();
            return userModel.Id;
        }

        public string GetUserName(Guid id)
        {
            UserModel user = _unitOfWork.UserRepository.Get(id);
            if (user == null)
                throw new Exception();
            return user.Name;
        }

        public bool HasUser(string name, string password)
        {
            return _unitOfWork.UserRepository
                .Find(p => p.Name == name && p.Password == password)
                .Any();
        }
    }
}
