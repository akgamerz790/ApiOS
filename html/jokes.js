const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

mainBtn.textContent = 'Get Random Joke';
mainBtn.onclick = fetchJoke;

async function fetchJoke() {
    showLoading();
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();

        resultBox.innerHTML = `
            <div class="data-card" style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">😂</div>
                <h3>Random Joke</h3>
                <p style="font-size: 1.4rem; margin: 25px 0; color: var(--text-primary);"><strong>${data.setup}</strong></p>
                <p style="font-size: 1.3rem; color: var(--primary-color); font-weight: 600; margin: 20px 0;">${data.punchline}</p>
                <p style="color: var(--text-secondary); margin-top: 20px;">Category: ${data.type}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 15px;">Click the button for another joke!</p>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch joke</p></div>';
    } finally {
        hideLoading();
    }
}