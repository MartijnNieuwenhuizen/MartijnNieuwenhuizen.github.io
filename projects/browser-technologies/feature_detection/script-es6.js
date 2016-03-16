if ( window.Array.prototype ) {

	console.log("Array.prototype is avalible in your browser");

} else {

	console.log("Array.prototype is not avalible in your browser, please use the for loop");

};
var button = document.querySelector('.loop-button');

button.onclick = function() {

	var items = document.querySelectorAll('.container-inner');

	if ( window.Array.prototype ) {

		// arrayLoop(items)
		forLoop(items)

	} else {

		forLoop(items)

	};	

};

function arrayLoop(itemsList) {

	Array.prototype.forEach.call(itemsList, function(item) {

		item.classList.toggle('collapse');

	});

};
function forLoop(itemsList) {

	for( i = 0; i < itemsList.length; i ++ ) {

		itemsList[i].classList.toggle('collapse');

	}

};