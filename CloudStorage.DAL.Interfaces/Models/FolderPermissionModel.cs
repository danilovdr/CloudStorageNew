using CloudStorage.DomainModels;
using System;

namespace CloudStorage.DAL.Interfaces.Models
{
    public class FolderPermissionModel : FolderPermission
    {
        public Guid FolderId { get; set; }
        public FolderModel Folder { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
    }
}
