document.addEventListener('DOMContentLoaded', function () {

	var door_handle = document.getElementById('door-handle');
	function isloadSVG(){
		var svgDoc = door_handle.contentDocument;
		console.log('svg load' + door_handle);
	}
	door_handle.addEventListener('load', isloadSVG);
})