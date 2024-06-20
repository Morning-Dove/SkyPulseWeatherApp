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
        const currentWeatherOutput = document.getElementsByClassName("box1")[0];

        const currentWeather = await getForecast();
        if (!currentWeather) {
            currentWeatherOutput.innerHTML = "Failed to load current weather data.";
            return;
        }

        let shortForecast = currentWeather["properties"]["periods"][0]["shortForecast"];
        const imageContainer = document.getElementById('weather-icon');

        imageContainer.innerHTML = '';

        if (shortForecast.includes("Sunny") || shortForecast.includes("Clear")) {
            const img = document.createElement('img');
            img.src = 'photos/sunny.png';
            img.alt = 'Sun';
            img.width = 80;
            img.height = 80; 
            imageContainer.appendChild(img);
        } else if (shortForecast.includes("Cloudy")) {
            const img = document.createElement('img');
            img.src = 'photos/cloudy.png';
            img.alt = 'Cloud';
            img.width = 80;
            img.height = 80; 
            imageContainer.appendChild(img);
        } else if (shortForecast.includes("Showers") || shortForecast === "Rain") {
            const img = document.createElement('img');
            img.src = 'photos/rainy.png';
            img.alt = 'Rain Cloud';
            img.width = 80;
            img.height = 80; 
            imageContainer.appendChild(img);
        } else if (shortForecast.includes("Thunder") || shortForecast.includes("Lightening")) {
            const img = document.createElement('img');
            img.src = 'photos/thunderstorm.png';
            img.alt = 'cloud with lightening and rain';
            img.width = 80;
            img.height = 80; 
            imageContainer.appendChild(img);
        } else if (shortForecast.includes("Windy") || shortForecast.includes("Wind")) {
            const img = document.createElement('img');
            img.src = 'photos/windy.png';
            img.alt = 'wind graphic with cloud';
            img.width = 80;
            img.height = 80; 
            imageContainer.appendChild(img);
        }
        

        let weather = currentWeather["properties"]["periods"][0]["detailedForecast"];
        console.log(`Current Weather Conditions: ${weather}`);
        document.getElementById("weather-condition").innerHTML = `${weather}`;

    };


    // Display current weather alerts in box1 number 3 - references back to getForecast
    const displayForecast = async () => {
        const currentForecast = document.getElementsByClassName("box1")[1];

        const forecast = await getForecast();
        if (!forecast) {
            currentForecast.innerHTML = "Failed to load current weather alerts.";
            return;
        }

        let weather = forecast["properties"]["periods"][1]["detailedForecast"];
        console.log(`Current Weather Conditions: ${weather}`);
        document.getElementById("weather-condition2").innerHTML = `${weather}`;

    };


// Display current weather alerts in box1 number 2 - references back to getWeatherAlerts
    const displayWeatherAlerts = async () => {
        const currentweatherAlerts = document.getElementsByClassName("box1")[2];

        const weatherAlerts = await getWeatherAlerts();
        if (!weatherAlerts) {
            currentweatherAlerts.innerHTML = "Failed to load current weather alerts.";
            return;
        }
        if (weatherAlerts["features"].length === 0){
            document.getElementById("weather-condition3").innerHTML = '<font color="#0a5562">No weather alerts at this time.</font>';
            return "No alerts at this time."
        }
        let alerts = weatherAlerts["features"][0]["properties"]["headline"];
        let alertExpire = weatherAlerts["features"][0]["properties"]["parameters"]["NWSheadline"];
        // let alertInstructions = weatherAlerts["features"][0]["properties"]["instruction"];
        

        document.getElementById("weather-condition3").innerHTML = `${alerts}`
        // document.getElementById("weather-instructions3").innerHTML = `${alertInstructions}`
        document.getElementById("alert-expiration").innerHTML = `${alertExpire}`
        

    };


    displayWeather();
    displayForecast();
    displayWeatherAlerts();
        

    const ctx = document.getElementById('weather-chart');


    // gets daily temperatures for a week using getForecast will display the temperatures on the line graph
    const getDailyTemperatures = async () => {
        const currentTemp = await getForecast();
        let dayTemperatures = [];

        for (let i = 0; i < currentTemp["properties"]["periods"].length; i++){
            if (currentTemp["properties"]["periods"][i]["isDaytime"] === true){
                dayTemperatures.push(currentTemp["properties"]["periods"][i]["temperature"]);
                console.log(currentTemp["properties"]["periods"][i]["temperature"]);
        };
        };

        console.log(dayTemperatures);
        return dayTemperatures;
    };


    // gets nightly temperatures for a week using getForecast will display the temperatures on the line graph
    const getNightlyTemperatures = async () => {
        const currentTemp = await getForecast();
        let nightTemperatures = [];

        for (let i = 0; i < currentTemp["properties"]["periods"].length; i++){
            if (currentTemp["properties"]["periods"][i]["isDaytime"] === false){
                nightTemperatures.push(currentTemp["properties"]["periods"][i]["temperature"]);
                console.log(currentTemp["properties"]["periods"][i]["temperature"]);
        };
        };

        console.log(nightTemperatures);
        return nightTemperatures;
    };


    Chart.defaults.color = '#FFF';
    Chart.defaults.borderColor = '#8e8d8d';
    new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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


