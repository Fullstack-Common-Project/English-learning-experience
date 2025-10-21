
namespace EnglishGamesPlatform.Backend.Validation

{
    static class EmailValidation
    {

        public static bool IsValidEmail(this string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;
            try
            {

                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }

        }


    }
}
