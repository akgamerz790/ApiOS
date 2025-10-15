const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="pokemonInput" placeholder="Enter Pokémon name or ID (e.g., pikachu, 25)">
    <button onclick="searchPokemon()">Search Pokémon</button>
`;

document.getElementById('mainFetchBtn').textContent = 'Random Pokémon';
document.getElementById('mainFetchBtn').onclick = getRandomPokemon;

async function searchPokemon() {
    const query = document.getElementById('pokemonInput').value.trim().toLowerCase();
    if (!query) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a Pokémon name or ID</p></div>';
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Pokémon not found. Try another name or ID.</p></div>';
    } finally {
        hideLoading();
    }
}

async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    showLoading();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch Pokémon</p></div>';
    } finally {
        hideLoading();
    }
}

function displayPokemon(data) {
    const types = data.types.map(t => `<span style="background: var(--primary-color); padding: 5px 12px; border-radius: 15px; margin: 0 5px;">${t.type.name}</span>`).join('');
    const abilities = data.abilities.map(a => a.ability.name).join(', ');
    const stats = data.stats.map(s => `
        <div style="margin: 10px 0;">
            <strong>${s.stat.name}:</strong> ${s.base_stat}
            <div style="background: var(--dark-bg); height: 8px; border-radius: 4px; margin-top: 5px;">
                <div style="background: var(--primary-color); height: 100%; width: ${(s.base_stat / 255) * 100}%; border-radius: 4px;"></div>
            </div>
        </div>
    `).join('');

    resultBox.innerHTML = `
        <div class="data-card">
            <div style="text-align: center;">
                <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}" style="width: 200px; height: 200px; margin-bottom: 20px;">
            </div>
            <h3 style="text-align: center; text-transform: capitalize;">#${data.id} - ${data.name}</h3>
            <div style="text-align: center; margin: 15px 0;">${types}</div>
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
            <p><strong>Abilities:</strong> ${abilities}</p>
            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
            <h4 style="color: var(--primary-color); margin: 20px 0 10px;">Base Stats</h4>
            ${stats}
        </div>
    `;
}

document.getElementById('pokemonInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon();
});