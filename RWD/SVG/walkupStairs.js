
function walkUpStair() {
	var stair_width = document.documentElement.clientWidth + 50;
	var ratio_design = stair_width/520;
	var path_len = (50+520+50+130)*ratio_design;
	var stair = d3.select('path[data-step-num="1"]');
	var pointOnStep = stair.node().getPointAtLength(path_len);
	var g_p = d3.select('#person');

	var offset_onStep = {dx: 10, dy: -10}
	
}