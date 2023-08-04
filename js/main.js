async function fetchText(city='Cairo') {
    var response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=9d3495aaa18d4e5cb60190144230308&q='+city+'&days=3&aqi=yes&alerts=yes')

    var data = await response.text();
    weather = JSON.parse(data);

    day1 = {
        temp: weather.forecast.forecastday[0].day.avgtemp_c,
        icon: weather.forecast.forecastday[0].day.condition.icon,
        dayName: getDayName(weather.forecast.forecastday[0].date, "en-US"),
        month: getMonthName(weather.forecast.forecastday[0].date, "en-US"),
        day: +weather.forecast.forecastday[0].date.substr(8),
        condition: weather.forecast.forecastday[0].day.condition.text,
        windSpeed: weather.forecast.forecastday[0].day.maxwind_mph,
        windDegree: weather.forecast.forecastday[0].hour[0].wind_degree,
        windDir: weather.forecast.forecastday[0].hour[22].wind_dir
    }

    day2 = {
        maxTemp: weather.forecast.forecastday[1].day.maxtemp_c,
        minTemp: weather.forecast.forecastday[1].day.mintemp_c,
        icon: weather.forecast.forecastday[1].day.condition.icon,
        dayName: getDayName(weather.forecast.forecastday[1].date, "en-US"),
        condition: weather.forecast.forecastday[1].day.condition.text,
    }

    day3 = {
        maxTemp: weather.forecast.forecastday[2].day.maxtemp_c,
        minTemp: weather.forecast.forecastday[2].day.mintemp_c,
        icon: weather.forecast.forecastday[2].day.condition.icon,
        dayName: getDayName(weather.forecast.forecastday[2].date, "en-US"),
        condition: weather.forecast.forecastday[2].day.condition.text,
    }

    document.querySelector('.day1 .top p').innerHTML = day1.dayName;
    document.getElementById('day1date').innerHTML = day1.day + ' ' + day1.month;
    document.querySelector('.deg').innerHTML = day1.temp + '&deg;c';
    document.getElementById('day1state').innerHTML = day1.condition;
    var winds = document.querySelectorAll('.day1 span');
    winds[0].innerHTML ='<i class="fa fa-umbrella"></i> '+ day1.windDegree + '%';
    winds[1].innerHTML = '<i class="fa fa-wind"></i> ' + day1.windSpeed + 'km/h';
    winds[2].innerHTML = '<i class="fa fa-compass"></i> '+day1.windDir;
    document.querySelector('.day1 img').src = 'https:' + day1.icon;
    document.querySelector('.day1 .city').innerHTML = city;

    document.querySelector('.day2 .top p').innerHTML = day2.dayName;
    document.querySelector('.day2 .max').innerHTML = day2.maxTemp + '&deg;c';
    document.querySelector('.day2 .min').innerHTML = day2.minTemp + '&deg;c';
    document.querySelector('.day2 .state').innerHTML = day2.condition;
    document.querySelector('.day2 img').src = 'https:' + day2.icon;

    document.querySelector('.day3 .top p').innerHTML = day3.dayName;
    document.querySelector('.day3 .max').innerHTML = day3.maxTemp + '&deg;c';
    document.querySelector('.day3 .min').innerHTML = day3.minTemp + '&deg;c';
    document.querySelector('.day3 .state').innerHTML = day3.condition;
    document.querySelector('.day3 img').src = 'https:' + day3.icon;

}


function getDayName(date, locale) {
    var date = new Date(date);
    return date.toLocaleDateString(locale, { weekday: 'long' });
};
function getMonthName(date, locale) {

    var date = new Date(date);
    return date.toLocaleDateString(locale, { month: 'long' });
};

async function city(text)
{
    var response = await fetch('https://api.weatherapi.com/v1/search.json?key=9d3495aaa18d4e5cb60190144230308&q='+text);
    var data = await response.text();
    var city = JSON.parse(data);
    fetchText(city[1].name)
}