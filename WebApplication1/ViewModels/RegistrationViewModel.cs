using System.ComponentModel.DataAnnotations;

namespace CloudStorage.WEB.ViewModels
{
    public class RegistrationViewModel
    {
        [Required (ErrorMessage = "Не указано имя пользователя")]
        public string Name { get; set; }
        [Required (ErrorMessage = "Не указан пароль")]
        public string Password { get; set; }
        [Required (ErrorMessage = "Не указано подтверждение пароля")]
        public string ConfirmPassword { get; set; }
    }
}
