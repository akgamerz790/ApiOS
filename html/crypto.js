const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

document.getElementById('mainFetchBtn').textContent = 'Get Top Cryptocurrencies';
document.getElementById('mainFetchBtn').onclick = fetchCrypto;

async function fetchCrypto() {
    showLoading();
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1');
        const data = await response.json();

        const html = data.map(coin => `
            <div class="data-card">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <img src="${coin.image}" alt="${coin.name}" style="width: 50px; height: 50px; border-radius: 50%;">
                    <div>
                        <h3 style="margin: 0;">${coin.name}</h3>
                        <p style="color: var(--text-secondary); margin: 0;">${coin.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <p><strong>Rank:</strong> #${coin.market_cap_rank}</p>
                <p><strong>Current Price:</strong> $${coin.current_price.toLocaleString()}</p>
                <p><strong>Market Cap:</strong> $${coin.market_cap.toLocaleString()}</p>
                <p><strong>24h Volume:</strong> $${coin.total_volume.toLocaleString()}</p>
                <p><strong>24h Change:</strong> <span style="color: ${coin.price_change_percentage_24h >= 0 ? 'var(--success)' : 'var(--error)'}">${coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span></p>
                <p><strong>All-Time High:</strong> $${coin.ath.toLocaleString()}</p>
                <p><strong>Circulating Supply:</strong> ${coin.circulating_supply ? coin.circulating_supply.toLocaleString() : 'N/A'}</p>
            </div>
        `).join('');

        resultBox.innerHTML = html;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch cryptocurrency data</p></div>';
    } finally {
        hideLoading();
    }
}