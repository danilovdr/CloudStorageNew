using System;

namespace CloudStorage.DAL.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message)
            :base(message)
        { }
    }
}
