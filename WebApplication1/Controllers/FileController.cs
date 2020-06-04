using CloudStorage.BLL.Interfaces.DTO;
using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.WEB.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CloudStorage.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        private IFileService _fileService;

        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateFile(FileViewModel file)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            FileDTO fileDTO = new FileDTO()
            {
                Name = file.Name,
                Content = file.Content,
                ParentId = file.ParentId
            };
            fileDTO = _fileService.CreateFile(fileDTO, userId);
            return Json(fileDTO);
        }

        [Authorize]
        [HttpPost("update")]
        public IActionResult UpdateFile(FileViewModel file)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            FileDTO fileDTO = new FileDTO()
            {
                Id = (Guid)file.Id,
                Name = file.Name,
                Content = file.Content,
                ParentId = file.ParentId
            };
            fileDTO = _fileService.UpdateFile(fileDTO, userId);
            return Json(fileDTO);
        }

        [Authorize]
        [HttpGet("{fileId}")]
        public IActionResult GetFile(Guid fileId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            FileDTO file = _fileService.GetFile(fileId, userId);
            return Json(file);
        }

        [Authorize]
        [HttpDelete("{fileId}")]
        public IActionResult DeleteFile(Guid fileId)
        {
            Guid userId = Guid.Parse(HttpContext.User.Identity.GetUserId());
            _fileService.DeleteFile(fileId, userId);
            return Ok();
        }
    }
}
