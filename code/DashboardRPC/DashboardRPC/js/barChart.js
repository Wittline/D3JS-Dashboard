var barChart = function (container, source, params, charts, colorBar) {
    this.container = container;
    this.source = source;
    this.params = params;
    this.charts = charts;
    this.dataset = null;
    this.colorBar = colorBar;

    this.build = function (data) {

        var _this = this;
        if (colorBar == null || colorBar === '') { colorBar = 'white'; }

        $("#" + _this.container).empty();

        _this.dataset = JSON.parse(data);

        var margin = { top: 5, right: 0, bottom: 30, left: 30 },
            width = 700 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);


        var y = d3.scale.linear()
                   .range([height, 0]);


        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

        var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .ticks(5, 'BB');

        var svg = d3.select("#" + _this.container).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
              .call(responsiveChart)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(_this.dataset.map(function (d) { return d.Pais; }));
        y.domain([0, d3.max(_this.dataset, function (d) { return d.Barriles; })]);

        var textx = svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .attr("fill", "white")
                    .call(xAxis)
                    .selectAll(".tick text")
                    .call(wrap, x.rangeBand());

        svg.append("g")
                .attr("class", "y axis")
                .attr("fill", "white")
                .call(yAxis);

        var bars = svg.selectAll(".bar")
                      .data(_this.dataset)
                      .enter()
                      .append("rect")
                      .attr("fill", _this.colorBar)
                      .attr("x", function (d) { return x(d.Pais) })
                      .attr("width", x.rangeBand())
                      .attr("y", function (d) { return height; })
                      .attr("height", 0)
                      .on("click", click);


        var rect = bars.transition()
                        .delay(50)
                        .attr("height", function (d) { return height - y(d.Barriles); })
                        .attr("y", function (d) { return y(d.Barriles); })
                        .duration(500);



        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1,
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em")
                                    .text(word);
                    }
                }
            });
        }

        function click(d, i)
        {
            initChildChart(d.Pais, i);

        }

        initChildChart(_this.dataset[0].Pais, 0);



        function initChildChart(d, i) {

            if (_this.hasOwnProperty("charts")) {
                switch (_this.charts[0].type) {
                    case 'line':
                        var obj = JSON.parse(_this.charts[0].params);
                        obj.by = d;

                        var lc = new lineChart(_this.charts[0].container,
                                              _this.charts[0].source,
                                              JSON.stringify(obj),
                                              _this.charts[0].charts,
                                               _this.colorBar)
                        lc.buildChart();
                        break;
                }
            }
        }

        function responsiveChart(svg) {
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