using System;
using System.ComponentModel.DataAnnotations;

namespace CloudStorage.WEB.ViewModels
{
    public class FileViewModel
    {
        public Guid? Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid? ParentId { get; set; }
    }
}
