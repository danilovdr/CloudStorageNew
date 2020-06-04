using System;

namespace CloudStorage.DomainModels
{
    public class FolderPermission
    {
        public Guid Id { get; set; }
        public PermissionType Value { get; set; }
    }
}
