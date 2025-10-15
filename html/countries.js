const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

function displayError(message) {
    resultBox.innerHTML = `<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error); font-weight: 600;">⚠️ Error: ${message}</p></div>`;
}

// Add search input
inputContainer.innerHTML = `
    <input type="text" id="countryInput" placeholder="Search for a country (e.g., India, Japan)">
    <button onclick="searchCountry()">Search Country</button>
`;

mainBtn.textContent = 'Get All Countries';
mainBtn.onclick = fetchAllCountries;

async function fetchAllCountries() {
    showLoading();
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const topCountries = data.sort((a, b) => b.population - a.population).slice(0, 20);
        displayCountries(topCountries);
    } catch (error) {
        displayError('Failed to fetch countries data');
    } finally {
        hideLoading();
    }
}

async function searchCountry() {
    const country = document.getElementById('countryInput').value.trim();
    if (!country) {
        displayError('Please enter a country name');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        displayCountries(data);
    } catch (error) {
        displayError('Country not found. Please check the spelling and try again.');
    } finally {
        hideLoading();
    }
}

function displayCountries(countries) {
    const html = countries.map(country => `
        <div class="data-card">
            <h3>${country.flag} ${country.name.common}</h3>
            <p><strong>Official Name:</strong> ${country.name.official}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region} ${country.subregion ? '(' + country.subregion + ')' : ''}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ') : 'N/A'}</p>
            <p><strong>Timezone:</strong> ${country.timezones.join(', ')}</p>
        </div>
    `).join('');
    resultBox.innerHTML = html;
}

document.getElementById('countryInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCountry();
});