using System;

namespace CloudStorage.BLL.Interfaces.DTO
{
    public class FolderDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? ParentId { get; set; }
    }
}
