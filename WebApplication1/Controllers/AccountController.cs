using CloudStorage.BLL.Interfaces.Services;
using CloudStorage.WEB.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace CloudStorage.WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        private readonly IUserService _userService;

        [HttpPost("login")]
        public IActionResult Login(AuthorizeViewModel user)
        {
            Authenticate(user.Name, user.Password);
            return Json(user);
        }


        [HttpPost("register")]
        public IActionResult Register(RegistrationViewModel user)
        {
            _userService.Registration(user.Name, user.Password);
            Authenticate(user.Name, user.Password);
            return Json(user);
        }

        [Authorize]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet("isAuthorize")]
        public IActionResult IsAuthorize()
        {
            return Json(HttpContext.User.Identity.IsAuthenticated);
        }

        [Authorize]
        [HttpGet("getUsername")]
        public IActionResult GetUsername()
        {
            Guid id = Guid.Parse(HttpContext.User.Identity.GetUserId());
            string name = _userService.GetUserName(id);
            return Json(name);
        }

        private void Authenticate(string username, string password)
        {
            bool hasUser = _userService.HasUser(username, password);
            if (!hasUser)
                throw new Exception();

            ClaimsIdentity identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
            Guid userId = _userService.GetUserId(username);
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, userId.ToString()));
            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        }
    }
}
