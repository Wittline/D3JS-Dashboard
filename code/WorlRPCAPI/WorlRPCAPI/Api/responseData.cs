using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorlRPCAPI.Api
{
    public class responseData :responseError
    {
        public List<Data> data = new List<Data>();
    }
}