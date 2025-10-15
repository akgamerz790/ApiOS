const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

mainBtn.textContent = 'Get Random Cat Fact';
mainBtn.onclick = fetchCatFact;

async function fetchCatFact() {
    showLoading();
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();

        resultBox.innerHTML = `
            <div class="data-card" style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🐱</div>
                <h3>Random Cat Fact</h3>
                <p style="font-size: 1.3rem; line-height: 1.8; margin: 25px 0; color: var(--text-primary);">${data.fact}</p>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">Fact Length: ${data.length} characters</p>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch cat fact</p></div>';
    } finally {
        hideLoading();
    }
}