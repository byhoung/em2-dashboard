window.onload = function initialize()
{
	initializeWindow();
	createPaths();

	// updatetempGauges()
	// updateFlows()
	// updatePaths()
	// updateGhx()

	//setInterval(updatetempGauges, 6000);
	//setInterval(updateFlows, 3000);
	//setInterval(updatePaths, 5000);
	//setInterval(updateGhx, 5000);
};

function initializeWindow(){

	var sidebarWidth = $('#sidebarWrap').width();

	if(window.devicePixelRatio > 1 || $(document).width() <= 1366){
		wWidth = window.innerWidth * 1.2;
		wHeight = window.innerHeight;
	} else {
		wWidth = window.innerWidth;
		wHeight = window.innerHeight;
	}
	svgWidth = wWidth - sidebarWidth;
	fill = d3.scale.category20(),
	nodes = [],
	links = [];

	var mainContainer = d3.select('.main')
		.style("width", wWidth - sidebarWidth + "px");

/*------------------------------------------------------------------
1. [Main SVG Body]
------------------------------------------------------------------*/

	svgbody = d3.select(".main").append("svg:svg")
			.attr("class", "body")
			.attr("xmlns", "http://www.w3.org/1999/xlink")
			.attr("viewBox", "0 0 1400 885")
			.attr("preserveAspectRatio", "xMidYMid meet");

	gBody = svgbody.append("g")
			.attr("class", "gBody");

/*------------------------------------------------------------------
2. [Draw Logo SVG]
------------------------------------------------------------------*/

	var svglogo = d3.select(".logo").append("svg")
				.attr("width", 90)
				.attr("height", 70)
				.append("g")
					.attr("class", "glogo");
	
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M6.7,55.9H31c12.6,0,19-5,19-14.4c0-6.7-3.4-10.7-10.3-12.1   c5-1.1,7.9-5,7.9-10.6c0-8.4-5.9-13.9-16.6-13.9H6.7V55.9L6.7,55.9z M23.9,17h2.4c3,0,4.6,1.3,4.6,3.6c0,2.3-1.6,3.6-4.6,3.6h-2.4   V17L23.9,17z M23.9,35.1h3.1c3.8,0,5.7,1.5,5.7,4.1c0,2.6-1.9,4.1-5.7,4.1h-3.1V35.1L23.9,35.1z")
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M62.7,55.7h18.2V39l9,16.8h20.8L96.8,35c6-0.7,9.9-5.8,9.9-13   c0-10.9-7.1-17.1-20.8-17.1H62.7V55.7L62.7,55.7z M80.8,18h2.9c3.6,0,5.5,1.9,5.5,5c0,3.1-1.9,4.9-5.5,4.9h-2.9V18L80.8,18z")
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M117.3,55.7h19.9l1.6-6.4h14l1.7,6.4h19.9l-18-51h-20.6   L117.3,55.7L117.3,55.7z M141.9,37.2l1.6-5.8c0.7-2.7,1.8-6.3,2.1-11.2h0.4c0.3,4.9,1.4,8.5,2.1,11.2l1.6,5.8H141.9L141.9,37.2z")
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M182.6,32.4c0,6.1,0.5,11,2.9,14.9c3.9,6.1,11.3,9.9,20.5,9.9   c9.2,0,16.6-3.7,20.5-9.9c2.4-3.9,3-8.7,3-14.9V4.7h-18.4v27.8c0,5.4-0.9,8.5-5.1,8.5c-4.3,0-5.1-3.1-5.1-8.5V4.7h-18.4V32.4   L182.6,32.4z")
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M245,55.6h17.6V37.3c0-2.1-0.1-4.8-0.6-8l15.6,26.4h18V4.8h-17.6   v18.5c0,2.2,0.1,4.9,0.6,8.1L262.9,4.8H245V55.6L245,55.6z")
	svglogo.append("path")
			.attr("fill-rule","evenodd") 
			.attr("fill","#FFFFFF")
			.attr("d","M6.1,95.9v50.5h5.4V95.9H6.1L6.1,95.9z M26.4,146.5h5.8V111   l31.3,37.5V95.8h-5v37.8L26.4,94.5V146.5L26.4,146.5z M72.6,101.1h12v45.3H90v-45.3h13.2v-5.2H72.6V101.1L72.6,101.1z M112.7,95.9   v50.6h25.4v-5.5H118v-19.4h20.2v-5.6h-19.7v-14.9h19.7v-5.3H112.7L112.7,95.9z M151.9,95.9v50.6h5.5V124h1.9l15.3,22.5h7.1   l-16.7-23c3.5,0,4.8-0.6,6.8-1.7c2-1.1,3.5-2.8,4.6-5c1-2.2,1.6-4,1.6-6.9c0-3.4-0.8-6.3-2.4-8.7c-1.5-2.4-3.5-4-6-4.7   c-1.6-0.4-4.7-0.7-9.3-0.7H151.9L151.9,95.9z M157.4,101.1h4.7c2.8,0,4.9,0.4,6.2,1c1.2,0.6,2.2,1.7,3,3.1c0.8,1.5,1.1,3.1,1.1,4.8   c0,1.8-0.3,2.9-1.1,4.4c-0.8,1.4-1.8,2.5-3.1,3.2c-1.3,0.7-3.4,1-6.2,1h-4.6V101.1L157.4,101.1z M296.7,102.8v-5.6   c-3.5-1.7-7.4-2.5-11.6-2.5c-7.3,0-13.3,2.5-18.2,7.4c-4.9,5-7.3,11.1-7.3,18.3c0,6.9,2,12.7,6,17.6c4.7,5.7,11.3,8.6,19.6,8.6   c4.2,0,8-0.8,11.5-2.4v-5.5c-3.3,2.1-7.1,3.2-11.3,3.2c-6,0-11.1-2.1-15-6.1c-4-4-6-9-6-15.1c0-4,0.9-7.5,2.7-10.8   c1.7-3.2,4.2-5.7,7.5-7.6c3.3-1.9,6.8-2.9,10.5-2.9c3.5,0,6.7,0.7,9.6,2.1C295.4,101.9,296,102.3,296.7,102.8L296.7,102.8z    M185.5,101.1h12v45.3h5.3v-45.3H216v-5.2h-30.5V101.1L185.5,101.1z M224.9,95.9v50.6h25.4v-5.5h-20.1v-19.4h20.2v-5.6h-19.7v-14.9   h19.7v-5.3H224.9L224.9,95.9z")
	svglogo.append("polygon")
			.attr("fill-rule","evenodd")
			.attr("points","296,72.8 5.9,72.8 5.9,78 296,78 296,72.8  ")
	svglogo.append("rect") 
			.attr("x","4.454") 
			.attr("y","162.398") 
			.attr("width","292.541")
			.attr("height","55.102")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M44.3,189.6v0.8c0,4.4-0.8,7.2-2.9,9.8c-2.8,3.5-7.3,5.6-11.9,5.6c-8.8,0-16-7.3-16-16.1   c0-9,7.3-16.2,16.5-16.2c5.1,0,9,2.1,13,6.8l-2.6,2.3c-3-4-6.3-5.9-10.4-5.9c-7.3,0-13,5.7-13,13c0,7,5.8,12.8,12.7,12.8   c3.7,0,7.7-2.2,9.6-5.3c0.8-1.3,1.1-2.5,1.3-4.4h-9.3v-3.2H44.3z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M53.7,177.3v9.3H66v3.2H53.7V202h12.6v3.2H50.2v-31.2h16.2v3.2H53.7z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M103.6,189.7c0,8.8-7.4,16.2-16.2,16.2c-9,0-16.3-7.2-16.3-16.1c0-8.9,7.4-16.2,16.3-16.2   C96.2,173.5,103.6,180.8,103.6,189.7z M74.6,189.7c0,7.1,5.7,12.8,12.7,12.8c7,0,12.7-5.8,12.7-12.8c0-7.2-5.7-12.9-12.7-12.9   C80.3,176.8,74.6,182.5,74.6,189.7z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M115.8,205.3h-3.5v-28h-7.5v-3.2h18.6v3.2h-7.6V205.3z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M147.5,186.8v-12.7h3.5v31.2h-3.5V190h-15.9v15.3h-3.5v-31.2h3.5v12.7H147.5z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M163,177.3v9.3h12.3v3.2H163V202h12.6v3.2h-16.2v-31.2h16.2v3.2H163z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M200.1,205.3h-4.3l-9.4-13.7h-0.9v13.7h-3.5v-31.2h5.1c3.6,0,5.7,0.5,7.5,1.7c2.1,1.5,3.5,4.1,3.5,6.9   c0,4.9-3,8.2-7.9,8.7L200.1,205.3z M187.8,188.5c4.5,0,6.9-2,6.9-5.9c0-3.5-2.4-5.4-7-5.4h-2.1v11.2H187.8z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M209.5,172.3l12,26.4l12.3-26.4l4.8,33H235l-2.9-21.7l-10.6,23l-10.5-23l-3.1,21.7h-3.6L209.5,172.3z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M249.6,196.4l-3.7,8.8h-3.8l14.4-32.7l14,32.7h-3.8l-3.7-8.8H249.6z M256.4,180.7l-5.3,12.5h10.5   L256.4,180.7z")
	svglogo.append("path")
			.attr("fill","#FFFFFF") 
			.attr("d","M278.4,202h8.6v3.2h-12.1v-31.2h3.5V202z")

/*------------------------------------------------------------------
7. [Drop Shadow]
------------------------------------------------------------------*/

  var defs = svgbody.append("defs");

  var filter = defs.append("filter")
      .attr("id", "dropshadow")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

};

