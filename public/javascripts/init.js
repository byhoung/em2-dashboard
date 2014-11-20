window.onload = function initialize()
{
	initializeWindow();
	createPaths();

	// updatetempGauges()
	// updateFlows()
	// updatePaths()
	// updateGhx()

	// setInterval(updatetempGauges, 6000);
	// setInterval(updateFlows, 3000);
	//setInterval(updatePaths, 5000);
	//setInterval(updateGhx, 5000);
};

function initializeWindow(){

	fill = d3.scale.category20(),
	nodes = [],
	links = [];

	var mainContainer = d3.select('.main');

/*------------------------------------------------------------------
1. [Main SVG Body]
------------------------------------------------------------------*/

	svgbody = d3.select(".main").append("svg:svg")
			.attr("class", "body")
			.attr("xmlns", "http://www.w3.org/2000/svg")
			.attr("version", "1.1")
			.attr("viewBox", "0 0 1734 939")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.style("text-rendering","geometricPrecision");

	gBody = svgbody.append("g")
			.attr("class", "gBody");

/*------------------------------------------------------------------
7. [Drop Shadow]
------------------------------------------------------------------*/

  var defs = svgbody.append("defs");

  var filter = defs.append("filter")
      .attr("id", "dropshadow");

  var gradient = defs.append("linearGradient")
  		.attr("id", "gradient")
  		.attr("x1", "0%")
  		.attr("y1", "0%")
  		.attr("x2", "75%")
  		.attr("y2", "100%");

  gradient.append("stop")
		.attr("offset", "0%")
  		.attr("stop-color", "rgb(255,255,255)");

  gradient.append("stop")
  		.attr("offset", "100%")
  		.attr("stop-color", "rgb(165,165,165)");

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 2)
      .attr("result", "blur");

  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur");
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

}

/*------------------------------------------------------------------
3. [Declaration and Initialization with JSON]
------------------------------------------------------------------*/

var paths = [],
	ghx = [],
	rects = [];

var tone = {
		lwt: 0,ewt: 0
	},
	ttwo = {
		lwt: 0,ewt: 0
	},
	tfour = {
		lwt: 0,ewt: 0
	},
	tsix = {
		lwt: 0,ewt: 0
	},
	tsev = {
		lwt: 0,ewt: 0
	},
	teight = {
		lwt: 0,ewt: 0
	},
	tnine = {
		lwt: 0,ewt: 0
	},
	fone = {
		lwt: 0,ewt: 0
	},
	ftwo = {
		lwt: 0,ewt: 0
	},
	fthree = {
		lwt: 0,ewt: 0
	},
	ffour = {
		lwt: 0,ewt: 0
	},
	pumpone,
	pumptwo;

flows = [];
tempgauges = [];
currentIndex = 0;

var stats = d3.selectAll('.value')[0];

/*------------------------------------------------------------------
4. [Define Creation Functions]
------------------------------------------------------------------*/

function createPath(name, check, path)
{
	var config = 
	{
		path:path,
		check: check
	};

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
	};
	rects[name] = new Path(name, config);
	rects[name].renderPaths();
}

