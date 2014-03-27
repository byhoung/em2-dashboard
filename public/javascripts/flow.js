function Flow(placeholderName, configuration)
{
	this.placeholderName = placeholderName;

	var pi = 2 * Math.PI;
	
	var self = this; // for internal d3 functions

	var degreeString = "00B0";

	var degreeSign = String.fromCharCode(parseInt(degreeString, 16));

	var curColor = "#ff5f24";
	var newColor,
	    hold;
	
	this.configure = function(configuration)
	{
		this.config = configuration;
		
		this.config.size = this.config.size * 0.9;
		
		this.config.raduis = this.config.size * 0.97 / 2;
		this.config.cx = this.config.size / 2;
		this.config.cy = this.config.size / 2;
		
		this.config.min = undefined != configuration.min ? configuration.min : 0; 
		this.config.max = undefined != configuration.max ? configuration.max : 100; 
		this.config.range = this.config.max - this.config.min;
		
		this.config.majorTicks = configuration.majorTicks || 5;
		this.config.minorTicks = configuration.minorTicks || 2;
		
		this.config.greenColor 	= configuration.greenColor || "#109618";
		this.config.yellowColor = configuration.yellowColor || "#FF9900";
		this.config.redColor 	= configuration.redColor || "#DC3912";
		
		this.config.transitionDuration = configuration.transitionDuration || 500;

		this.config.coorx = configuration.coorx;
		this.config.coory = configuration.coory;
	}
 
	this.render = function()
	{
		gParent = gBody.append("g")
	                .attr("transform", "translate(" + this.config.coorx + "," + this.config.coory + ")")
					.attr("class", "flowContainer");

		this.body = gParent.append("g")
					.attr("id", this.config.label + "Flow")
					.attr("class", "flow");

		gaugeContainer = this.body.append("circle")
					.attr("r", 0.9 * this.config.raduis)
					.attr("fill", defaultColor())
					//.attr("stroke", "#000")
					.attr("stroke-width", "0.5px");
		

					
		for (var index in this.config.greenZones)
		{
			this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, self.config.greenColor);
		}
		
		for (var index in this.config.yellowZones)
		{
			this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, self.config.yellowColor);
		}
		
		for (var index in this.config.redZones)
		{
			this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, self.config.redColor);
		}
		
		if (undefined != this.config.label)
		{
			var fontSize = Math.round(this.config.size / 6);
			this.body.append("svg:text")
						.attr("y", this.config.cy * -0.3)
						.attr("dy", fontSize / 6)
						.attr("text-anchor", "middle")
						.text(this.config.label)
						.style("font-size", fontSize + "px")
						.attr("fill", "#ffffff")
						.attr("stroke-width", "0px");
		}

		var fontSize = Math.round(this.config.size / 16);
			var point1 = this.valueToPoint(0, 0.7);
			var point2 = this.valueToPoint(0, 0.87);
			this.body.append("svg:line")
						.attr("class", "peak")
						.attr("x1", point1.x)
						.attr("y1", point1.y)
						.attr("x2", point2.x)
						.attr("y2", point2.y)
						.attr("stroke", "#ffffff")
						.attr("stroke-width", "1px");
										
		var pointerContainer = this.body
									.append("svg:g")
									.attr("class", "pointerContainer")
									.attr("filter", "url(#dropshadow)")
									.attr("transform", "translate(" + 0 + "," + 0 + ")");
		
		var midValue = (this.config.min + this.config.max) / 2;
		
		var pointerPath = this.buildPointerPath(midValue);
		
		var pointerLine = d3.svg.line()
									.x(function(d) { return d.x })
									.y(function(d) { return d.y })
									.interpolate("basis");

		
		pointerContainer.selectAll("path")
							.data([pointerPath])
							.enter()
								.append("svg:path")
									.attr("d", pointerLine)
									.attr("fill", "#dfdfdf")
									.style("fill-opacity", 1)

					
		pointerContainer.append("svg:circle")
							.attr("r", 0.7 * this.config.raduis)
							.attr("fill", "#dfdfdf")
							.style("opacity", 1);

		var fontSize = Math.round(this.config.size / 8.4);
		pointerContainer.append("text")
                .attr("x", this.config.cx - (this.config.cx * 0.98))
                .attr("y", this.config.cy - (this.config.cy * 1.25))
                    .attr("text-anchor", "middle")
                    .attr("fill", defaultColor())
                    .style("font-size", fontSize + "px")
                    .text(this.config.label);
		
		var fontSize = Math.round(this.config.size / 4.2);
		pointerContainer.append("svg:text") 
						.attr("x", this.config.cx - (this.config.cx * 1))
          				.attr("y", this.config.cy - (this.config.cy * 0.8))
						.attr("text-anchor", "middle")
						.attr("class", "current")
						.style("font-size", fontSize + "px")
						.attr("fill", "#303030");

		peakArc = d3.svg.arc()
						.startAngle(this.valueToRadians(this.config.min))
						.innerRadius(0.65 * this.config.raduis)
						.outerRadius(0.85 * this.config.raduis);
		
		this.redraw(this.config.min, 0);
	}
	
	this.buildPointerPath = function(value)
	{
		var delta = this.config.range / 13;
		
		var head = valueToPoint(value, 0.85);
		var head1 = valueToPoint(value - delta, 0.58);
		var head2 = valueToPoint(value + delta, 0.58);
		
		var tailValue = value - (this.config.range * (1/(270/360)) / 2);
		var tail = valueToPoint(tailValue, 0.28);
		var tail1 = valueToPoint(tailValue - delta, 0.12);
		var tail2 = valueToPoint(tailValue + delta, 0.12);
		
		return [head, head1, tail2, tail, tail1, head2, head];
		
		function valueToPoint(value, factor)
		{
			var point = self.valueToPoint(value, factor);
			point.x -= 0;
			point.y -= 0;
			return point;
		}
	}
	
	this.drawBand = function(start, end, color)
	{
		if (0 >= end - start) return;
		
		this.body.append("svg:path")
					.attr("fill", color)
					.attr("d", d3.svg.arc()
						.startAngle(this.valueToRadians(start))
						.endAngle(this.valueToRadians(end))
						.innerRadius(0.65 * this.config.raduis)
						.outerRadius(0.85 * this.config.raduis))
					.attr("transform", function() { return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(270)" });
	}
	
	
	this.redraw = function(value, peak)
	{
		var pointerContainer = this.body.select(".pointerContainer");
		
		pointerContainer.selectAll(".current").text(value);
		
		var pointer = pointerContainer.selectAll("path");
		pointer.transition()
					.duration(800)
					.delay(0)
					.ease("ease-in-out")
					.attrTween("transform", function()
					{
						var pointerValue = value;
						if (value > self.config.max) pointerValue = self.config.max + 0.02*self.config.range;
						else if (value < self.config.min) pointerValue = self.config.min - 0.02*self.config.range;
						var targetRotation = (self.valueToDegrees(pointerValue) - 90);
						var currentRotation = self._currentRotation || targetRotation;
						self._currentRotation = targetRotation;
						
						return function(step) 
						{
							var rotation = currentRotation + (targetRotation-currentRotation)*step;
							return "rotate(" + rotation + ")"; 
						}
					});

		var fontSize = Math.round(this.config.size / 16);
			var point1 = this.valueToPoint(peak, 0.7);
			var point2 = this.valueToPoint(peak, 0.87);


		this.body.selectAll(".peak")
					.transition()
					.duration(800)
					.delay(0)
					.attr("x1", point1.x)
					.attr("y1", point1.y)
					.attr("x2", point2.x)
					.attr("y2", point2.y)
					.attr("stroke", "#ffffff")
					.attr("stroke-width", "1px");
	}

	this.valueToDegrees = function(value)
	{
		return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);
	}
	
	this.valueToRadians = function(value)
	{
		return this.valueToDegrees(value) * Math.PI / 180;
	}
	
	this.valueToPoint = function(value, factor)
	{
		return { 	x: - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
					y: - this.config.raduis * factor * Math.sin(this.valueToRadians(value)) 		};
	}
	
	// initialization
	this.configure(configuration);	
}