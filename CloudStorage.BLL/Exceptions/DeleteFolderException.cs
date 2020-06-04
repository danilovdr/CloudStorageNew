using System;

namespace CloudStorage.BLL.Exceptions
{
    public class DeleteFolderException : Exception
    {
        public DeleteFolderException(string message)
            :base(message)
        { }
    }
}
