var pieChart = function (container, source, params, charts)
{
    this.container = container;
    this.source = source;
    this.params = params;
    this.charts = charts;
    this.dataset = null;


    this.build = function (data) {
        var _this = this;
        _this.dataset = JSON.parse(data);

        var width = 350,
            height = 350,
            outerRadius = Math.min(width, height) / 2,
            innerRadius = outerRadius * .65,

            innerRadiusFinal = outerRadius * .6,
            color = d3.scale.category20();

        $('#' + _this.container).empty();

        var vis = d3.select('#' + _this.container)
                  .data([_this.dataset])
                  .append("svg:svg")
                    .attr("width", width)
                    .attr("height", height)
                    .call(responsiveChart)
                    .append("svg:g")
                      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");


        var pie = d3.layout.pie()
                    .value(function (d) { return d.Porcentaje; })
                    .padAngle(.02);

        var arc = d3.svg.arc()
                   .outerRadius(outerRadius)
                   .innerRadius(innerRadius);

        var arcFinal = d3.svg.arc()
           .innerRadius(innerRadiusFinal)
           .outerRadius(outerRadius);


        var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", click);

        arcs.append("svg:path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("d", arc)
                .append("svg:title")
                .text(function (d) { return d.data.Region + " (Barriles): " + d.data.Barriles; })


        d3.selectAll("g.slice").selectAll("path")
           .transition()
           .duration(750)
            .attrTween("d", function (d) {
                var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                }

            });

        arcs.filter(function (d) { return d.endAngle - d.startAngle > .15; })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ") rotate(" + angle(d) + ")";
        })
        .text(function (d) { return Math.round(d.data.Porcentaje * 100) / 100 + " %"; });


        var legendRectSize = 18;
        var legendSpacing = 4;

        var legend = vis.selectAll(".legend")
        .data(pie(_this.dataset))
        .enter()
        .append("g").attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -4 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

        legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d, i) {
            return color(i);
        });

        legend.append('text')
                .data(pie)
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function (d) { return d.data.Region; });

        function angle(d){

            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;

        }


        function mouseover()
        {
            d3.select(this).select("path").transition()
            .duration(500)
            .attr("d", arcFinal);
        }

        function mouseout() {
            d3.select(this).select("path").transition()
            .duration(500)
            .attr("d", arc);
        }

        function click(d, i)
        {
            initChildChart(d.data.Region, i);
        }

        initChildChart(_this.dataset[0].Region, 0);

        function initChildChart(d, i)
        {
            if (_this.hasOwnProperty("charts")){

                switch (_this.charts[0].type)
                {
                    case 'bar':
                        var obj = JSON.parse(_this.charts[0].params);
                        obj.by = d;
                        var bc = new barChart(
                                        _this.charts[0].container,
                                        _this.charts[0].source,
                                         JSON.stringify(obj),
                                        _this.charts[0].charts,
                                        color(i));

                        bc.buildChart();
                        break;                
                }

            }
        }

        function responsiveChart(svg)
        {
            var container = d3.select(svg.node().parentNode),
                w = parseInt(svg.style("width")),
                h = parseInt(svg.style("height")),
                aspect = w / h;

            svg.attr("viewBox", "0 0 " + w + " " + h)
               .attr("perserveAspectRatio", "xMinMid")
                .call(resize);

            d3.select(window).on("resize." + container.attr("id"), resize);

            function resize() {
                 
                var targetW = parseInt(container.style("width"));
                svg.attr("width", targetW);
                svg.attr("height", Math.round(targetW / aspect));
            }
        }

    }

    this.buildChart = function () {

        var _this = this;
        $.ajax({
            url: _this.source,
            crossDomain: true,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: _this.params,
            success: function (result) {
                _this.build(JSON.stringify(result.data));
            }
        });

    }

}

