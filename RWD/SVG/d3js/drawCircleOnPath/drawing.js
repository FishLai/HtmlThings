var svg = d3.select('main').append('svg')
			.attr('width', '100%')
			.attr('height', '100%');

var line = d3.line()
			.x(function(d) {
				return d.x;
			}).y(function(d) {
				return d.y;
			});

var data = [
	{x: 20, y: 20},
	{x: 60, y: 25},
	{x: 100, y: 70},
	{x: 20, y: 70},
	{x: 20, y: 20}
]

var poly = svg.append('path')
			.attr('d', line(data))
			.attr('stroke', 'hsl(0, 10%, 70%)')
			.attr('stroke-width', '2px')
			.style('fill', 'none');

var data_leg = []

curve_d = "m 170,308.4321 c 4.21,-70 10.21,-70 16.42,-55.83";


var data2 = [
	{x: 100, y:100},
	{x: 125, y: 90},
	{x: 100, y: 150}
]

var curve = d3.line(d => d.x, d => d.y)
				.curve(d3.curveNatural);

svg.append('path')
	.attr('d', curve(data2))
	.attr('stroke', 'red')
	.attr('stroke-width', '2px')
	.attr('fill', 'none');