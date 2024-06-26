"use strict"
// Dixie Tech College Coordinates 37.105045,-113.564835


// fetch weather alerts
const getWeatherAlerts = async () => {
    const url = "https://api.weather.gov/alerts/active/area/UT";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};


// fetch weather forecast
const getForecast = async () => {
    const url = "https://api.weather.gov/gridpoints/SLC/37,113/forecast";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};


// Display current weather in box1 - references back to getForecast
document.addEventListener("DOMContentLoaded", async () => {
    const displayWeather = async () => {
        const currentWeather = await getForecast();
        const todaysWeather = currentWeather["properties"]["periods"][0]
        const currentWeatherOutput = document.getElementsByClassName("box1")[0];

        if (!currentWeather) {
            currentWeatherOutput.innerHTML = "Failed to load current weather data.";
            return;
        }

        let shortForecast = todaysWeather["shortForecast"];
        const imageContainer = document.getElementById('weather-icon');

        imageContainer.innerHTML = '';
        const img = document.createElement('img');
        img.width = 80;
        img.height = 80; 

        if (shortForecast.includes("Sunny") || shortForecast.includes("Clear")) {
            img.src = 'photos/sunny.png';
            img.alt = 'Sun';
        } else if (shortForecast.includes("Cloudy")) {
            img.src = 'photos/cloudy.png';
            img.alt = 'Cloud';
        } else if (shortForecast.includes("Showers") || shortForecast === "Rain") {
            img.src = 'photos/rainy.png';
            img.alt = 'Rain Cloud';
        } else if (shortForecast.includes("Thunder") || shortForecast.includes("Lightning")) {
            img.src = 'photos/thunderstorm.png';
            img.alt = 'cloud with lightning and rain';
        } else if (shortForecast.includes("Windy") || shortForecast.includes("Wind")) {
            img.src = 'photos/windy.png';
            img.alt = 'wind graphic with cloud';
        }
        
        imageContainer.appendChild(img);        

        let weather = todaysWeather["detailedForecast"];
        console.log(`Current Weather Conditions: ${weather}`);
        document.getElementById("weather-condition").innerHTML = `${weather}`;

    };


    // Display current weather alerts in box1 number 3 - references back to getForecast
    const displayForecast = async () => {
        const currentForecast = document.getElementsByClassName("box1")[1];
        const currentWeather = await getForecast();
        const todaysWeather = currentWeather["properties"]["periods"][1];

        if (!currentWeather) {
            currentForecast.innerHTML = "Failed to load current weather alerts.";
            return;
        }

        let weather = todaysWeather["detailedForecast"];
        console.log(`Current Weather Conditions: ${weather}`);
        document.getElementById("weather-condition2").innerHTML = `${weather}`;

    };


    // Display current weather alerts in box1 number 2 - references back to getWeatherAlerts
    const displayWeatherAlerts = async () => {
        const weatherAlerts = await getWeatherAlerts();
        const todaysWeatherAlerts = weatherAlerts["features"][0]["properties"]
        const currentweatherAlerts = document.getElementsByClassName("box1")[2];

        if (!weatherAlerts) {
            currentweatherAlerts.innerHTML = "Failed to load current weather alerts.";
            return;
        }
        if (weatherAlerts["features"].length === 0){
            document.getElementById("weather-condition3").innerHTML = '<font color="#0a5562">No weather alerts at this time.</font>';
            return "No alerts at this time."
        }

        let alerts = todaysWeatherAlerts["headline"];
        let alertExpire = todaysWeatherAlerts["parameters"]["NWSheadline"];
        
        document.getElementById("weather-condition3").innerHTML = `${alerts}`
        document.getElementById("alert-expiration").innerHTML = `${alertExpire}`
        

    };


    displayWeather();
    displayForecast();
    displayWeatherAlerts();


    // gets daily temperatures for a week using getForecast will display the temperatures on the line graph
    const getDailyTemperatures = async () => {
        let dayTemperatures = [];
        const currentWeather = await getForecast();
        const todaysWeather = currentWeather["properties"]["periods"];

        for (let i = 0; i < todaysWeather.length; i++) {
            if (todaysWeather[i]["isDaytime"] === true){
                dayTemperatures.push(todaysWeather[i]["temperature"]);
                console.log(todaysWeather[i]["temperature"]);
            }
        }

        console.log(dayTemperatures);
        return dayTemperatures;
    };


    // gets nightly temperatures for a week using getForecast will display the temperatures on the line graph
    const getNightlyTemperatures = async () => {
        let nightTemperatures = [];
        const currentWeather = await getForecast();
        const todaysWeather = currentWeather["properties"]["periods"];

        for (let i = 0; i < todaysWeather.length; i++) {
            if (todaysWeather[i]["isDaytime"] === false){
                nightTemperatures.push(todaysWeather[i]["temperature"]);

                console.log(todaysWeather[i]["temperature"]);
            }
        }
        return nightTemperatures;
    };

    // gets the date from weather.gov to be displayed at the bottom of the chart on the x-axis
    const getTemperatureDate = async () => {
        let TemperaturesDate = [];
        const currentWeather = await getForecast();
        const todaysWeather = currentWeather["properties"]["periods"];

        for (let i = 0; i < todaysWeather.length; i++) {
            if (todaysWeather[i]["isDaytime"] === false){
                let temperatureDate = todaysWeather[i]["startTime"];
                let date = temperatureDate.slice(0, 10);
                TemperaturesDate.push(date);
            }
        }
        return TemperaturesDate;
    };


    // Display chart from chartjs.org
    const ctx = document.getElementById('weather-chart');

    Chart.defaults.color = '#FFF';
    Chart.defaults.borderColor = '#8e8d8d';
    new Chart(ctx, {
    type: 'line',
    data: {
            labels: await getTemperatureDate(),
            datasets: [{
            label: 'Day Time Temperature',
            data: await getDailyTemperatures(),
            borderWidth: 1,
            borderColor: 'cadetblue',
            backgroundColor: 'rgb(112, 185, 188)',
            },
            {
                label: 'Night Time Temperature',
                data: await getNightlyTemperatures(),
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: '#000',
            },
            ]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
    });

});


