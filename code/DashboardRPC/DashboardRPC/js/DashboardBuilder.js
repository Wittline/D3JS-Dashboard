var DashboardBuilder = function ()
{
  
    this.buildDashBoard = function (ctx)
    {       
        var _this = this;
        if (!typeof ctx == 'object') return false;

        if (ctx.hasOwnProperty('charts'))
        {
            var chr = ctx['charts'];
            for (var p = 0; p < chr.length; p++)
            {
                switch (chr[p].type) {
                     
                    case 'pie':
                        var pc = new pieChart(chr[p].container,
                                              chr[p].source,
                                              chr[p].params,
                                              chr[p].charts);
                        pc.buildChart();
                        break;
                    case 'bar':
                        break;
                    case 'line':
                        break;
                }
            }

        }

    }
}