/*------------------------------------------------------------------
3. [Declaration and Initialization with JSON]
------------------------------------------------------------------*/

var paths = [];
var ghx = [];
var flows = [];
var tempgauges = [];
var rects = [];
var stats = d3.selectAll('.value')[0];
var jsonTemp = 
{
	"f1": {"temp": 1253.12, "peak": 1250},
	"f1A": {"temp": 485.12, "peak": 1250},
	"f1B": {"temp": 652.12, "peak": 1250},
	"f2": {"temp": 1542.54, "peak": 200},
	"f3": {"temp": 1742.65, "peak": 1000},
	"f4": {"temp": 305.12, "peak": 1250},
	"f5": {"temp": 965.12, "peak": 1250},
	"t1": {"temp": 80.45, "peak": 90},
	"t2": {"temp": 70.23, "peak": 80},
	"t3": {"temp": 12.23, "peak": 80},
	"t4": {"temp": 85.23, "peak": 80},
	"t4A": {"temp": 78.23, "peak": 80},
	"t5": {"temp": 4.23, "peak": 80},
	"t6": {"temp": 46.23, "peak": 80},
	"t7": {"temp": 72.23, "peak": 80},
	"t8": {"temp": 13.23, "peak": 80},
	"t9": {"temp": 18.62, "peak": 60}
};

