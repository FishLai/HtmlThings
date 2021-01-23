
function typingWord(text, selector_string, i) {
	if(i<text.length){
		blinkcursor = document.querySelector(selector_string);
		word = text[i];
		blinkcursor.insertAdjacentText('beforebegin', word);
		i++;
		setTimeout(typingWord(text, selector_string, i), 300);
	}
}

function typingLine(split_text, selector_string, j) {
	if(j<split_text.length) {
		text = split_text[j].valueOf();
		typingWord(text, selector_string, 0);
		blinkcursor = document.querySelector(selector_string);
		el = document.createElement('br');
		blinkcursor.insertAdjacentElement('beforebegin', el);
		j++;
		setTimeout(typingLine(split_text, selector_string, j), 10000);
	}
}

function typewriter(el) {
	text = el.innerText;
	split_text = text.split('\n');
	el.innerHTML = '<span class="blink-cursor"></span>';
	selector_string = 'span.blink-cursor';
	typingLine(split_text, selector_string, 0);
}


var el = document.querySelector('p');
typewriter(el);
