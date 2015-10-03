//Get location
var getLocation = function() {
	var xhrCity = new XMLHttpRequest();
	xhrCity.open("GET","http://ipinfo.io/json",false);
	xhrCity.send();
	 
	var jsonCity = JSON.parse(xhrCity.responseText);
	var loc = jsonCity.city.toLowerCase()+","+jsonCity.country.toLowerCase();

	return loc;
};


//Get data
var getData = function (loc, units) {
	var xhr = new XMLHttpRequest();
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units="+units;
	xhr.open("GET",url,false);
	xhr.send();
	
	var windSpeed = "";
	if (units === "metric") {
		windSpeed = "km/h";
	}
	else {
		windSpeed = "mph";
	}

	var json = JSON.parse(xhr.responseText);
	var iconID = json.weather[0].icon;
	document.getElementById("location").innerHTML = json.name+", "+json.sys.country;
	document.getElementById("temperature").innerHTML = json.main.temp.toFixed(0)+"º";
	document.getElementById("iconWeather").src = "http://openweathermap.org/img/w/"+json.weather[0].icon+".png";
	document.getElementById("weather-desc").innerHTML = json.weather[0].description;
	document.getElementById("wind-info").innerHTML = json.wind.speed+" "+windSpeed;

	$(document).ready(function() {
	    $('body').css("background-image", "url(./img/"+iconID+".png)");
	    //$('body').css("background-image", "url(./img/50n.png)");
	});
};

var myLoc = getLocation();
getData(myLoc,"metric");

$(document).ready(function() {
	//Change celsius/fahrenheit
    $('#celsius').click(function() {
        getData(myLoc,"metric");
    });
    $('#fah').click(function() {
        getData(myLoc,"imperial");
    });
});