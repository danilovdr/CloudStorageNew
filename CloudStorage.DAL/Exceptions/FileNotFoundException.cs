using System;

namespace CloudStorage.DAL.Exceptions
{
    class FileNotFoundException : Exception
    {
        public FileNotFoundException(string message)
            : base(message)
        { }
    }
}
