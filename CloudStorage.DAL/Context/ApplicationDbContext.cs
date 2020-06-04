using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Models;
using Microsoft.EntityFrameworkCore;

namespace CloudStorage.DAL.Context
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<FolderModel> Folders { get; set; }
        public DbSet<FileModel> Files { get; set; }
        public DbSet<FolderPermissionModel> FolderPermissions { get; set; }
        public DbSet<FilePermissionModel> FilePermissions { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //User
            modelBuilder.Entity<UserModel>()
                .ToTable("User")
                .HasKey(p => p.Id);

            //File
            modelBuilder.Entity<FileModel>()
                .ToTable("File")
                .HasKey(p => p.Id);

            modelBuilder.Entity<FileModel>()
                .HasOne(p => p.Owner)
                .WithMany(p => p.FileOwner)
                .HasForeignKey(p => p.OwnerId);

            modelBuilder.Entity<FileModel>()
                .HasOne(p => p.Creator)
                .WithMany(p => p.FileCreator)
                .HasForeignKey(p => p.CreatorId);

            modelBuilder.Entity<FileModel>()
                .HasOne(p => p.Parent)
                .WithMany(p => p.Files)
                .HasForeignKey(p => p.ParentId);

            //FilePermission
            modelBuilder.Entity<FilePermissionModel>()
                .ToTable("FilePermission")
                .HasKey(p => new { p.UserId, p.FileId });

            modelBuilder.Entity<FilePermissionModel>()
                .HasOne(p => p.User)
                .WithMany(p => p.FilePermissions)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<FilePermissionModel>()
                .HasOne(p => p.File)
                .WithMany(p => p.FilePermissions)
                .HasForeignKey(p => p.FileId);

            //Folder
            modelBuilder.Entity<FolderModel>()
              .ToTable("Folder")
              .HasKey(p => p.Id);

            modelBuilder.Entity<FolderModel>()
                .HasOne(p => p.Owner)
                .WithMany(p => p.FolderOwner)
                .HasForeignKey(p => p.OwnerId);

            modelBuilder.Entity<FolderModel>()
                .HasOne(p => p.Parent)
                .WithMany(p => p.Folders)
                .HasForeignKey(p => p.ParentId);

            //FolderPermission
            modelBuilder.Entity<FolderPermissionModel>()
                .ToTable("FolderPermission")
                .HasKey(p => new { p.UserId, p.FolderId });

            modelBuilder.Entity<FolderPermissionModel>()
                .HasOne(p => p.User)
                .WithMany(p => p.FolderPermissions)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<FolderPermissionModel>()
                .HasOne(p => p.Folder)
                .WithMany(p => p.FolderPermissions)
                .HasForeignKey(p => p.FolderId);
        }

        public void Save()
        {
            SaveChanges();
        }
    }
}
