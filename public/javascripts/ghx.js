function redrawGhx(value){

var ghxBody = d3.select('.ghx')
var ghxWidth = ghxBody.attr('width');
var ghxHeight = ghxBody.attr('height');
var coorx = ghxBody.attr('x');
var coory = ghxBody.attr('y');

var barStart = ghxWidth/2;

var xGhx = d3.scale.linear()
		    .domain([-200, 200])
		    .range([0, ghxWidth]);

var barWrap = d3.select('.bar').data([value]);

	barWrap.transition()
		.delay(300)
		.duration(1300)
			.attr("fill", function(d) { 
				if(d>0)
					return coolColor();
				else
					return warmColor();
			 })
			.attr("points", function(d) {
				var target = xGhx(d);
				barWrap.data = target;
				return barStart+","+0+" "+target+","+0+" "+target+","+ghxHeight+" "+barStart+","+ghxHeight
			});
}

