var towns = new Array(
	"London",
	"Amsterdam",
	"Warsaw",
	"Prague",
	"Vienna",
	"Tokyo",
	"Berlin"
	);

var random = new Array(
	"44418",
	"523920",
	"796597",
	"551801",
	"1118370",
	"638242",
	"2122265",
	"839722",
	"968019",
	"834463",
	"565346",
	"1521894",
	"615702",
	"804365",
	"721943",
	"766273"
	);
// Połączenie z API i wyświetlanie pogody // 
$(document).ready(function(){
    $("button").click(function(event){
        event.stopPropagation();
        var id = $(this).attr('id');
        btn = document.getElementById(id);

	 var ourRequest = new XMLHttpRequest();
	 if(id == towns[0])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/44418/');
	else if(id == towns[1])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/727232/');
	else if(id == towns[2])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/523920/');
	else if(id == towns[3])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/796597/');
	else if(id == towns[4])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/551801/');
	else if(id == towns[5])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/1118370/');
	else if(id == towns[6])
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/638242/');
	else var error = 1;

	if(error != 1)
	{
	ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	};
	ourRequest.send();

	}
});
   });



function renderHTML(data){

	var town_title = document.getElementById("town");
	var clock = document.getElementById("clock");

	var town = "<h1>"+data.title+"</h1>"; 
	var date = data.time;

	var today = date.substring(-1,10);
	var time = date.substring(11, 16);

	var sunrise = data.sun_rise;
	var sunset = data.sun_set;

	var sunrise = data.sun_rise.substring(11,16);
	var sunset = data.sun_set.substring(11,16);

	var weather_icon = new Array();
	var weather_name = new Array();
	var temps = new Array();
	var air = new Array();
	var humidity = new Array();


	for(var i = 0; i < 5; i++)
	{
		temps[i] = data.consolidated_weather[i].the_temp.toPrecision(2);
		air[i] = data.consolidated_weather[i].air_pressure.toPrecision(4);
		humidity[i] = data.consolidated_weather[i].humidity.toPrecision(2);
		weather_icon[i] = data.consolidated_weather[i].weather_state_abbr;
		weather_name[i] = data.consolidated_weather[i].weather_state_name;
	};

	var day0 = "<h2>Today</h2><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon[0] +".svg'> "+ weather_name[0] +"</li><li><span>Temp: </span>" + temps[0] + "&#186C</li><li><span>Air pressure: </span>" + air[0] + "mb</li><li><span>Humidity: <br></span>" + humidity[0] + "%</li></ul>";
	var day1 = "<h2>"+ date1(1) +"</h2><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon[1] +".svg'> "+ weather_name[1] +"</li><li><span>Temp: </span>" + temps[1] + "&#186C</li><li><span>Air pressure: </span>" + air[1] + "mb</li><li><span>Humidity: <br></span>" + humidity[1] + "%</li></ul>";
	var day2 = "<h2>"+ date1(2) +"</h2><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon[2] +".svg'> "+ weather_name[2] +"</li><li><span>Temp: </span>" + temps[2] + "&#186C</li><li><span>Air pressure: </span>" + air[2] + "mb</li><li><span>Humidity: <br></span>" + humidity[2] + "%</li></ul>";
	var day3 = "<h2>"+ date1(3) +"</h2><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon[3] +".svg'> "+ weather_name[3] +"</li><li><span>Temp: </span>" + temps[3] + "&#186C</li><li><span>Air pressure: </span>" + air[3] + "mb</li><li><span>Humidity: <br></span>" + humidity[3] + "%</li></ul>";
	var day4 = "<h2>"+ date1(4) +"</h2><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon[4] +".svg'> "+ weather_name[4] +"</li><li><span>Temp: </span>" + temps[4] + "&#186C</li><li><span>Air pressure: </span>" + air[4] + "mb</li><li><span>Humidity: <br></span>" + humidity[4] + "%</li></ul>";


	var weather;
	town_title.innerHTML = "<h1><span>"+town+"</span></h1>";
	clock.innerHTML = "<ul class='time'><li>Time: "+ time +"</li><li>Sunrise:<br>"+ sunrise +"</li><li>Sunset:<br>"+ sunset +"</li><li>Date:<br>"+ today +"</li></ul>";
	weather = document.getElementById("day0");
	weather.innerHTML = day0;
	weather = document.getElementById("day1");
	weather.innerHTML = day1;
	weather = document.getElementById("day2");
	weather.innerHTML = day2;
	weather = document.getElementById("day3");
	weather.innerHTML = day3;
	weather = document.getElementById("day4");
	weather.innerHTML = day4;

}
// Wyświetlanie dni do pogody //
function date1(d)
{
	var date = new Date();

  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate() + d;
  var monthIndex = date.getMonth();

  return day + ' ' + monthNames[monthIndex];
}

