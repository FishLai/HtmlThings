
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
	let height = param_designStep.frontHeight+param_designStep.topleft_dy;
	return [
		{
			x: -10, 
			y: param_designStep.topleft_dy*ratio
				+ offsetHeight
				- height*ratio
		},
		{
			x: -10, 
			y: height*ratio
				+ offsetHeight
				- height*ratio
		},
		{
			x: -10 + param_designStep.frontWidth*ratio, 
			y: 85*ratio
				+ offsetHeight
				- height*ratio
		},
		{
			x: -10 + param_designStep.frontWidth*ratio, 
			y: 35*ratio
				+ offsetHeight
				- height*ratio
		},
		{
			x: -10, 
			y: param_designStep.topleft_dy*ratio
				+ offsetHeight
				- height*ratio
		},
		{
			x: -10 + param_designStep.topleft_dx*ratio, 
			y: 0 + offsetHeight
				- height*ratio
		},
		{
			x: -10 + param_designStep.topleft_dx*ratio
				+ param_designStep.backWidth*ratio, 
			y:0 + offsetHeight
				- height*ratio
		},
		{
			x: -10 + param_designStep.frontWidth*ratio, 
			y: 35*ratio 
				+ offsetHeight
				- height*ratio
		}
	];
}
function renderStairs() {
	let pathData = generateCorners();
	let base_coor = {
		'leftBottom': pathData[1],

	}

	let svg = d3.select('section#svg1').append('svg')
		.attr('width', '100%')
		.attr('height', '50vh')
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
		.attr('y', 0)
		.attr('stroke', 'hsl(0, 10%, 70%)')
    	.attr('stroke-width', '3px')
    	.attr('fill', 'none');


}