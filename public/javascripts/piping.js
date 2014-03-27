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

				var ghxWrap = gBody.append("g")

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
			this.body = d3.select("#" + name)
				if(this.body.attr('class') != "valve"){
					switch(value)
					{
						case 0:
							this.body.transition()
									.duration(2000) 
									.style("fill", defaultColor()) //default
						break;
						case 1:
							this.body.transition()
									.duration(2000)
									//Cold
									.style("fill", coldColor())
						break;
						case 2:
							this.body.transition()
									.duration(2000)
									//Cool
									.style("fill", coolColor())
						break;
						case 3:
							this.body.transition()
									.duration(2000)
									//Warm
									.style("fill", warmColor())
						break;
						case 4:
							this.body.transition()
									.duration(2000)
									//Hot
									.style("fill", hotColor())
						break;
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