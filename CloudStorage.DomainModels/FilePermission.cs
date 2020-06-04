using System;

namespace CloudStorage.DomainModels
{
    public class FilePermission
    {
        public Guid Id { get; set; }
        public PermissionType Value { get; set; }
    }
}
