using System;

namespace CloudStorage.BLL.Exceptions
{
    class CreateUserException : Exception
    {
        public CreateUserException(string message, string value)
            : base(message)
        {
            Value = value;
        }

        public string Value { get; }
    }
}
