using System;

namespace CloudStorage.BLL.Exceptions
{
    public class CreateFolderException : Exception
    {
        public CreateFolderException(string message)
            :base(message)
        { }
    }
}
