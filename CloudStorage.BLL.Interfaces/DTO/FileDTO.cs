using System;

namespace CloudStorage.BLL.Interfaces.DTO
{
    public class FileDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid? ParentId { get; set; }
    }
}
