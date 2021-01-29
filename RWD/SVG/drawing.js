
function generateCorners() {
	//would like to let step fit device width
	let deviceWidth = document.documentElement.clientWidth;
	let offsetHeight = document.documentElement.clientHeight/2;
	let param_designStep = {
		'frontHeight': 50,
		'frontWidth': 520,
		'backWidth': 480,
		'topleft_dx': 25,
		'topleft_dy': 35
	}
	let ratio = (deviceWidth+20)/520;
	let height = (param_designStep.frontHeight+param_designStep.topleft_dy);
	return [
		{//[0] verticle center left
			x: -10,
			y: param_designStep.topleft_dy*ratio
				+ offsetHeight
				- height*ratio
		},
		{//[1] left bottom
			x: -10, 
			y: height*ratio
				+ offsetHeight
				- height*ratio
		},
		{//[2] righ bottom
			x: -10 + param_designStep.frontWidth*ratio, 
			y: height*ratio
				+ offsetHeight
				- height*ratio
		},
		{//[3] right verticle center
			x: -10 + param_designStep.frontWidth*ratio, 
			y: param_designStep.topleft_dy*ratio
				+ offsetHeight
				- height*ratio
		},
		{//[4] left verticle center
			x: -10, 
			y: param_designStep.topleft_dy*ratio
				+ offsetHeight
				- height*ratio
		},
		{//[5] left top
			x: -10 + param_designStep.topleft_dx*ratio, 
			y: 0 + offsetHeight
				- height*ratio
		},
		{//[6] right top
			x: -10 + param_designStep.topleft_dx*ratio
				+ param_designStep.backWidth*ratio, 
			y:0 + offsetHeight
				- height*ratio
		},
		{//[7] right verticle center
			x: -10 + param_designStep.frontWidth*ratio, 
			y: 35*ratio 
				+ offsetHeight
				- height*ratio
		}
	];
}

function calcGeometricSeries(base, terms) {
	let sum=1;
	for(let i=terms-1; i>0; i--) {
		sum += Math.pow(base, i);
	};
	return sum;
}

function addStair(proto_step, base_info, num_step) {
	let copy = proto_step.clone(true)
	let multi_ratio = calcGeometricSeries(base_info.ratio, num_step);
	let translateTo = {
		'dx': base_info.lb2lt.dx*multi_ratio,
		'dy': base_info.lb2lt.dy*multi_ratio
	}
	let leftTop = {
		'x': base_info.leftBottom.x + translateTo.dx,
		'y': base_info.leftBottom.y + translateTo.dy
	}
	let scale = Math.pow(base_info.ratio, num_step);
	
	let str_style_transf_o =  base_info.leftBottom.x +'px '
								+ base_info.leftBottom.y + 'px';

	let str_style_transf = 'translate(' + translateTo.dx +'px, ' + translateTo.dy + 'px)'
						 	+ 'scale(' + scale + ')';
	copy.style('transform-origin', str_style_transf_o)
		.style('transform', str_style_transf)
		.attr('data-step-num', num_step); 
}

function renderStairs() {
	let pathData = generateCorners();

	let svg = d3.select('section#svg1').append('svg')
		.attr('width', '100%')
		.attr('height', '50vh')
		.attr('id', 'bg_svg')
		.style('position', 'sticky')
		.style('top', '50vh');
	let svg_g = svg.append('g');
	svg_g.attr('id', 'stairs');

	let line = d3.line().x(function(d){
    		return d.x;
		}).y(function(d){
    		return d.y;
	});
	//draw first step
	let proto_step = svg_g.append('path')
		.attr('d', line(pathData))
		.attr('stroke', 'hsl(0, 10%, 70%)')
    	.attr('stroke-width', '1px')
    	.attr('fill', 'none')
    	.attr('data-step-num', 0);

    //base information to build stairs
	let base_coor = {
		'leftBottom': pathData[1],
		'lb2lt': {
			'dx':pathData[5].x-pathData[1].x,
			'dy':pathData[5].y-pathData[1].y
		},
		'ratio': (pathData[6].x-pathData[5].x)/(pathData[2].x-pathData[1].x)
	}
	
	//addStair(proto_step, base_coor, 1);
	//addStair(proto_step, base_coor, 2);

	let height_canvas = d3.select("#bg_svg").node().getBoundingClientRect().height;
	let height_stairs = d3.select("#stairs").node().getBBox().height;
	let count_stairs = 1;
	while(height_stairs < height_canvas) {
		addStair(proto_step, base_coor, count_stairs);
		count_stairs++;
		height_stairs = d3.select('#stairs').node().getBBox().height;
	}
}