function createFlow(name, label, min, max, sizebias, minor, gx, gy)
{
	var config = 
	{
		size: 130 + sizebias,
		label: label,
		min: undefined !== min ? min : 0,
		max: undefined !== max ? max : 100,
		minorTicks: 5 * minor,
		coorx: gx,
		coory: gy
	};
				
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
		min: undefined !== min ? min : 0,
		max: undefined !== max ? max : 100,
		minorTicks: 5 * minor,
        coorx: gx,
        coory: gy
    };

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
	createPath("pipe2","pipe","m 24.021198,339.37412 0.21875,46.125 c 0.09444,21.59979 17.5875,39.1875 39.1875,39.1875 l 168.937342,0 -0.0547,-19.4141 -168.976442,-0.17965 c -10.799994,-0.0115 -19.59375,-8.79375 -19.59375,-19.59375 l -0.21875,-46.125 z");
	createPath("pipe3","pipe","m 63.30955,166.36826 h 20 l 0,0 h 149 v -19.5 h -149 l 0,0 h -20 c -21.6,0 -39.1,17.6 -39.1,39.1 v 54.9 h 19.6 v -54.9 c 0,-10.8 8.7,-19.6 19.5,-19.6 z");
	createPath("pipe5","pipe","m 271.4375,64.8125 c -21.6,0 -39.1875,17.587503 -39.1875,39.1875 l 0,42.8125 19.59375,0 0,-42.8125 c 0,-10.799997 8.79375,-19.59375 19.59375,-19.59375 l 118.0625,0 4.71875,0 69.625,0 4.375,0 c 118.85684,0 -71.50035,0 34.8125,0 l 0,-19.59375 c 118.28767,0 44.23325,0 -34.8125,0 l -4.375,0 -69.625,0 -4.71875,0 z");
	createPath("pipe7","pipe","m 612.99702,240.86825 0,25.875 c 0,21.6 17.61875,39.21875 39.21875,39.21875 l 26,0 0,-19.59375 -26,0 c -10.8,0 -19.59375,-8.825 -19.59375,-19.625 l 0,-25.875 -19.625,0 z");
	createPath("pipe9","pipe","M 1196.6095,64.868258 H 923.70955 v 19.6 h 272.89995 c 10.8,0 19.6,8.8 19.6,19.600002 v 182.3 h 19.6 v -182.3 c 0,-21.600002 -17.6,-39.200002 -39.2,-39.200002 z");
	createPath("pipe10","pipe","m 1132.7399,305.90537 0,48.46875 c 6.7502,-1.9227 12.5986,-1.87231 19.5937,0.1875 l 0,-48.65625 -19.5937,0 z m 19.5937,118.0625 c -3.5907,1.05511 -6.8915,1.59375 -10.0937,1.59375 -3.0628,0 -6.1897,-0.4383 -9.5,-1.375 l 0,37.3125 c 0,10.8 -8.7938,19.59375 -19.5938,19.59375 l -189.4999,-0.28125 0,19.59375 189.4999,0.28125 c 21.6,0 39.1875,-17.5875 39.1875,-39.1875 l 0,-37.53125 z");
	createPath("pipe11","pipe","m 573.10955,480.76826 c -10.8,0 -19.6,-8.8 -19.6,-19.6 l 0,-200.7 c 0,-10.8 8.8,-19.6 19.6,-19.6 l 39.9,0 0,-19.6 -39.9,0 c -21.6,0 -39.2,17.6 -39.2,39.2 l 0,200.7 c 0,21.6 17.6,39.2 39.2,39.2 l 251.85914,0 0,-19.6 -251.85914,0 z");
	createPath("pipe15","pipe","m 1216.2095,305.96826 v 336.2 c 0,10.8 -8.8,19.6 -19.6,19.6 H 602.30955 c -21.6,0 -39.2,17.6 -39.2,39.2 v 60.1 h 19.6 v -60.2 c 0,-10.8 8.8,-19.6 19.6,-19.6 h 594.29995 c 21.6,0 39.2,-17.6 39.2,-39.2 v -336.1 h -19.6 z");
	/*Create all rectangular pipes*/
	createRect("pipe1","rect","232.30956","166.36826","19.6","594.70001");
	createRect("rect4","rect","232.30956","146.86826","19.6","19.6");
	createRect("pipe55","rect","504.05194","64.828499","320.62177","19.6");
	createRect("pipe56","rect","612.78894","84.496231","19.6","136.6096");
	createRect("rect6","rect","613.00952","221.26825","19.6","19.6");
	createRect("pipe8","rect","776.80951","286.36826","356.20001","19.6");
	createRect("rect12","rect","1132.9095","286.36826","19.6","19.6");
	createRect("rect13","rect","1152.5096","286.36826","63.700001","19.6");
	createRect("rect14","rect","1216.2096","286.36826","19.6","19.6");
	/*Create all modules*/
	createRect("rect16","mod","831.11621","64.854256","86.169601","54.374401");
	createRect("rect17","mod","684.32318","251.59773","86.169601","54.374401");
	createRect("rect18","mod","831.25769","480.62988","86.169601","54.374401");
	createRect("rect19","mod","24.119961","247.06519","54.374401","86.169601");
	/*Create all valves*/
	createPath("valve3","valve","m 1142.2086,425.64243 c -3.568,0 -7.213,-0.618 -11.147,-1.895 l -4.522,-1.462 v -65.902 l 4.522,-1.462 c 7.676,-2.491 14.005,-2.558 21.846,-0.144 l 4.599,1.425 v 66.266 l -4.599,1.423 c -3.824,1.177 -7.319,1.751 -10.699,1.751 z");
	createPath("pump1", "pump", "179.8,382.5 179.8,447.7 78.8,415.1 ");
	createPath("pump2", "pump", "476.2,42.4 476.2,107.5 577.2,74.9 ");
	createPath("pump3", "pump", "510.7,417.3 575.9,417.3 543.3,316.3 ");
	/*Create all flows*/
	createFlow("f1","F1",0,2500,70,0,243,675);
	createFlow("f2","F2",0,2500,0,0,732,75);
	createFlow("f3","F3",0,2500,0,0,880,298);
	createFlow("f4","F4",0,2500,0,0,1034,491);
	/*Create all temps*/
	createTemp("t1","T1",30,100,60,0,243,510);
    createTemp("t2","T2",30,100,0,0,140,156);
    createTemp("t4","T4",30,100,0,0,324,74);
    createTemp("t6","T6",30,100,0,0,1035,75);
    createTemp("t7","T7",30,100,0,0,732,492);
    createTemp("t8","T8",30,100,0,0,1035,296);
    createTemp("t9","T9",30,100,60,0,880,670);

	createRect("rect20","ghx","213","762.2","393.2","143.5");
}

