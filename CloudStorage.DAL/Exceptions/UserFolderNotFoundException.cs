using System;

namespace CloudStorage.DAL.Exceptions
{
    class UserFolderNotFoundException : Exception
    {
        public UserFolderNotFoundException(string message)
            : base(message)
        { }
    }
}
