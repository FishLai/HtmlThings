window.addEventListener('load', function() {
	var div_content = document.getElementById('content');
	var onWalk = walkUp.infinite;
	var isScrolling;
	var scroll_times = 0;
	div_content.addEventListener('scroll', () => {
		if(!Boolean(scroll_times%2) && !onWalk) {
			onWalk = walkUp.infinite = true;
			walkUp.raiseFootR(walkUp.speed = 750);
		} else if( Boolean(scroll_times%2) && onWalk) {
			onWalk = walkUp.infinite = false;
		};
		window.clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			console.log('scrolling end');
			scroll_times++;
			console.log(scroll_times);
		}, 200);
	}, false);
}, false);