/*------------------------------------------------------------------
6. [Update Elements]
------------------------------------------------------------------*/

function updateAll(index, duration)
{
	for (var flowkey in flows)
		{
			if (flows.hasOwnProperty(flowkey)) 
			{
				var value = Math.round(data[index].modules[flowkey]);
				var peak = 0//getRandomValue(flows[flowkey])
				flows[flowkey].redraw(value, peak, duration);
			}
		}
	for (var tempkey in tempgauges)
		{
			if (tempgauges.hasOwnProperty(tempkey)) {
			var value = Math.round(data[index].modules[tempkey]);
			var peak = 0//getRandomValue(tempgauges[tempkey])
			tempgauges[tempkey].redraw(value, peak, duration);
			}
		}

	for(pathkey in paths)
	{
		var value = getRandomHeat(paths[pathkey]);
		paths[pathkey].redrawPaths(value);
	}

	for(rectkey in rects)
	{
		if(rects[rectkey].name != "rect20"){
			var value = getRandomHeat(rects[rectkey]);
			rects[rectkey].redrawPaths(value);
		}
	}
}

function updatetempGauges(index, duration)
{
	tone.lwt = Math.round(data[index].ghx.lwt); //GHX
	tnine.ewt = Math.round(data[index].ghx.ewt); //GHX
	ttwo.ewt = Math.round(data[index].nodes[1].ewt); //BTU1
	ttwo.lwt = Math.round(data[index].nodes[1].lwt); //BTU1
	tfour.ewt = Math.round(data[index].nodes[2].ewt); //BTU2
	tfour.lwt = Math.round(data[index].nodes[2].lwt); //BTU2
	tsix.ewt = Math.round(data[index].nodes[3].ewt); //BTU3
	tsix.lwt = Math.round(data[index].nodes[3].lwt); //BTU3
	teight.ewt = Math.round(data[index].nodes[4].ewt); //BTU4
	teight.lwt = Math.round(data[index].nodes[4].lwt); //BTU4
	tsev.ewt = Math.round(data[index].nodes[5].lwt); //HEX-1
	tsev.lwt = Math.round(data[index].nodes[5].lwt); //HEX-1

	fone = Math.round(data[index].ghx.flow); //GHX
	ftwo = Math.round(data[index].nodes[3].flow); //BTU3
	fthree = Math.round(data[index].nodes[4].flow); //BTU4
	ffour = Math.round(data[index].nodes[5].flow); //HEX-1

	pumpone = Math.round(data[index].nodes[1].flow); //CP1
	pumptwo = Math.round(data[index].nodes[2].flow); //BTU2

	for (var tempkey in tempgauges)
	{
		if (tempgauges.hasOwnProperty(tempkey)) {
		var value = data[index].nodes[Object.keys(tempgauges).indexOf(tempkey)].ewt;//getRandomValue(tempgauges[tempkey])
		var peak = 0;//getRandomValue(tempgauges[tempkey])
		tempgauges[tempkey].redraw(value, peak, duration);

		tempgauges["t1"].redraw(tone.lwt,0,duration);
		tempgauges["t2"].redraw(ttwo.lwt,0,duration);
		tempgauges["t4"].redraw(tfour.ewt,0,duration);
		tempgauges["t6"].redraw(tsix.lwt,0,duration);
		tempgauges["t7"].redraw(tsev.lwt,0,duration);
		tempgauges["t8"].redraw(teight.lwt,0,duration);
		tempgauges["t9"].redraw(tnine.ewt,0,duration);

		if(pumpone > 0) {
			tempgauges["t2"].redraw(ttwo.lwt,0,duration);
		} else {
			tempgauges["t2"].redraw(-1,0,duration);
		}

		if(ffour > 0){
			tempgauges["t7"].redraw(tsev.lwt,0,duration);
		} else {
			tempgauges["t7"].redraw(-1,0,duration);
		}


		}
	}

	for (var flowkey in flows)
	{
		if (flows.hasOwnProperty(flowkey)) 
		{
			var value = getRandomValue(flows[flowkey]); //Math.round(data[index].currentValues[flowkey])
			var peak = 0;//getRandomValue(flows[flowkey])
			flows[flowkey].redraw(value, peak, duration);


			flows["f1"].redraw(fone,0,duration);
			flows["f2"].redraw(ftwo,0,duration);
			flows["f3"].redraw(fthree,0,duration);
			flows["f4"].redraw(ffour,0,duration);
		}
	}
	currentIndex = index;

	//var value = getRandomHeat(paths[pathkey]);
	//paths[pathkey].redrawPaths(value);

	//pumps & mods

	paths["pump1"].redrawPaths(pumpone);
	paths["pump2"].redrawPaths(pumptwo);
	paths["pump3"].redrawPaths(ffour);
	rects["rect19"].redrawPaths(pumpone);
	rects["rect16"].redrawPaths(ftwo);
	rects["rect17"].redrawPaths(fthree);
	rects["rect18"].redrawPaths(ffour);
	paths["valve3"].redrawPaths(ffour);


	//pipes
	rects["pipe1"].redrawPaths(tone.lwt);
	rects["pipe8"].redrawPaths(teight.lwt);
	rects["pipe55"].redrawPaths(tfour.lwt);
	rects["rect14"].redrawPaths(tsix.lwt);
	rects["rect12"].redrawPaths(teight.lwt);

	paths["pipe5"].redrawPaths(tfour.ewt);
	paths["pipe7"].redrawPaths(teight.ewt);
	paths["pipe9"].redrawPaths(tsix.lwt);
	paths["pipe15"].redrawPaths(tnine.ewt);

	if(pumpone > 0){
		rects["rect4"].redrawPaths(ttwo.lwt);
		paths["pipe2"].redrawPaths(ttwo.ewt);
		paths["pipe3"].redrawPaths(ttwo.lwt);
	} else {
		rects["rect4"].redrawPaths(tone.lwt);
		paths["pipe2"].redrawPaths(0);
		paths["pipe3"].redrawPaths(0);
	}

	if(ffour > 0){
		rects["pipe56"].redrawPaths(0);
		rects["rect13"].redrawPaths(0);
		rects["rect6"].redrawPaths(teight.ewt);
		paths["pipe10"].redrawPaths(tsev.ewt);
		paths["pipe11"].redrawPaths(tsev.lwt);
	} else {
		rects["pipe56"].redrawPaths(tfour.lwt);
		rects["rect13"].redrawPaths(teight.lwt);
		rects["rect6"].redrawPaths(tfour.lwt);
		paths["pipe10"].redrawPaths(0);
		paths["pipe11"].redrawPaths(0);
	}
}

