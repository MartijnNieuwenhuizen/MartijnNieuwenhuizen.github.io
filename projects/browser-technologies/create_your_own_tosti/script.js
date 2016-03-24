(function() {

	var app = {
		louncher: function() {

			if ( ('querySelector' in document) && ('addEventListener' in document) ) {
				form.addListener();
				formAnimation.reset();

				// Bug fix https://github.com/Modernizr/Modernizr/issues/57
				if ( 'draggable' in document.createElement("div") && !/Mobile|Android|Slick\/|Kindle|BlackBerry|MSIE|Opera Mini|MSIE|Opera Mobi/i.test(navigator.userAgent)  ) {
							
					dragActions.createDropEvents();

				}
			}

		}
	};

	var htmlElements = {
		submitButton: document.querySelector('#submit'),
		list: document.querySelector('#shopping-list'),
		fieldsets: document.querySelectorAll('fieldset'),
		labels: document.querySelectorAll('label')
	};

	var form = {
		addListener: function() {
			var button = htmlElements.submitButton;

			button.addEventListener('click', form.createNewList, false);

		},
		getElements: function() {
			var bread = document.querySelector('#bread input:checked');
			var toppings = document.querySelectorAll('#toppings input:checked');
			var other = document.querySelector('#other');
			var ingredientList = [];

			ingredientList.push(bread.defaultValue);
			if ( other.value != "" ) {
				ingredientList.push(other.value);
			}

			for ( i = 0; i < toppings.length; i ++ ) {
				
				var toppingName = toppings[i].defaultValue;
				ingredientList.push(toppingName);

			}

			return ingredientList;
			
		},
		createNewList: function(e) {

			var newIngredientList = form.getElements();
			list.addNewContent(newIngredientList);
			formAnimation.setToBeginMode();

			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		}
	};

	var list = {
		addNewContent: function(content) {

			var _content = content;
			var list = htmlElements.list;

			_content.forEach(function(contentItem) {
				var listItem = document.createElement('li');
				listItem.innerHTML = contentItem;

				list.appendChild(listItem);

			});

		}
	};

	var formAnimation = {
		addButtonListeners: function() {

			var nextButtons = document.querySelectorAll('.js-button');
			var x = 2;

			for ( i = 0; i < nextButtons.length; i++ ) {

				var nextButton = nextButtons[i];

				nextButton.addEventListener('click', formAnimation.showNextFieldset, false);

				nextButton.next = x;

				x++;

			}

		},
		addNextButtons: function() {

			var fieldsets = htmlElements.fieldsets;
			var y = 1;

			for ( i = 0; i < fieldsets.length; i++ ) {

				var fieldset = fieldsets[i];
				fieldset.classList.add('fieldset' + y);

				if ( y != fieldsets.length ) { // don't set the button at the last fieldset

					// Create button and append it to the html
					var button = document.createElement('button');
					button.innerHTML = "Next";
					button.classList.add('js-button');
					button.type = "nosubmit";
					fieldset.appendChild(button);

					y++;

				}

			}

		},
		hideAllFieldsets: function() {

			var fieldsets = htmlElements.fieldsets;

			for ( i = 0; i < fieldsets.length; i++ ) {
				
				var fieldset = fieldsets[i];
				fieldset.classList.add('hide-left');
				fieldset.classList.remove('show');

			}

		},
		showFieldset: function(select) {

			var currentFieldset = document.querySelector('.fieldset' + select);
			setTimeout(function() {
				currentFieldset.classList.remove('hide-left');
				currentFieldset.classList.add('show');
			}, 300);

		},
		showNextFieldset: function(event) {

			var nexFieldset = event.target.next;

			formAnimation.hideAllFieldsets();
			formAnimation.showFieldset(nexFieldset);		
			
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}

		},	
		setToBeginMode: function() {

			formAnimation.hideAllFieldsets();
			formAnimation.showFieldset("1");

		},
		reset: function() {

			formAnimation.addNextButtons();
			formAnimation.addButtonListeners();
			formAnimation.hideAllFieldsets();
			formAnimation.showFieldset("1");

		}
		
	};

	var dragEvents = {

		allowDrop: function(event) {
		  	
		  	if (event.preventDefault) {
		  		event.preventDefault();
		  	} else {
		  		event.returnValue = false;
		  	}

		},
		drag: function(event) {
		  	
		  	// set targetName on element === the same as the 'for' on the html element
		    event.dataTransfer.setData("targetName", event.target.htmlFor);

		},
		drop: function(event) {

			// get the targetName of the draged element
		    var data = event.dataTransfer.getData("targetName");
		    // get the label with the same 'for' name on the html
		    var element = document.querySelector('label[for="'+ data +'"]');
		    // get the inner html of the selected label
		    var text = element.innerHTML;
		    // create new list item
		    var newListItem = document.createElement('li');
		    // set the list item inner html to the inner html of the selected label
		    newListItem.innerHTML = text;
		    // add the new list item to the ul
		    event.target.appendChild(newListItem);

		    if (event.preventDefault) {
		  		event.preventDefault();
		  	} else {
		  		event.returnValue = false;
		  	}

		}

	};

	var dragActions = {
		createDropEvents: function() {

			dragActions.setLabels();
			dragActions.setBox();
			dragActions.addClass('label', 'js-highlight-label');

		},
		setLabels: function() {	

			var labels = htmlElements.labels;
			for ( i = 0; i < labels.length; i ++ ) {

				var label = labels[i];

				label.ondragstart = function() {
					dragEvents.drag(event);
				};

			}

		},
		setBox: function() {
			
			// get ul
			var dropArea = htmlElements.list;
			// set new min height && bg color with css class
			dropArea.classList.add('js-drop-area');
			
			// allow drop in this area
			dropArea.ondrop = function() {
				dragEvents.drop(event);
			}
			dropArea.ondragover = function() {
				dragEvents.allowDrop(event);
			}	

		},
		addClass: function(input, className) {

			var elements = document.querySelectorAll(input);
			for ( i = 0; i < elements.length; i++ ) {
				elements[i].classList.add(className);
			}

		}

	}
		
	app.louncher();

}());