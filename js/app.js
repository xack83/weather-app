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
	document.getElementById("location").innerHTML = json.name+", "+json.sys.country;
	document.getElementById("temperature").innerHTML = json.main.temp.toFixed(0)+"º";
	document.getElementById("other").innerHTML = json.weather[0].description+" | "+json.wind.speed+" "+windSpeed;
};

var myLoc = getLocation();
getData(myLoc,"metric");

$(document).ready(function() {
    $('#celsius').click(function() {
        getData(myLoc,"metric");
    });
    $('#fah').click(function() {
        getData(myLoc,"imperial");
    });
});