/*------------------------------------------------------------------
4. [Define Creation Functions]
------------------------------------------------------------------*/

function createPath(name, check, path)
{
	var config = 
	{
		path:path,
		check: check
	}

	paths[name] = new Path(name, config);
	paths[name].renderPaths();
}

function createRect(name, check, x, y, width, height)
{
	var config = 
	{
		cx:x,
		cy:y,
		cwidth:width,
		cheight:height,
		check: check
	}
	rects[name] = new Path(name, config);
	rects[name].renderPaths();
}

function createFlow(name, label, min, max, sizebias, minor, gx, gy)
{
	var config = 
	{
		size: 130 + sizebias,
		label: label,
		min: undefined != min ? min : 0,
		max: undefined != max ? max : 100,
		minorTicks: 5 * minor,
		coorx: gx,
		coory: gy
	}
				
		var range = config.max - config.min;
		config.greenZones = 100 //maximum peak
		config.yellowZones = [{ from: config.min + range, to: config.min + range}];
		config.redZones = [{ from: config.min + range, to: config.max}]; // allows for example upper and lower limit zones
						
		flows[name] = new Flow(name + "flowContainer", config);
		flows[name].render();
}

function createTemp(name, label, min, max, sizebias, minor, gx, gy)
{
	var config = 
	{
		size: 110 + sizebias,
		label: label,
		min: undefined != min ? min : 0,
		max: undefined != max ? max : 100,
		minorTicks: 5 * minor,
        coorx: gx,
        coory: gy
    }

          var range = config.max - config.min;

          tempgauges[name] = new Temp(name + "GaugeContainer", config);
          tempgauges[name].render();

}

/*------------------------------------------------------------------
5. [Define Path Parameters]
------------------------------------------------------------------*/

