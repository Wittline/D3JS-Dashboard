using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WorlRPCAPI.Api;
using WorlRPCAPI.Models;

namespace WorlRPCAPI.Controllers
{
    public class ConsumeController : ApiController
    {
        [HttpPost]
        public responseData consume(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getConsume(r.yearFrom, r.yearTo));
            }
            catch (Exception ex)
            {
                rd.error = ex.Message;
            }
            finally
            {

            }
            return rd;
        }


        [HttpPost]
        public responseData consumeByRegion(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getConsumeRegion(r.by, r.yearFrom, r.yearTo));
            }
            catch (Exception ex)
            {
                rd.error = ex.Message;
            }
            finally
            {

            }
            return rd;
        }

        [HttpPost]
        public responseData consumeByCountry(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getConsumeCountry(r.by, r.yearFrom, r.yearTo));
            }
            catch (Exception ex)
            {
                rd.error = ex.Message;
            }
            finally
            {

            }
            return rd;
        }
    }
}
