using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.BLL.Services;
using CloudStorage.DAL.Context;
using CloudStorage.DAL.Interfaces.Context;
using CloudStorage.DAL.Interfaces.Interfaces;
using CloudStorage.DAL.Interfaces.Models;
using CloudStorage.DAL.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebApplication1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IFolderService, FolderService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IPermissionService, PermissionService>();

            services.AddTransient<IRepository<UserModel>, UserRepository>();
            services.AddTransient<IRepository<FolderModel>, FolderRepository>();
            services.AddTransient<IRepository<FolderPermissionModel>, FolderPermissionRepository>();
            services.AddTransient<IRepository<FileModel>, FileRepository>();
            services.AddTransient<IRepository<FilePermissionModel>, FilePermissionRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
             options.UseMySql(connectionString));

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);
            services.AddAuthorization();

            services.AddControllersWithViews();

            services.AddCors(options => options.AddPolicy("AllowLocalhost3000", builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
            );

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors("AllowLocalhost3000");

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = @"ClientApp\";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
