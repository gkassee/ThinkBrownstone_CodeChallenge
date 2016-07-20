$(document).ready(function(){

	//Creating an object to compute total purchase amounts
	var Calculator = function() {

			//Getting the zone selected by the user
			this.zone = function(x) {
				// Gets first value in drop down on load
				userZone = document.getElementById('zone-select').value;
				userZone = userZone - 1
				console.log("Selected zone is " + userZone);

				// Gets drop down value if changed
				document.getElementById('zone-select').onchange = function() {
					userZone = document.getElementById('zone-select').value;
					userZone = userZone - 1
					console.log(userZone)
					calculateFare();
				}
			}

			//Getting the travel time selected by the user
			this.time = function(x) {
				// Gets first value in drop down on load
				userTime = document.getElementById('time-select').value;
				console.log("Selected time is " + userTime);

				// Gets drop down value if changed
				document.getElementById('time-select').onchange = function(){
					userTime = document.getElementById('time-select').value;

					console.log(userTime);
					timeHelperInfo();
					calculateFare();
				}
			}

			//Getting the purchase location selected by the user
			this.purchaseLocation = function(x) {
				// If the user elects to purchase in advance
				document.getElementById('atKiosk').onchange = function() {
					userPL = document.getElementById('atKiosk').value;
					console.log(userPL)
					locationHelperInfo();
					calculateFare();
				}

				//If the user elects to purchase onboard
				document.getElementById('atOnboard').onchange = function() {
					userPL = document.getElementById('atOnboard').value;
					console.log(userPL)
					locationHelperInfo();
					calculateFare();
				}
			}

			// The amount of trips the user is purchasing
			this.rideNumber = function(x) {
				document.getElementById('ride-number').onkeyup = function(){
						userRN = document.getElementById('ride-number').value;
						console.log(userRN)
						calculateFare();
					};
			}


	}

	// Provides the user with info related to their selected travel time
	var timeHelperInfo = function() {
		$.ajax({
			type: "GET",
  		dataType: 'json',
			url: "./javascripts/fares.json",
			success: function(response){

				// Updates helper info with relevant info based on the user's time selection
				if (userTime == "anytime") {
				document.getElementById('time-helper-text').innerHTML = response.info.anytime
				} else if (userTime == "weekday") {
				document.getElementById('time-helper-text').innerHTML = response.info.weekday
				} else {
				document.getElementById('time-helper-text').innerHTML = response.info.evening_weekend
				}
			}
		});
	};

	// Provides the user with info related to their selected purchase location
	var locationHelperInfo = function() {
		$.ajax({
			type: "GET",
  		dataType: 'json',
			url: "./javascripts/fares.json",
			success: function(response){

				// Updates helper info with relevant info based on the user's purchase location selection
				if (userPL == "advance_purchase") {
					document.getElementById('location-helper-text').innerHTML = response.info.advance_purchase
				} else {
					document.getElementById('location-helper-text').innerHTML = response.info.onboard_purchase
				}
			}
		});
	};

	// Combines the users inputs to calculate their total purchase amount
	var calculateFare = function() {
		$.ajax({
				type: "GET",
    		dataType: 'json',
				url: "./javascripts/fares.json",
				success: function(response){
				var x = response.zones[userZone]
				var i = 0
				var s = 0

				while (s == 0){
					if (x.fares[i].type == userTime && x.fares[i].purchase == userPL) {

							s = x.fares[i].price 
							w = s*userRN

							document.getElementById('fare-cost').innerHTML =
								"$" + w.toFixed(2)

					}else {
						i++
					}
				}


			}
		});
	};



// Creating an instance of the object
var fareCalculator = new Calculator();

// Calling the object functions
fareCalculator.zone();
fareCalculator.time();
fareCalculator.purchaseLocation();
fareCalculator.rideNumber();

});