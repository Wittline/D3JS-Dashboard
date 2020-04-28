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
    public class ReservesController : ApiController
    {
        [HttpPost]
        public responseData reserves(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getReserves(r.yearFrom, r.yearTo));
            }
            catch (Exception ex)
            {
                rd.error = ex.Message;
            }
            finally { 
            
            }
            return rd; 
        }


        [HttpPost]
        public responseData reservesByRegion(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getReservesRegion(r.by, r.yearFrom, r.yearTo));
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
        public responseData reservesByCountry(requestData r)
        {
            responseData rd = new responseData();
            try
            {
                rd.data.AddRange(DataRPC.getReservesCountry(r.by, r.yearFrom, r.yearTo));
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