function createPaths()
{
	/*Create all curved pipes*/
	createPath("pipe2","pipe","m 24.021198,339.37412 0.21875,46.125 c 0.09444,21.59979 17.5875,39.1875 39.1875,39.1875 l 40.218752,0 c -1.9533,-6.93485 -1.90675,-12.78899 0.125,-19.59375 l -40.437502,0 c -10.8,0 -19.59375,-8.79375 -19.59375,-19.59375 l -0.21875,-46.125 -19.5,0 z M 173.1462,405.09287 c 2.03307,6.8073 2.07958,12.65629 0.125,19.59375 l 59.0625,0 0,-19.59375 -59.1875,0 z")
	createPath("pipe3","pipe","m 63.30955,166.36826 h 20 l 0,0 h 149 v -19.5 h -149 l 0,0 h -20 c -21.6,0 -39.1,17.6 -39.1,39.1 v 54.9 h 19.6 v -54.9 c 0,-10.8 8.7,-19.6 19.5,-19.6 z")
	createPath("pipe5","pipe","m 271.42745,64.811623 c -21.6,0 -39.1875,17.5875 -39.1875,39.187497 l 0,42.8125 19.59375,0 0,-42.8125 c 0,-10.799997 8.79375,-19.593747 19.59375,-19.593747 l 122.78125,0 c -1.98352,-6.77799 -1.9983,-12.63481 0,-19.59375 l -122.78125,0 z m 192.40625,0 c 0.99263,3.4677 1.5,6.7054 1.5,9.8125 0,3.15044 -0.50758,6.36324 -1.5,9.78125 l 149.1875,0 0,136.906247 19.625,0 0,-136.906247 192.375,0 0,-19.59375 -238.6875,0 -64.5,0 -58,0 z")
	createPath("pipe7","pipe","m 612.99702,240.86825 0,25.875 c 0,21.6 17.61875,39.21875 39.21875,39.21875 l 26,0 0,-19.59375 -26,0 c -10.8,0 -19.59375,-8.825 -19.59375,-19.625 l 0,-25.875 -19.625,0 z")
	createPath("pipe9","pipe","M 1196.6095,64.868258 H 923.70955 v 19.6 h 272.89995 c 10.8,0 19.6,8.8 19.6,19.600002 v 182.3 h 19.6 v -182.3 c 0,-21.600002 -17.6,-39.200002 -39.2,-39.200002 z")
	createPath("pipe10","pipe","m 1132.7399,305.90537 0,48.46875 c 6.7502,-1.9227 12.5986,-1.87231 19.5937,0.1875 l 0,-48.65625 -19.5937,0 z m 19.5937,118.0625 c -3.5907,1.05511 -6.8915,1.59375 -10.0937,1.59375 -3.0628,0 -6.1897,-0.4383 -9.5,-1.375 l 0,37.3125 c 0,10.8 -8.7938,19.59375 -19.5938,19.59375 l -189.4999,-0.28125 0,19.59375 189.4999,0.28125 c 21.6,0 39.1875,-17.5875 39.1875,-39.1875 l 0,-37.53125 z")
	createPath("pipe11","pipe","m 573.10955,480.76826 c -10.8,0 -19.6,-8.8 -19.6,-19.6 l 0,-200.7 c 0,-10.8 8.8,-19.6 19.6,-19.6 l 39.9,0 0,-19.6 -39.9,0 c -21.6,0 -39.2,17.6 -39.2,39.2 l 0,200.7 c 0,21.6 17.6,39.2 39.2,39.2 l 251.85914,0 0,-19.6 -251.85914,0 z")
	createPath("pipe15","pipe","m 1216.2095,305.96826 v 336.2 c 0,10.8 -8.8,19.6 -19.6,19.6 H 602.30955 c -21.6,0 -39.2,17.6 -39.2,39.2 v 60.1 h 19.6 v -60.2 c 0,-10.8 8.8,-19.6 19.6,-19.6 h 594.29995 c 21.6,0 39.2,-17.6 39.2,-39.2 v -336.1 h -19.6 z")
	/*Create all rectangular pipes*/
	createRect("rect1","rect","232.30956","166.36826","19.6","594.70001")
	createRect("rect4","rect","232.30956","146.86826","19.6","19.6")
	createRect("rect6","rect","613.00952","221.26825","19.6","19.6")
	createRect("rect8","rect","776.80951","286.36826","356.20001","19.6")
	createRect("rect12","rect","1132.9095","286.36826","19.6","19.6")
	createRect("rect13","rect","1152.5096","286.36826","63.700001","19.6")
	createRect("rect14","rect","1216.2096","286.36826","19.6","19.6")
	/*Create all modules*/
	createRect("rect16","mod","831.11621","64.854256","86.169601","54.374401")
	createRect("rect17","mod","684.32318","251.59773","86.169601","54.374401")
	createRect("rect18","mod","831.25769","480.62988","86.169601","54.374401")
	createRect("rect19","mod","24.119961","247.06519","54.374401","86.169601")
	/*Create all valves*/
	createPath("valve1","valve","m 105.53912,399.52349 -1.46875,4.53125 c -2.492,7.675 -2.54,14.00375 -0.125,21.84375 l 1.40625,4.59375 33.09375,0 33.09374,0 1.40625,-4.59375 c 2.415,-7.84 2.367,-14.16875 -0.125,-21.84375 l -1.46875,-4.53125 -32.90624,0 -32.90625,0 z")
	createPath("valve2","valve","m 465.29955,74.682258 c 0,3.567 -0.618,7.211 -1.895,11.146 l -1.462,4.523 h -65.902 l -1.461,-4.523 c -2.492,-7.675 -2.559,-14.005 -0.145,-21.845 l 1.425,-4.601 h 66.266 l 1.423,4.601 c 1.177,3.824 1.751,7.319 1.751,10.699 z")
	createPath("valve3","valve","m 1142.2086,425.64243 c -3.568,0 -7.213,-0.618 -11.147,-1.895 l -4.522,-1.462 v -65.902 l 4.522,-1.462 c 7.676,-2.491 14.005,-2.558 21.846,-0.144 l 4.599,1.425 v 66.266 l -4.599,1.423 c -3.824,1.177 -7.319,1.751 -10.699,1.751 z")
	/*Create all flows*/
	createFlow("f1","F1",0,2500,70,0,249,675);
	createFlow("f2","F2",0,2500,0,0,732,75);
	createFlow("f3","F3",0,2500,0,0,880,298);
	createFlow("f4","F4",0,2500,0,0,1034,491);
	/*Create all temps*/
	createTemp("t1","T1",30,100,60,0,249,510);
    createTemp("t2","T2",30,100,0,0,140,156);
    createTemp("t4","T4",30,100,0,0,324,74);
    createTemp("t4a","T4A",30,100,0,1,535,74);
    createTemp("t6","T6",30,100,0,0,1035,75);
    createTemp("t7","T7",30,100,0,0,732,492);
    createTemp("t8","T8",30,100,0,0,1035,296);
    createTemp("t9","T9",30,100,60,0,880,670);

	createRect("rect20","ghx","213","762.2","393.2","143.5")
}

