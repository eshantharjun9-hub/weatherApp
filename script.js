const apiKey = "e394c35a327842209db183839260503";

async function getWeather(){

    const city = document.getElementById("cityInput").value;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("cityName").innerText = data.location.name;

        document.getElementById("temperature").innerText =
        "Temperature: " + data.current.temp_c + " °C";

        document.getElementById("description").innerText =
        "Condition: " + data.current.condition.text;

        document.getElementById("humidity").innerText =
        "Humidity: " + data.current.humidity + "%";

        document.getElementById("wind").innerText =
        "Wind Speed: " + data.current.wind_kph + " kph";

    }catch(error){
        console.log(error);
        alert("Failed to fetch weather data");
    }
}