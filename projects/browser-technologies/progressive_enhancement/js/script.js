// console.log("Foo");

(function () {

	// Init
	if ( document.querySelector ) {
		var pushNotification = document.querySelector('#push-notification');
		var noFancyButton = document.querySelector('#not-fancy');
		var fancyButton = document.querySelector('#fancy');
		var ifAllFailsButton = document.querySelector('#if-all-fails');
		var notificationTitle = document.querySelector('#notification-title');
		var notificationContent = document.querySelector('#notification-content');
		var notificationButton = document.querySelector('#notification-button');
	} else {
		var pushNotification = document.getElementById('push-notification');
		var noFancyButton = document.getElementById('not-fancy');
		var fancyButton = document.getElementById('fancy');
		var ifAllFailsButton = document.getElementById('if-all-fails');
		var notificationTitle = document.getElementById('notification-title');
		var notificationContent = document.getElementById('notification-content');
		var notificationButton = document.getElementById('notification-button');
	};

	var app = {
		louncher:function() {

			// Hide notification on start
			pushNotification.classList.add('hide');
			eventListeners.add();
			notification.askPermission();

		}
	};

	var eventListeners = {
		add: function() {

			noFancyButton.addEventListener('click', notification.nonFancyNotificaion, false);
			fancyButton.addEventListener('click', notification.fancyNotificaion, false);
			ifAllFailsButton.addEventListener('click', notification.ifAllFailsNotificaion, false);

		}
	};

	var notification = {
		askPermission: function() {

			if ( Notification ) {

				Notification.requestPermission(function (permission) {
			    	if (permission === "granted") {

			    		// Show API Conformation
			    		var content = notification.getContent("succes");
			    		notification.showAPINotification(content);

			      	}
			    });

			} else if ( notificationTitle.innerHTML ) {

				// Show HomeMade Notification Conformation
				var content = notification.getContent("succes");
				notification.showHomeMadeNotification(content);

			} else {

				// If everything fails	
				var content = notification.getContent("succes");
				var contentStr = content.title + ", " + content.body;

				notification.showAlert(JSON.stringify(contentStr));

			}

		},
		fancyNotificaion: function() {

			var content = notification.getContent();
			notification.showAPINotification(content);

		},
		nonFancyNotificaion: function() {

			var content = notification.getContent();
			notification.showHomeMadeNotification(content);


		},
		ifAllFailsNotificaion: function() {

			var content = notification.getContent();
			var contentStr = content.title + ", " + content.body;

			notification.showAlert(JSON.stringify(contentStr));


		},
		getContent: function(sort) {

			// Diliver the right content for the message
			// This could talk to your API and will contain different conent every day
			if ( sort === "succes" ) {
				var contentSucces = {
					title: "Gelukt",
					body: "U krijgt elke dag een melding met de nieuwste huizen",
					icon: "../img/funda-logo.png",
					link: null
				};
				return contentSucces;
			}
			var content = {
				title: "Nieuwe Huizen!",
				body: "Er zijn vandaag 4 nieuwe huizen toegevoegd!",
				icon: "../img/funda-logo.png",
				link: null
			};
			return content

		},
		showHomeMadeNotification: function(content) {

			var _content = content;

			// Put the content in the html notification
			notificationTitle.innerHTML = _content.title;
			notificationContent.innerHTML = _content.body;

			// Show the notification
			pushNotification.classList.add('show');

			notificationButton.onclick = function() {

				// Hide notification
				pushNotification.classList.remove('show');

			}

		},
		showAPINotification: function(content) {

			var _content = content;

			// Create new notification and push it to the user
			var notification = new Notification(content.title, {
				icon: content.icon,
				body: content.body
			});

		},
		showAlert: function(content) {

			alert(content);

		}
	};

	app.louncher();

})();

