
var yf = 2000,
 yt = 2016,
 urlReserves = 'http://localhost:8080/api/Reserves/reserves',
 urlReservesRegion = 'http://localhost:8080/api/Reserves/reservesByRegion',
urlReservesCountry = 'http://localhost:8080/api/Reserves/reservesByCountry',
urlProduction = 'http://localhost:8080/api/Production/production',
urlProductionRegion = 'http://localhost:8080/api/Production/productionByRegion',
urlProductionCountry = 'http://localhost:8080/api/Production/productionByCountry',
urlConsumption = 'http://localhost:8080/api/Consume/consume',
urlConsumptionRegion = 'http://localhost:8080/api/Consume/consumeByRegion',
urlConsumptionCountry = 'http://localhost:8080/api/Consume/consumeByCountry';


$(document).ready(function () {

    $('#sld').slider()
             .on('slideStop', function (ev) {
                 yf = parseInt(ev.value[0]);
                 yt = parseInt(ev.value[1]);
                 updateCharts();
             });

    updateCharts();
});

updateCharts = function ()
{

    obj = JSON.stringify({ yearFrom: yf, yearTo: yt, by: '' });

    var dsb = new DashboardBuilder();
    dsb.buildDashBoard({
        charts: [{
            type: 'pie', source: urlReserves, params: obj, container: 'pieChart_Reserves',
            charts: [{
                type: 'bar', source: urlReservesRegion, params: obj, container: 'barChart_Reserves',
                charts: [{ type: 'line', source: urlReservesCountry, params: obj, container: 'lineChart_Reserves' }]
            }]
        },
        {
            type: 'pie', source: urlProduction, params: obj, container: 'pieChart_Production',
            charts: [{
                type: 'bar', source: urlProductionRegion, params: obj, container: 'barChart_Production',
                charts: [{ type: 'line', source: urlProductionCountry, params: obj, container: 'lineChart_Production' }]
            }]
        },
        {
            type: 'pie', source: urlConsumption, params: obj, container: 'pieChart_Consumption',
            charts: [{
                type: 'bar', source: urlConsumptionRegion, params: obj, container: 'barChart_Consumption',
                charts: [{ type: 'line', source: urlConsumptionCountry, params: obj, container: 'lineChart_Consumption' }]
            }]
        }
        ]
    });
}