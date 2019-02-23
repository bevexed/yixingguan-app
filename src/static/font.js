window.onload = function () {
	let html = document.querySelector('html');
	let font = parseInt(html.style.fontSize);
	html.style.fontSize = font < 44 ? font + 'px' : 44 + 'px';

	window.onresize = function(){
		html.style.fontSize = font < 44 ? font + 'px' : 44 + 'px';
	};
};

