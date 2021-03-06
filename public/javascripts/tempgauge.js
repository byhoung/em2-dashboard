function Temp(placeholderName, configuration)
{

  this.placeholderName = placeholderName;
  var self = this;

  var pi = 2 * Math.PI;

  var degreeString = "00B0";
  var degreeSign = String.fromCharCode(parseInt(degreeString, 16));

  var curColor = "#ff5f24";
  var newColor,
      hold;

  this.configure = function(configuration)
  {
    this.config = configuration;

    this.config.size = this.config.size;
    this.config.raduis = this.config.size * 0.97 / 2;
    this.config.min = undefined !== configuration.min ? configuration.min : 0; 
    this.config.max = undefined !== configuration.max ? configuration.max : 100; 

    this.config.transitionDuration = configuration.transitionDuration || 500;

    this.config.gaugetype = configuration.gaugetype;
    this.config.coorx = configuration.coorx;
    this.config.coory = configuration.coory;
    this.config.cx = this.config.size / 2;
    this.config.cy = this.config.size / 2;
    this.config.inner = this.config.size / (25/9.5);
    this.config.outer = this.config.size / (25/12);
  };

  this.render = function()
  {
    var arc = d3.svg.arc()
          .innerRadius(this.config.inner)
          .outerRadius(this.config.outer)
          .startAngle(0);

    gParent = gBody.append("g")
                .attr("transform", "translate(" + this.config.coorx + "," + this.config.coory + ")")
                .attr("class", "tempContainer");
    
    this.body = gParent.append("g")
                .attr("id", this.config.label + "Temp")
                .attr("class", "temp");

    this.body
                .append("path")
                .datum({endAngle: pi})
                .attr("fill", defaultColor())
                .attr("d", arc);

    this.body
                .append("path")
                .datum({endAngle: this.valueToRadians(this.config.min)})
                .attr("fill", inactive())
                .attr("class", "foreground")
                .attr("d", arc);

    var fontSize = Math.round(this.config.size / 16);
    var point1 = this.valueToPoint(0, 0.7);
    var point2 = this.valueToPoint(0, 0.95);
    this.body.append("svg:line")
                .attr("class", "peak")
                .attr("x1", point1.x)
                .attr("y1", point1.y)
                .attr("x2", point2.x)
                .attr("y2", point2.y)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 1);

    this.body
                .append("circle")
                .attr("class", "pointerContainer")
                .attr("fill", "#dfdfdf")
                .attr("r", this.config.inner)
                .attr("r", this.config.inner)
                .attr("filter", "url(#dropshadow)")
                .attr("fill", "url(#gradient)");

    var midValue = (this.config.min + this.config.max) / 2;

    fontSize = Math.round(this.config.size / 8);
    this.body
                .append("text")
                .attr("x", this.config.cx - (this.config.cx))
                .attr("y", this.config.cy - (this.config.cy * 1.35))
                    .attr("text-anchor", "middle")
                    .style("font-size", fontSize + "px")
                    .text(this.config.label);

    fontSize = Math.round(this.config.size / 3);
    var current = this.body
                  .append("text")
                  .attr("x", this.config.cx - (this.config.cx * 0.92))
                  .attr("y", this.config.cy - (this.config.cy * 0.7))
                  .attr("class", "current")
                  .attr("text-anchor", "middle")
                  .style("font-size", fontSize + "px")
                  .text(this.config.min + degreeSign);

    //console.log(this.this.body.select("d"));
    this.redraw(this.config.min, 0, 500);
  };

    this.redraw = function(value, peak, duration)
    {
      var degreeValue = this.valueToDegrees(value);
      var pointerValue = this.valueToRadians(value);
      redrawSize = this.config.size;
      var arc = d3.svg.arc()
        .innerRadius(this.config.inner)
        .outerRadius(this.config.outer)
        .startAngle(0);

      if(value < 38) {
        newColor = colderColor();
      } else if(value >= 38 && value < 46) {
        newColor = coldColor();
      } else if(value >= 46 && value < 54) {
        newColor = coolerColor();
      } else if(value >= 54 && value < 62) {
        newColor = coolColor();
      } else if(value >= 62 && value < 70) {
        newColor = lessCoolColor();
      } else if(value >= 70 && value < 78) {
        newColor = lessWarmColor();
      } else if(value >= 78 && value < 86) {
        newColor = warmColor();
      } else if(value >= 86 && value < 94) {
        newColor = warmerColor();
      } else if(value >= 94 && value < 102) {
        newColor = hotColor();
      } else if(degreeValue >= 102) {
        newColor = hotterColor();
      }

      var tempValue = this.body.selectAll(".current");
      if(value === -1){
        tempValue
          .transition()
          .text('--');
      } else {
        tempValue
          .transition()
          .text(value + degreeSign);
      }
      this.body.select(".foreground")
        .transition()
        .duration(duration)
        .styleTween("fill", function()
        {
          return d3.interpolate(newColor, curColor); 
        })
        .call(arcTween, pointerValue);
        //record color
        hold = curColor; 
        curColor = newColor; 
        newColor = hold;

      function arcTween(transition, newAngle) 
      {
        transition.attrTween("d", function(d) 
        {
          var interpolate = d3.interpolate(d.endAngle, newAngle);
          return function(t) 
          {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        });
      }

      var point1 = this.valueToPoint(peak, 0.7);
      var point2 = this.valueToPoint(peak, 0.95);

      this.body.selectAll(".peak")
            .transition()
            .duration(duration)
            .delay(0)
            .attr("x1", point1.x)
            .attr("y1", point1.y)
            .attr("x2", point2.x)
            .attr("y2", point2.y)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1);

    };

    this.valueToDegrees = function(value)
    {
      return Math.floor(value / this.config.max * 360);
    };
  
    this.valueToRadians = function(value)
    {
      return this.valueToDegrees(value) * Math.PI / 180;
    };

    this.valueToPoint = function(value, factor)
    {
      return {  x: - this.config.raduis * factor * Math.cos(this.valueToRadians(value + 25)),
                y: - this.config.raduis * factor * Math.sin(this.valueToRadians(value + 25))     };
    };

  this.configure(configuration);  
}