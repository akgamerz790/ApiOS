// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const loadingOverlay = document.getElementById('loadingOverlay');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Show/hide loading overlay
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Error handling
function displayError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="card" style="border-color: var(--error);"><p style="color: var(--error); font-weight: 600;">⚠️ Error: ${message}</p></div>`;
}

// Weather API
async function fetchWeather() {
    showLoading();
    try {
        const response = await fetch('https://wttr.in/?format=j1');
        const data = await response.json();

        const current = data.current_condition[0];
        const location = data.nearest_area[0];

        document.getElementById('weatherResult').innerHTML = `
            <div class="card">
                <h3>📍 ${location.areaName[0].value}, ${location.country[0].value}</h3>
                <p><strong>Temperature:</strong> ${current.temp_C}°C / ${current.temp_F}°F</p>
                <p><strong>Feels Like:</strong> ${current.FeelsLikeC}°C / ${current.FeelsLikeF}°F</p>
                <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
                <p><strong>Humidity:</strong> ${current.humidity}%</p>
                <p><strong>Wind:</strong> ${current.windspeedKmph} km/h ${current.winddir16Point}</p>
                <p><strong>Visibility:</strong> ${current.visibility} km</p>
                <p><strong>Pressure:</strong> ${current.pressure} mb</p>
                <p><strong>UV Index:</strong> ${current.uvIndex}</p>
            </div>
        `;
    } catch (error) {
        displayError('weatherResult', 'Failed to fetch weather data');
    } finally {
        hideLoading();
    }
}

async function fetchWeatherByCity() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        displayError('weatherResult', 'Please enter a city name');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        const data = await response.json();

        const current = data.current_condition[0];
        const location = data.nearest_area[0];

        document.getElementById('weatherResult').innerHTML = `
            <div class="card">
                <h3>📍 ${location.areaName[0].value}, ${location.country[0].value}</h3>
                <p><strong>Temperature:</strong> ${current.temp_C}°C / ${current.temp_F}°F</p>
                <p><strong>Feels Like:</strong> ${current.FeelsLikeC}°C / ${current.FeelsLikeF}°F</p>
                <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
                <p><strong>Humidity:</strong> ${current.humidity}%</p>
                <p><strong>Wind:</strong> ${current.windspeedKmph} km/h ${current.winddir16Point}</p>
                <p><strong>Visibility:</strong> ${current.visibility} km</p>
                <p><strong>Pressure:</strong> ${current.pressure} mb</p>
                <p><strong>UV Index:</strong> ${current.uvIndex}</p>
            </div>
        `;
    } catch (error) {
        displayError('weatherResult', 'Failed to fetch weather data for this city');
    } finally {
        hideLoading();
    }
}

// Countries API
async function fetchCountries() {
    showLoading();
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Sort by population and get top 20
        const topCountries = data.sort((a, b) => b.population - a.population).slice(0, 20);

        const html = topCountries.map(country => `
            <div class="card">
                <h3>${country.flag} ${country.name.common}</h3>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
            </div>
        `).join('');

        document.getElementById('countriesResult').innerHTML = html;
    } catch (error) {
        displayError('countriesResult', 'Failed to fetch countries data');
    } finally {
        hideLoading();
    }
}

async function fetchCountryByName() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (!countryName) {
        displayError('countriesResult', 'Please enter a country name');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
        const data = await response.json();

        const html = data.map(country => `
            <div class="card">
                <h3>${country.flag} ${country.name.common}</h3>
                <p><strong>Official Name:</strong> ${country.name.official}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> ${country.region} (${country.subregion})</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
                <p><strong>Timezone:</strong> ${country.timezones.join(', ')}</p>
                <p><strong>Calling Code:</strong> ${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}</p>
            </div>
        `).join('');

        document.getElementById('countriesResult').innerHTML = html;
    } catch (error) {
        displayError('countriesResult', 'Country not found');
    } finally {
        hideLoading();
    }
}

// Quotes API
async function fetchQuote() {
    showLoading();
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes');
        const data = await response.json();

        document.getElementById('quotesResult').innerHTML = `
            <p>"${data.content}"</p>
            <p class="author">— ${data.author}</p>
            <p style="color: var(--text-secondary); margin-top: 20px; font-size: 0.9rem;">Tags: ${data.tags.join(', ')}</p>
        `;
    } catch (error) {
        displayError('quotesResult', 'Failed to fetch quote');
    } finally {
        hideLoading();
    }
}

// GitHub API
async function fetchGithubUser() {
    const username = document.getElementById('githubInput').value.trim();
    if (!username) {
        displayError('githubResult', 'Please enter a GitHub username');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();

        document.getElementById('githubResult').innerHTML = `
            <div class="card">
                <img src="${data.avatar_url}" alt="${data.login}" style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; display: block;">
                <h3>${data.name || data.login}</h3>
                <p><strong>Username:</strong> @${data.login}</p>
                <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
                <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
                <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Created:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
                ${data.blog ? `<p><strong>Website:</strong> <a href="${data.blog}" target="_blank" style="color: var(--primary-color);">${data.blog}</a></p>` : ''}
                <p><a href="${data.html_url}" target="_blank" style="color: var(--primary-color); font-weight: 600;">View Profile →</a></p>
            </div>
        `;
    } catch (error) {
        displayError('githubResult', 'GitHub user not found');
    } finally {
        hideLoading();
    }
}

// Name Analysis (Agify + Genderize)
async function analyzeName() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        displayError('namesResult', 'Please enter a name');
        return;
    }

    showLoading();
    try {
        const [ageResponse, genderResponse] = await Promise.all([
            fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`),
            fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`)
        ]);

        const ageData = await ageResponse.json();
        const genderData = await genderResponse.json();

        document.getElementById('namesResult').innerHTML = `
            <div class="card">
                <h3>Analysis for: ${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                <p><strong>Predicted Age:</strong> ${ageData.age || 'Unknown'} years</p>
                <p><strong>Age Confidence:</strong> ${ageData.count ? `Based on ${ageData.count} data points` : 'Low confidence'}</p>
                <p><strong>Predicted Gender:</strong> ${genderData.gender ? genderData.gender.charAt(0).toUpperCase() + genderData.gender.slice(1) : 'Unknown'}</p>
                <p><strong>Gender Probability:</strong> ${genderData.probability ? (genderData.probability * 100).toFixed(1) + '%' : 'N/A'}</p>
                <p><strong>Gender Confidence:</strong> ${genderData.count ? `Based on ${genderData.count} data points` : 'Low confidence'}</p>
            </div>
        `;
    } catch (error) {
        displayError('namesResult', 'Failed to analyze name');
    } finally {
        hideLoading();
    }
}

// Cat Facts API
async function fetchCatFact() {
    showLoading();
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();

        document.getElementById('factsResult').innerHTML = `
            <div class="card">
                <h3>🐱 Random Cat Fact</h3>
                <p style="font-size: 1.2rem; line-height: 1.8;">${data.fact}</p>
                <p style="color: var(--text-secondary); margin-top: 15px;">Length: ${data.length} characters</p>
            </div>
        `;
    } catch (error) {
        displayError('factsResult', 'Failed to fetch cat fact');
    } finally {
        hideLoading();
    }
}

// Dog Images API
async function fetchDogImage() {
    showLoading();
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (data.status === 'success') {
            document.getElementById('dogsResult').innerHTML = `
                <div class="card">
                    <h3>🐕 Random Dog</h3>
                    <img src="${data.message}" alt="Random Dog" style="width: 100%; max-width: 500px; margin: 20px auto; display: block; border-radius: 12px;">
                </div>
            `;
        }
    } catch (error) {
        displayError('dogsResult', 'Failed to fetch dog image');
    } finally {
        hideLoading();
    }
}

// Dummy Users API
async function fetchUsers() {
    const limit = document.getElementById('userLimit').value || 5;
    showLoading();
    try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
        const data = await response.json();

        const html = data.users.map(user => `
            <div class="card">
                <img src="${user.image}" alt="${user.firstName}" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 15px; display: block;">
                <h3>${user.firstName} ${user.lastName}</h3>
                <p><strong>Username:</strong> @${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>Position:</strong> ${user.company.title}</p>
                <p><strong>Address:</strong> ${user.address.city}, ${user.address.state}</p>
            </div>
        `).join('');

        document.getElementById('usersResult').innerHTML = html;
    } catch (error) {
        displayError('usersResult', 'Failed to fetch users');
    } finally {
        hideLoading();
    }
}

// Jokes API
async function fetchJoke() {
    showLoading();
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();

        document.getElementById('jokesResult').innerHTML = `
            <div class="card" style="text-align: center;">
                <h3>😄 Random Joke</h3>
                <p style="font-size: 1.3rem; margin: 20px 0;"><strong>${data.setup}</strong></p>
                <p style="font-size: 1.2rem; color: var(--primary-color); font-weight: 600;">${data.punchline}</p>
                <p style="color: var(--text-secondary); margin-top: 20px;">Type: ${data.type}</p>
            </div>
        `;
    } catch (error) {
        displayError('jokesResult', 'Failed to fetch joke');
    } finally {
        hideLoading();
    }
}

// Add enter key support for input fields
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeatherByCity();
});

document.getElementById('countryInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchCountryByName();
});

document.getElementById('githubInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchGithubUser();
});

document.getElementById('nameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzeName();
});

// Auto-load initial content on page load
window.addEventListener('load', () => {
    console.log('API Hub loaded successfully!');
});