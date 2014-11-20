function Path(name, pathConfig)
{

	this.name = name;
	this.pathConfig = pathConfig;
	var self = this;

	
		this.renderPaths = function()
		{
			if(this.pathConfig.check == ("pipe"))
			{
				gBody.append("svg:path")
							.attr("id", this.name)
							.attr("class", "piping")
							.attr("fill", defaultColor)
							.attr("stroke-miterlimit", 10)
							.attr("d", this.pathConfig.path);
			}
			if(this.pathConfig.check == ("rect"))
			{
				gBody.append("svg:rect")
							.attr("id", this.name)
							.attr("class", "piping")
							.attr("x", this.pathConfig.cx)
							.attr("y", this.pathConfig.cy)
							.attr("fill", defaultColor)
							.attr("stroke-miterlimit", "10")
							.attr("width", this.pathConfig.cwidth)
							.attr("height", this.pathConfig.cheight);
			}
			if(this.pathConfig.check == ("mod"))
			{
				gBody.append("svg:rect")
							.attr("id", this.name)
							.attr("class", "module")
							.attr("x", this.pathConfig.cx)
							.attr("y", this.pathConfig.cy)
							.attr("fill", defaultColor)
							.attr("stroke", inactive())
							.attr("width", this.pathConfig.cwidth)
							.attr("height", this.pathConfig.cheight);
			}
			if(this.pathConfig.check == ("valve"))
			{
				var gWrap = gBody.append("g")
									.attr("id", this.name)
									.attr("class", "valve");

				gWrap.append("svg:path")

							.attr("id", this.name)
							.attr("class", "valve")
							.attr("fill", active())
							.attr("stroke-miterlimit", 10)
							.attr("d", this.pathConfig.path);
			}
			if(this.pathConfig.check == ("pump"))
			{
				gBody.append("svg:polygon")

							.attr("id", this.name)
							.attr("class", "pump")
							.attr("fill", inactive())
							.attr("stroke-miterlimit", 10)
							.attr("points", this.pathConfig.path);
			}
			if(this.pathConfig.check == ("ghx"))
			{
				var data =[0];
				var ghxWidth = this.pathConfig.cwidth;
				var ghxHeight = this.pathConfig.cheight;

				var barStart = ghxWidth/2;

				gBody.append("svg:rect")
							.attr("id", this.name)
							.attr("class", "ghx")
							.attr("x", this.pathConfig.cx)
							.attr("y", this.pathConfig.cy)
							.attr("fill", defaultColor)
							.attr("stroke-miterlimit", "10")
							.attr("width", this.pathConfig.cwidth)
							.attr("height", this.pathConfig.cheight);

				var ghxWrap = gBody.append("g");

				var ghxData = ghxWrap.selectAll(".ghx")
							.data(data)
							.enter().append("g")
								.attr("transform", "translate("+this.pathConfig.cx+","+this.pathConfig.cy+")");

				var bar = ghxData.append("polygon")
							    .attr("class", "bar")
							    .attr("points", barStart+","+0+" "+barStart+","+0+" "+barStart+","+ghxHeight+" "+barStart+","+ghxHeight);
			}
		}

		this.redrawPaths = function(value)
		{
			this.body = d3.select("#" + name);
			console.log(this.body + value);
				if(this.body.attr('class') === "piping"){
					console.log(value);
					if(value == 0){
						this.body.transition()
								.duration(2000) 
								.style("fill", defaultColor()); //default
					} else if(value < 25) {
						this.body.transition()
								.duration(2000)
								//Cold
								.style("fill", coldColor());
					} else if(value >= 25 && value < 50) {
						this.body.transition()
								.duration(2000)
								//Cool
								.style("fill", coolColor());
					} else if (value >= 50 && value < 75) {
							this.body.transition()
									.duration(2000)
									//Warm
									.style("fill", warmColor());
					} else {
						this.body.transition()
								.duration(2000)
								//Hot
								.style("fill", hotColor());
					}
				} else if (this.body.attr('class') === "pump" || this.body.attr('class') === "module"){
						if(value === 0) {
							this.body
								.style("fill", defaultColor());
						} else if(value >= 0) {
							this.body
								.style("fill", hotColor());
						}
				} else {
						switch(value)
						{
							case 0:
								this.body
									.style("-webkit-transform", "rotate(0deg)");
							break;
							case 1:
								this.body
									.style("-webkit-transform", "rotate(90deg)");
							break;
						}
				}
		}
};