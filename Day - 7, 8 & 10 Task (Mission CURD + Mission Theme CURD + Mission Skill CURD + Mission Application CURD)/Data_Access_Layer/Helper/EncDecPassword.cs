using System.Text;

namespace Data_Access_Layer.Helper
{
    public static class EncDecPassword
    {
        public static string secretKey = "@123secretkeydontshare";

        public static string EncryptPassword(string password)
        {
            if(string.IsNullOrEmpty(password))
            {
                return "";
            }
            else
            {
                password = password + secretKey;
                var passwordInBytes = Encoding.UTF8.GetBytes(password);
                return Convert.ToBase64String(passwordInBytes);
            }
        }

        public static string DecryptPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return "";
            }
            else
            {
                var encodedBytes = Convert.FromBase64String(password);
                var actualPassword = Encoding.UTF8.GetString(encodedBytes);
                actualPassword = actualPassword.Substring(0, actualPassword.Length - secretKey.Length);
                return actualPassword;

            }
        }
    }
}
