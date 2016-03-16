var switchButton = document.querySelector('.flex-switch');
var switchButtonInner = document.querySelector('.switch');
var flexContainer = document.querySelector('.container');
var flexContainerInner = document.querySelectorAll('.container-inner');
var alignButton = document.querySelector('.align-settings');

switchButton.addEventListener('click', switchCode, false);

function switchCode() {

	if ( switchButtonInner.innerHTML === "ON") {

		switchButtonInner.innerHTML = "OFF";
		addFlexboxCode();
		alignFlex();

	} else if ( switchButtonInner.innerHTML === "OFF") {

		switchButtonInner.innerHTML = "ON";
		removeFlexboxCode();
		alignNoFlex();

	};

};

function removeFlexboxCode() {

	flexContainer.classList.remove('flexbox-container');
	removeAllAlignment();

};
function addFlexboxCode() {

	flexContainer.classList.add('flexbox-container');
	removeAllAlignment();

};

function removeAllAlignment() {
	
	Array.prototype.forEach.call(flexContainerInner, function(singleInner) {

		singleInner.classList.remove('flex-center');
		singleInner.classList.remove('no-flex-center');

	});

};

function alignNoFlex() {
	alignButton.onclick = function() {
		Array.prototype.forEach.call(flexContainerInner, function(singleInner) {

			console.log(singleInner);

			singleInner.classList.toggle('no-flex-center');
			singleInner.classList.remove('flex-center');

		});
	};
};

function alignFlex() {
	alignButton.onclick = function() {
		Array.prototype.forEach.call(flexContainerInner, function(singleInner) {

			singleInner.classList.toggle('flex-center');
			singleInner.classList.remove('no-flex-center');

		});
	};
};

alignNoFlex();





