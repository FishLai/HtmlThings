// initial step paraem 50 520 35 480
function renderPerson() {
	var stair_width = document.documentElement.clientWidth + 50;
	var ratio_design = stair_width/520;
	var path_len = (50+520+50+130)*ratio_design;
	var stair = d3.select('path[data-step-num="1"]');
	var pointOnStep = stair.node().getPointAtLength(path_len);
	var svg = d3.select('svg');
	var g_p = svg.append('g').attr('id', 'person');
	var person_height = 17*10*2;
	var offset_onStep = {dx: 10, dy: -10}

	var listD_r_leg = genLegD({x:pointOnStep.x + offset_onStep.dx, y:pointOnStep.y + offset_onStep.dy},
								 person_height*(5.5/10));
	var listD_l_leg = genLegD({x:pointOnStep.x - offset_onStep.dx, y:pointOnStep.y + offset_onStep.dy},
								 person_height*(5.5/10));

	var str_transf = stair.node().style.transform;
	var str_transf_o = stair.style('transform-origin');
	
	var line = d3.line().x(function(listData) {
		return listData.x;
	}).y(function(listData) {
		return listData.y;
	});
	
	var r_leg = g_p.append('path')
					.attr('d', line(listD_r_leg))
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'r_leg');
	
	var l_leg = g_p.append('path')
					.attr('d', line(listD_l_leg))
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'l_leg');

	var w_body = 51;
	var h_body = person_height*(3.5/10);
	var body_D = {
		x: pointOnStep.x - w_body/2,
		y: pointOnStep.y - person_height*(9/10) + offset_onStep.dy,
		w: w_body,
		h: h_body
	};
	var body = g_p.append('rect')
					.attr('x', body_D.x)
					.attr('y', body_D.y)
					.attr('width', body_D.w)
					.attr('height', body_D.h)
					.style('fill', 'hsl(0, 40%, 100%)')
					.style('stroke', 'black')
					.style('stroke-width', '1px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'person_body');

	var w_head = 34;
	var h_head = person_height*(1/10);
	var head_D = {
		x: pointOnStep.x - w_head/2,
		y: pointOnStep.y - person_height + offset_onStep.dy,
		w: w_head,
		h: h_head
	}

	var head = g_p.append('rect')
					.attr('x', head_D.x)
					.attr('y', head_D.y)
					.attr('width', head_D.w)
					.attr('height', head_D.h)
					.style('fill', 'hsl(0, 40%, 100%)')
					.style('stroke', 'black')
					.style('stroke-width', '1px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o);

	var body_path_len = w_body + 17;
	var param_r_arm = {
		startPoint: body.node().getPointAtLength(body_path_len),
		curveP1: {x:8.5, y:17},
		curveP2: {x:17, y: 34},
		toEnd: {x:0, y:119}
	}
	var path_r_arm = genDPathWithCurve(param_r_arm);
	var r_arm = g_p.append('path')
					.attr('d', path_r_arm)
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.style('fill', 'none');

	body_path_len = body.node().getTotalLength()-17;
	var param_l_arm = {
		startPoint: body.node().getPointAtLength(body_path_len),
		curveP1: {x:-8.5, y:17},
		curveP2: {x:-17, y:34},
		toEnd: {x:0, y:119}
	}
	var path_l_arm = genDPathWithCurve(param_l_arm);
	var l_ram = g_p.append('path')
					.attr('d', path_l_arm)
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.style('fill', 'none');

	function genDPathWithCurve(param) {
		return "m"+ String(param.startPoint.x) +"," +String(param.startPoint.y)
			+"c"+String(param.curveP1.x)+","+String(param.curveP1.y)
			+" "+String(param.curveP2.x)+","+String(param.curveP2.y)
			+" "+String(param.toEnd.x)+","+String(param.toEnd.y);
	};

	function genLegD(origin, len) {
		return [
			origin,
			{x: origin.x, y: origin.y-len}
		];
	};

}


renderPerson();