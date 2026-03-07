const apiKey = "e394c35a327842209db183839260503";

// Set current date on load
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
});

function updateDate() {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    document.getElementById('currentDate').innerText = today;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('weatherCard').classList.remove('active');
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    hideLoading();
    const errorEl = document.getElementById('errorMsg');
    errorEl.innerText = message;
    errorEl.style.display = 'block';
    document.getElementById('weatherCard').classList.remove('active');
}

function getUVLevel(uv) {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
}

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    showLoading();

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            showError(data.error.message || 'City not found');
            return;
        }

        hideLoading();
        document.getElementById('errorMsg').style.display = 'none';

        // Update location
        document.getElementById("cityName").innerText = 
            `${data.location.name}, ${data.location.country}`;

        // Update main weather
        document.getElementById("temperature").innerText = 
            `${Math.round(data.current.temp_c)}°`;

        document.getElementById("description").innerText = 
            data.current.condition.text;

        // Update weather icon
        const iconEl = document.getElementById("weatherIcon");
        iconEl.src = `https:${data.current.condition.icon.replace('64x64', '128x128')}`;
        iconEl.style.display = 'block';

        // Update last updated time
        const localTime = data.location.localtime.split(' ')[1];
        document.getElementById("lastUpdated").innerText = `Updated ${localTime}`;

        // Update detail cards
        document.getElementById("humidity").innerText = 
            `${data.current.humidity}%`;

        document.getElementById("wind").innerText = 
            `${data.current.wind_kph} km/h`;

        document.getElementById("feelsLike").innerText = 
            `${Math.round(data.current.feelslike_c)}°`;

        document.getElementById("uvIndex").innerText = 
            `${data.current.uv} ${getUVLevel(data.current.uv)}`;

        document.getElementById("pressure").innerText = 
            `${data.current.pressure_mb} mb`;

        document.getElementById("visibility").innerText = 
            `${data.current.vis_km} km`;

        // Show weather card with animation
        document.getElementById('weatherCard').classList.add('active');

        // Clear input after successful search
        document.getElementById("cityInput").value = '';

    } catch (error) {
        console.log(error);
        showError('Failed to fetch weather data. Please try again.');
    }
}