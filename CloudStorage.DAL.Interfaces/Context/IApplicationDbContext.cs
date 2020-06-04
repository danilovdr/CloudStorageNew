using CloudStorage.DAL.Interfaces.Models;
using Microsoft.EntityFrameworkCore;

namespace CloudStorage.DAL.Interfaces.Context
{
    public interface IApplicationDbContext
    {
        DbSet<UserModel> Users { get; set; }
        DbSet<FileModel> Files { get; set; }
        DbSet<FolderModel> Folders { get; set; }
        DbSet<FolderPermissionModel> FolderPermissions { get; set; }
        DbSet<FilePermissionModel> FilePermissions { get; set; }
        void Save();
    }
}