// function updatePaths(index, duration)
// {
// 		//var value = getRandomHeat(paths[pathkey]);
// 		//paths[pathkey].redrawPaths(value);

// 		//pumps & mods
// 		var pumpone = data[index].nodes[1].flow; //CP1
// 		var pumptwo = data[index].nodes[2].flow; //BTU2

// 		paths["pump1"].redrawPaths(pumpone);
// 		paths["pump2"].redrawPaths(pumptwo);
// 		paths["pump3"].redrawPaths(ffour);
// 		rects["rect19"].redrawPaths(pumpone);
// 		rects["rect16"].redrawPaths(ftwo);
// 		rects["rect17"].redrawPaths(fthree);
// 		rects["rect18"].redrawPaths(ffour);
// 		paths["valve3"].redrawPaths(ffour);


// 		//pipes
// 		rects["pipe1"].redrawPaths(tone.lwt);
// 		rects["pipe8"].redrawPaths(teight.lwt);
// 		rects["pipe55"].redrawPaths(tfour.lwt);
// 		rects["rect14"].redrawPaths(tsix.lwt);
// 		rects["rect12"].redrawPaths(teight.lwt);

// 		paths["pipe5"].redrawPaths(tfour.ewt);
// 		paths["pipe7"].redrawPaths(teight.ewt);
// 		paths["pipe9"].redrawPaths(tsix.lwt);
// 		paths["pipe15"].redrawPaths(tnine.ewt);

