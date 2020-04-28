var lineChart = function (container, source, params, charts, colorLine) {
    this.container = container;
    this.source = source;
    this.params = params;
    this.charts = charts;
    this.dataset = null;
    this.colorLine = colorLine;


    this.build = function (data) {
        
        var _this = this;

        _this.dataset = JSON.parse(data);
        if (colorLine == null || colorLine === '') { colorLine = 'white'; }

        $("#" + _this.container).empty();

        var margin = { top: 10, right: 20, bottom: 40, left: 40 },
            width = 500 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;


        
        var minDate = _this.dataset[0].Año;
        var maxDate = _this.dataset[_this.dataset.length - 1].Año;
        var objParam = JSON.parse(_this.params);     
        var xspace = objParam.yearTo - objParam.yearFrom;


        var x = d3.time.scale()
                .domain([minDate, maxDate])
                .range([0, width]);

        var y = d3.scale.linear()
                 //.domain([minDate, maxDate])
                 .domain([d3.min(_this.dataset, function (d) { return d.Barriles; }), d3.max(_this.dataset, function (d) { return d.Barriles; })])
                 .range([height, 0]);

        var xAxis = d3.svg.axis()
                    .scale(x)
                    .ticks(xspace)
                    .orient("bottom")
                    .tickFormat(d3.format("d"))
                    .tickSubdivide(0);

        var yAxis = d3.svg.axis()
                    .scale(y)
                    .ticks(10)
                    .orient("left");

        var svg = d3.select("#" + _this.container).append("svg")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
            .call(responsiveChart)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var line = d3.svg.line()
                .x(function (d) { return x(d.Año); })
                .y(function (d) { return y(d.Barriles); });


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 9)
            .attr("x", 15)
            .attr("dy", "0.35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "middle");

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);


        svg.append("path")
            .attr("d", line(_this.dataset))
            .attr("stroke", _this.colorLine)
            .attr("stroke-width", "4")
            .attr("fill", "none");

        svg.selectAll(".dot")
                .data(_this.dataset)
                .enter()
                .append("circle")
                .attr("class", "point")
                .attr("cx", function (d) { return x(d.Año); })
                .attr("cy", function (d) { return y(d.Barriles); })
                .attr("r", 4)
                .attr("fill", "white")
                .attr("stroke", _this.colorLine)
                .attr("stroke-width", "2");


        function initChildChart(d, i){
            if (_this.hasOwnProperty("charts")) {
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