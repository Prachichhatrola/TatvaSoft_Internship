using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Logic_Layer.Entity
{
    public class ResponseResult
    {
        public Object Data { get; set; }
        public string Message { get; set; }
        public ResponseStatus Result {  get; set; }
    }
    public enum ResponseStatus
    {
        Error,
        Success
    }
}
