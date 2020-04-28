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
    public class ProductionController : ApiController
    {

        [HttpPost]
        public responseData production(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getProduction(r.yearFrom, r.yearTo));
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
        public responseData productionByRegion(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getProductionRegion(r.by, r.yearFrom, r.yearTo));
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
        public responseData productionByCountry(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getProductionCountry(r.by, r.yearFrom, r.yearTo));
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
