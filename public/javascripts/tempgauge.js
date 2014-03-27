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
    this.config.min = undefined != configuration.min ? configuration.min : 0; 
    this.config.max = undefined != configuration.max ? configuration.max : 100; 

    this.config.transitionDuration = configuration.transitionDuration || 500;

    this.config.gaugetype = configuration.gaugetype;
    this.config.coorx = configuration.coorx;
    this.config.coory = configuration.coory;
    this.config.cx = this.config.size / 2;
    this.config.cy = this.config.size / 2;
    this.config.inner = this.config.size / (25/9.5);
    this.config.outer = this.config.size / (25/12);
  }

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
                .attr("fill", "#dfdfdf")
                .attr("r", this.config.inner)
                .attr("r", this.config.inner)
                .attr("filter", "url(#dropshadow)");

    var midValue = (this.config.min + this.config.max) / 2;

    fontSize = Math.round(this.config.size / 8);
    this.body
                .append("text")
                .attr("x", this.config.cx - (this.config.cx * 0.98))
                .attr("y", this.config.cy - (this.config.cy * 1.2))
                    .attr("text-anchor", "middle")
                    .attr("fill", defaultColor())
                    .style("font-size", fontSize + "px")
                    .text(this.config.label);

    fontSize = Math.round(this.config.size / 3.2);
    var current = this.body
                  .append("text")
                  .attr("x", this.config.cx - (this.config.cx * 0.92))
                  .attr("y", this.config.cy - (this.config.cy * 0.6))
                  .attr("class", "current")
                  .attr("text-anchor", "middle")
                  .attr("fill", "#303030")
                  .style("font-size", fontSize + "px")
                  .text(this.config.min + degreeSign);

    //console.log(this.this.body.select("d"));
    this.redraw(this.config.min, 0);
  }

    


    this.redraw = function(value, peak)
    {
      var degreeValue = this.valueToDegrees(value);
      var pointerValue = this.valueToRadians(value);
      redrawSize = this.config.size;
      var arc = d3.svg.arc()
        .innerRadius(this.config.inner)
        .outerRadius(this.config.outer)
        .startAngle(0);


      switch(true)
            {
              case (degreeValue >= 270):
              //Hot
                newColor = hotColor();
                break;
              case (degreeValue >= 180):
              //Warm
                newColor = warmColor();
                break;
              case (degreeValue >= 90):
              //Cool
                newColor = coolColor();
                break;
              default:
              //Cold
                newColor = coldColor();

                break;
            }

      //var current = this.body.select(".tempContainer");

      this.body.select(".current")
        .transition()
        .text(value + degreeSign);

      this.body.select(".foreground")
        .transition()
        .duration(750)
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
            .duration(800)
            .delay(0)
            .attr("x1", point1.x)
            .attr("y1", point1.y)
            .attr("x2", point2.x)
            .attr("y2", point2.y)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1);

    }

    this.valueToDegrees = function(value)
    {
      return Math.floor(value / this.config.max * 360);
    }
  
    this.valueToRadians = function(value)
    {
      return this.valueToDegrees(value) * Math.PI / 180;
    }

    this.valueToPoint = function(value, factor)
    {
      return {  x: - this.config.raduis * factor * Math.cos(this.valueToRadians(value + 25)),
                y: - this.config.raduis * factor * Math.sin(this.valueToRadians(value + 25))     };
    }

  this.configure(configuration);  
}