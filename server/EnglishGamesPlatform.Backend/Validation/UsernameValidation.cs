using System.Text.RegularExpressions;

namespace EnglishGamesPlatform.Backend.Validation
{
    static class UsernameValidation
    {
        // Regex: אותיות, ספרות, _, - ; אורך 3-20; לא מתחיל או נגמר ב-_ או -
        private static readonly Regex UsernameRegex = new Regex(
            @"^(?![_-])[A-Za-z0-9_-]{3,20}(?<![_-])$",
            RegexOptions.Compiled);

        public static bool IsValidUsername(this string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return false;

            return UsernameRegex.IsMatch(username);
        }
    }
}