// Wyszukiwanie miasta //
$(document).ready(function(){
  	 $(".empty").click(function(event){

        event.stopPropagation();
        var id = $(this).attr('id');
        btn = document.getElementById(id);

        popup();
		
		$("#search").click(function(){

		        var search = document.getElementById("town_search").value;
				 var ourRequest1 = new XMLHttpRequest();

				ourRequest1.open('GET', 'https://www.metaweather.com/api/location/search/?query='+search);
				ourRequest1.onload = function() {
				var ourData1 = JSON.parse(ourRequest1.responseText);
					woeid(ourData1);
			};
			ourRequest1.send();
		});
	});
});

function woeid(data)
{
	if(data[0] == undefined)
	{
		document.getElementById('error').innerHTML = "Nie posiadamy takiego miasta w bazie :C";
	}else
	{
		var woeid = data[0].woeid;
		var ourRequest = new XMLHttpRequest();
		
		ourRequest.open('GET', 'https://www.metaweather.com/api/location/'+ woeid);

		ourRequest.onload = function() {
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);
		}
		ourRequest.send(); 

		$('popup').css({'transform':'scale(0,0)'});
		$('body').css({'overflow': 'visible'});
		setTimeout(function()
		{
			$('.blackwall').fadeOut(500);

		},300)
	}
}
// Okienko popup //
function popup()
{
	$('.blackwall').fadeIn(500,function(){
		$('#popup').css({'transform':'scale(1,1)'});
		$('body').css({'overflow': 'hidden'})
	});
	$('a.hider').on('click',function(){
		$('popup').css({'transform':'scale(0,0)'});
		$('body').css({'overflow': 'visible'});
		setTimeout(function()
		{
			$('.blackwall').fadeOut(500);

		},300)
	});

	$('#search').on('click',function(){
		$('#popup').css({'transform':'scale(1,1)'});
		$('body').css({'overflow': 'hidden'})
	})
}
// Losowa pogoda //
function random1(o)
{
$(document).ready(function(){
   
        var id = $(this).attr('id');
        btn = document.getElementById(id);

        var random0 = document.getElementById("random0");
        var random1 = document.getElementById("random1");
        var random2 = document.getElementById("random2");
		 var ourRequest = new XMLHttpRequest();
		
		var los = Math.floor(Math.random() * random.length);

		ourRequest.open('GET', 'https://www.metaweather.com/api/location/'+random[los]);
		ourRequest.onload = function() {
		var ourData = JSON.parse(ourRequest.responseText);
			renderRandom(ourData,o)
		}
		ourRequest.send();	
});
}
function renderRandom(data,i)
{

	var town = "<h3>"+data.title+"</h3>";

	var date = data.time;
	var time = date.substring(11, 16);

	
	var weather_icon = data.consolidated_weather[0].weather_state_abbr;
	var weather_name = data.consolidated_weather[0].weather_state_name;
	var temps = data.consolidated_weather[0].the_temp.toPrecision(2);


	var random1 = "<h3>"+ town +"</h3><ul><li><img src='https://www.metaweather.com/static/img/weather/"+ weather_icon +".svg'></li><li>"+ weather_name +"</li><li><span>Temp: </span>" + temps + "&#186C</li><li>Time: " + time + "</li></ul>";

	var random0 = document.getElementById(i);
	random0.innerHTML = random1;


}
random1("random0");
random1("random1");
random1("random2");

// Preloader //
$(window).ready(function() {

	$('html').addClass('js');
    setTimeout(
      function()
      {
          $("#loader-wrapper").fadeOut();
      }, 2500);
});

jQuery(document).ready(function($){
  op = function(obj) {
    $(obj).stop().slideToggle();
    };
});

// Blokada Entera //
$(document).keydown(function(e){
	var $key = 13;

	if(e.keyCode == $key)
	{
		return false;
	
	}
})