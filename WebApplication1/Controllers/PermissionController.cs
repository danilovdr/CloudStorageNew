using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.DomainModels;
using CloudStorage.WEB.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CloudStorage.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : Controller
    {
        public PermissionController(IPermissionService permissionService, IUserService userService)
        {
            _permissionService = permissionService;
            _userService = userService;
        }

        private readonly IPermissionService _permissionService;
        private readonly IUserService _userService;

        [Authorize]
        [HttpGet("file/{fileId}")]
        public IActionResult GetFilePermission(Guid fileId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            PermissionType permission = _permissionService.GetFilePermission(fileId, userId);
            return Json(permission);
        }

        [Authorize]
        [HttpPost("file/{fileId}")]
        public IActionResult SetFilePermission(Guid fileId, [FromBody] PermissionViewModel permissionViewModel)
        {
            PermissionType permission = ParsePermission(permissionViewModel.Permission);
            Guid ownerId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            Guid userId = _userService.GetUserId(permissionViewModel.Username);
            _permissionService.SetFilePermission(fileId, ownerId, userId, permission);
            return Ok();
        }

        [Authorize]
        [HttpGet("folder/{folderId}")]
        public IActionResult GetFolderPermission(Guid folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            PermissionType permission = _permissionService.GetFolderPermission(folderId, userId);
            return Json(permission);
        }

        [Authorize]
        [HttpPost("folder/{folderId}")]
        public IActionResult SetFolderPermission(Guid folderId, [FromBody] PermissionViewModel permissionViewModel)
        {
            PermissionType permission = ParsePermission(permissionViewModel.Permission);
            Guid ownerId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            Guid userId = _userService.GetUserId(permissionViewModel.Username);
            _permissionService.SetFolderPermission(folderId, ownerId, userId, permission);
            return Ok();
        }

        [Authorize]
        [HttpGet("folder/{folderId}/users")]
        public IActionResult GetUsersHasFolderPermission(Guid folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            List<User> accessUsers = _permissionService.GetUsersHaveFolderPermission(folderId, userId, PermissionType.Access);
            List<User> editUsers = _permissionService.GetUsersHaveFolderPermission(folderId, userId, PermissionType.Edit);
            return Json(new
            {
                Access = accessUsers,
                Edit = editUsers
            });
        }

        [Authorize]
        [HttpGet("file/{fileId}/users")]
        public IActionResult GetUsersHasFilePermission(Guid folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            List<User> accessUsers = _permissionService.GetUsersHaveFolderPermission(folderId, userId, PermissionType.Access);
            List<User> editUsers = _permissionService.GetUsersHaveFolderPermission(folderId, userId, PermissionType.Edit);
            return Json(new
            {
                Access = accessUsers,
                Edit = editUsers
            });
        }


        private PermissionType ParsePermission(string permission)
        {
            if (permission == "Access")
                return PermissionType.Access;
            else if (permission == "Edit")
                return PermissionType.Edit;
            else
                return PermissionType.None;
        }
    }
}
