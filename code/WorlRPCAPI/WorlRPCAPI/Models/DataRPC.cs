using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorlRPCAPI.Models
{
    public static class DataRPC
    {

        internal static IEnumerable<Api.Data> getReserves(int p1, int p2)
        {
            using (var db = new WorldRPCEntities())
            {

                return (from q in db.getDataFromReserves(p1, p2)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Region = q.Región,
                            Porcentaje = q.Porcentaje
                        }
                         ).ToList();           
            }
        }

        internal static IEnumerable<Api.Data> getReservesRegion(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromReservesRegion(p2, p3, p1)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Pais = q.Pais
                        }
                          ).ToList();
            
            }
        }

        internal static IEnumerable<Api.Data> getReservesCountry(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromReservesCountry(p2, p3, p1)
                        select new Api.Data
                        {
                            Año = q.Año,
                            Barriles = q.Barriles
                        }).ToList();
            }
        }

        internal static IEnumerable<Api.Data> getProduction(int p1, int p2)
        {
            using (var db = new WorldRPCEntities())
            {

                return (from q in db.getDataFromProduction(p1, p2)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Region = q.Región,
                            Porcentaje = q.Porcentaje
                        }
                         ).ToList();
            }
        }

        internal static IEnumerable<Api.Data> getProductionRegion(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromProductionRegion(p2, p3, p1)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Pais = q.Pais
                        }
                          ).ToList();

            }
        }

        internal static IEnumerable<Api.Data> getProductionCountry(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromProductionCountry(p2, p3, p1)
                        select new Api.Data
                        {
                            Año = q.Año,
                            Barriles = q.Barriles
                        }).ToList();
            }
        }

        internal static IEnumerable<Api.Data> getConsume(int p1, int p2)
        {
            using (var db = new WorldRPCEntities())
            {

                return (from q in db.getDataFromConsume(p1, p2)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Region = q.Región,
                            Porcentaje = q.Porcentaje
                        }
                         ).ToList();
            }
        }

        internal static IEnumerable<Api.Data> getConsumeRegion(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromConsumeRegion(p2, p3, p1)
                        select new Api.Data
                        {
                            Barriles = q.Barriles,
                            Pais = q.Pais
                        }
                          ).ToList();

            }
        }

        internal static IEnumerable<Api.Data> getConsumeCountry(string p1, int p2, int p3)
        {
            using (var db = new WorldRPCEntities())
            {
                return (from q in db.getDataFromConsumeCountry(p2, p3, p1)
                        select new Api.Data
                        {
                            Año = q.Año,
                            Barriles = q.Barriles
                        }).ToList();
            }
        }
    }
}