/*------------------------------------------------------------------
6. [Update Elements]
------------------------------------------------------------------*/

function updatePaths()
{
	for(key in paths)
	{
		var value = getRandomHeat(paths[key])
		paths[key].redrawPaths(value);
	}

	for(key in rects)
	{
		if(rects[key].name != "rect20"){
			var value = getRandomHeat(rects[key])
			rects[key].redrawPaths(value);
		}
	}
}

function updateGhx() {
	var value = getRandomValue(undefined, -60, 40); //get random value
	redrawGhx(value);
}

function updateFlows(index, duration)
{
	for (var key in flows)
		{
			if (flows.hasOwnProperty(key)) 
			{
				var value = Math.round(data[index].modules[key])
				var peak = 0//getRandomValue(flows[key])
				flows[key].redraw(value, peak, duration);
			}
		}
}

function updatetempGauges(index, duration)
{
	for (var key in tempgauges)
	{
		var value = Math.round(data[index].modules[key])
		var peak = 0//getRandomValue(tempgauges[key])
		tempgauges[key].redraw(value, peak);
	}
}

function updateStats() {
	for (i=0; i<=stats.length; i++) 
	{
		var value = getRandomValue(tempgauges[key])
		tempgauges[key].redraw(value);
	}
}


/*------------------------------------------------------------------
7. [Get Random]
------------------------------------------------------------------*/

function getRandomValue(gauge,min,max){
	min = undefined != min ? min : gauge.config.min;
	max = undefined != max ? max : gauge.config.max;
    return Math.floor(min + (max - min) *  Math.random());
}

/*------------------------------------------------------------------
7. [Define Colors]
------------------------------------------------------------------*/

function getRandomHeat(){
	return Math.floor(5 * Math.random());
}

function defaultColor(){
	return "#494949";
}

function coldColor(){
	return "#003399";
}

function coolColor(){
	return "#009eff";
}

function warmColor(){
	return "#ff5f24";
}

function hotColor(){
	return "#990000";
}

function inactive(){
	return "#313131";
}

function active(){
	return "#92CD00";
}
