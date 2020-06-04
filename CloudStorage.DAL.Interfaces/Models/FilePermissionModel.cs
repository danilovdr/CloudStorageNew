using CloudStorage.DomainModels;
using System;

namespace CloudStorage.DAL.Interfaces.Models
{
    public class FilePermissionModel : FilePermission
    {
        public Guid FileId { get; set; }
        public FileModel File { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
    }
}
