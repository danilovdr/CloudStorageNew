using CloudStorage.DomainModels;
using System;
using System.Collections.Generic;

namespace CloudStorage.DAL.Interfaces.Models
{
    public class FolderModel : Folder
    {
        public Guid OwnerId { get; set; }
        public UserModel Owner { get; set; }
        public Guid? ParentId { get; set; }
        public FolderModel Parent { get; set; }

        public List<FolderModel> Folders { get; set; }
        public List<FileModel> Files { get; set; }
        public List<FolderPermissionModel> FolderPermissions { get; set; }
    }
}
