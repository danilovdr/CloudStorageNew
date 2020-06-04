using System;
using System.ComponentModel.DataAnnotations;

namespace CloudStorage.WEB.ViewModels
{
    public class FolderViewModel
    {
        public Guid? Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Guid? ParentId { get; set; }
    }
}
