using System;

namespace CloudStorage.DAL.Exceptions
{
    class FolderNotFoundException : Exception
    {
        public FolderNotFoundException(string message)
            : base(message)
        { }
    }
}
