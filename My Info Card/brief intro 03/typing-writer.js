function typewriter(el) {
	text = el.innerText;
	el.innerText = "";
	node = document.createElement('span');
	node.classList.add('blink-cursor');
	el.appendChild(node);
	
}


var el = document.querySelector('p');

