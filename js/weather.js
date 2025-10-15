const loadingOverlay = document.getElementById('loadingOverlay');

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function displayError(message) {
    const resultBox = document.getElementById('weatherResult');
    resultBox.innerHTML = `
        <div class="weather-card" style="border-color: var(--error);">
            <p style="color: var(--error); font-weight: 600;">⚠️ Error: ${message}</p>
        </div>
    `;
}

async function fetchWeather() {
    showLoading();
    try {
        const response = await fetch('https://wttr.in/?format=j1');
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        displayError('Failed to fetch weather data. Please try again.');
    } finally {
        hideLoading();
    }
}

async function fetchWeatherByCity() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        displayError('Please enter a city name');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        displayError('City not found or unable to fetch weather data. Please check the city name and try again.');
    } finally {
        hideLoading();
    }
}

function displayWeatherData(data) {
    const current = data.current_condition[0];
    const location = data.nearest_area[0];

    const resultBox = document.getElementById('weatherResult');
    resultBox.innerHTML = `
        <div class="weather-card">
            <h3>📍 ${location.areaName[0].value}, ${location.country[0].value}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                ${location.region[0].value} | Latitude: ${location.latitude}, Longitude: ${location.longitude}
            </p>

            <div class="weather-grid">
                <div class="weather-item">
                    <strong>🌡️ Temperature</strong>
                    <p>${current.temp_C}°C / ${current.temp_F}°F</p>
                </div>
                <div class="weather-item">
                    <strong>🤔 Feels Like</strong>
                    <p>${current.FeelsLikeC}°C / ${current.FeelsLikeF}°F</p>
                </div>
                <div class="weather-item">
                    <strong>☁️ Condition</strong>
                    <p>${current.weatherDesc[0].value}</p>
                </div>
                <div class="weather-item">
                    <strong>💧 Humidity</strong>
                    <p>${current.humidity}%</p>
                </div>
                <div class="weather-item">
                    <strong>💨 Wind Speed</strong>
                    <p>${current.windspeedKmph} km/h</p>
                </div>
                <div class="weather-item">
                    <strong>🧭 Wind Direction</strong>
                    <p>${current.winddir16Point} (${current.winddirDegree}°)</p>
                </div>
                <div class="weather-item">
                    <strong>👁️ Visibility</strong>
                    <p>${current.visibility} km</p>
                </div>
                <div class="weather-item">
                    <strong>📊 Pressure</strong>
                    <p>${current.pressure} mb</p>
                </div>
                <div class="weather-item">
                    <strong>🌤️ UV Index</strong>
                    <p>${current.uvIndex}</p>
                </div>
                <div class="weather-item">
                    <strong>🌧️ Precipitation</strong>
                    <p>${current.precipMM} mm</p>
                </div>
                <div class="weather-item">
                    <strong>☁️ Cloud Cover</strong>
                    <p>${current.cloudcover}%</p>
                </div>
                <div class="weather-item">
                    <strong>🕐 Local Time</strong>
                    <p>${current.observation_time}</p>
                </div>
            </div>
        </div>
    `;
}

// Add enter key support
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeatherByCity();
    }
});

console.log('🌤️ Weather API page loaded');