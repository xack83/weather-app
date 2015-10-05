//Get user's location
var getLocation = function() {
	var xhrCity = new XMLHttpRequest();
	//Calling ipinfo API to get current location
	xhrCity.open("GET","http://ipinfo.io/json",false);
	xhrCity.send();
	 
	//Parsing info from request
	var jsonCity = JSON.parse(xhrCity.responseText);
	//Get city and country from parsed data and return result
	var loc = jsonCity.city.toLowerCase()+","+jsonCity.country.toLowerCase();
	return loc;
};


//Get weather data according to location
//Parameters: location and units (metric, imperial)
var getData = function (loc, units) {
	var xhr = new XMLHttpRequest();
	//Call OpenWeather API
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units="+units;
	xhr.open("GET",url,false);
	xhr.send();
	
	//Defines correct nomenclature according to "units" variable
	var windSpeed = "";
	if (units === "metric") {
		windSpeed = "km/h";
	}
	else {
		windSpeed = "mph";
	}

	//Parse API data
	var json = JSON.parse(xhr.responseText);
	//Store weather icon
	var iconID = json.weather[0].icon;
	//Using weather info to update HTML
	document.getElementById("location").innerHTML = json.name+", "+json.sys.country;
	document.getElementById("temperature").innerHTML = json.main.temp.toFixed(0)+"º";
	document.getElementById("iconWeather").src = "http://openweathermap.org/img/w/"+json.weather[0].icon+".png";
	document.getElementById("weather-desc").innerHTML = json.weather[0].description;
	document.getElementById("wind-info").innerHTML = "Wind: "+json.wind.speed+" "+windSpeed;

	//JQuery instructions to replace background according to current weather (iconID)
	$(document).ready(function() {
	    $('body').css("background-image", "url(./img/"+iconID+".png)");
	});
};

//Call to getLocation function
var myLoc = getLocation();
//Call to getData function using user's location and setting "metric" units as default
getData(myLoc,"metric");

//JQuery instructions to change between celsius and fahrenheit degrees
$(document).ready(function() {
	//When Cº/Fº is clicked, getData function is called with new units, current unit symbol is set to white color, and the other one is set to darker color
    $('#celsius').click(function() {
    	$(this).css("color","white");
    	$('#fah').css("color","#666");
        getData(myLoc,"metric");
    });
    $('#fah').click(function() {
    	$(this).css("color","white");
    	$('#celsius').css("color","#666");
        getData(myLoc,"imperial");
    });
});