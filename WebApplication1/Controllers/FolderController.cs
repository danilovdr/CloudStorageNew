using CloudStorage.BLL.Interfaces.DTO;
using CloudStorage.BLL.Interfaces.Services;
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
    public class FolderController : Controller
    {
        public FolderController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        private readonly IFolderService _folderService;

        [Authorize]
        [HttpPost]
        public IActionResult CreateFolder(FolderViewModel folder)
        {
            Guid userGuid = Guid.Parse(HttpContext.User.Identity.GetUserId());
            FolderDTO folderDTO = new FolderDTO
            {
                Name = folder.Name,
                ParentId = folder.ParentId
            };
            folderDTO = _folderService.CreateFolder(folderDTO, userGuid);
            return Json(folderDTO);
        }


        [Authorize]
        [HttpGet("my/{folderId?}")]
        public IActionResult GetMyFolder(Guid? folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            List<FolderDTO> folders = _folderService.GetMyFolders(folderId, userId);
            return Json(folders);
        }

        [Authorize]
        [HttpGet("shared/{folderId?}")]
        public IActionResult GetSharedFolder(Guid? folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            List<FolderDTO> folders = _folderService.GetSharedFolders(folderId, userId);
            return Json(folders);
        }

        [Authorize]
        [HttpDelete("{folderId}")]
        public IActionResult DeleteFolder(Guid folderId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            _folderService.DeleteFolder(folderId, userId);
            return Ok();
        }
    }
}
