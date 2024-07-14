using Microsoft.AspNetCore.Http;

namespace Data_Access_Layer.Common
{
    public class DropDown
    {
        public int Value { get; set; }
        public string Text { get; set; }
    }

    public class UploadFile
    {
        public string ModuleName { get; set; }
        public IFormFile File { get; set; }

    }
}