// 		if(pumpone > 0){
// 			rects["rect4"].redrawPaths(ttwo.lwt);
// 			paths["pipe2"].redrawPaths(ttwo.ewt);
// 			paths["pipe3"].redrawPaths(ttwo.lwt);
// 		} else {
// 			rects["rect4"].redrawPaths(tone.lwt);
// 			paths["pipe2"].redrawPaths(0);
// 			paths["pipe3"].redrawPaths(0);
// 		}

// 		if(ffour > 0){
// 			rects["pipe56"].redrawPaths(0);
// 			rects["rect13"].redrawPaths(0);
// 			rects["rect6"].redrawPaths(teight.ewt);
// 			paths["pipe10"].redrawPaths(tsev.ewt);
// 			paths["pipe11"].redrawPaths(tsev.lwt);
// 		} else {
// 			rects["pipe56"].redrawPaths(tfour.lwt);
// 			rects["rect13"].redrawPaths(teight.lwt);
// 			rects["rect6"].redrawPaths(tfour.lwt);
// 			paths["pipe10"].redrawPaths(0);
// 			paths["pipe11"].redrawPaths(0);
// 		}
// }

function updateGhx(index) {
	var value = data[index].ghx.ewt//getRandomValue(undefined, -60, 40); //get random value
	redrawGhx(value);
}

function updateStats() {
	for (i=0; i<=stats.length; i++) 
	{
		var value = getRandomValue(tempgauges[key]);
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
	return "#424242";
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

function gaugeColor(){
	return "#303030";
}

function textColor(){
	return "#dfdfdf";
}