const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

mainBtn.textContent = 'Get Random Dog Image';
mainBtn.onclick = fetchDogImage;

async function fetchDogImage() {
    showLoading();
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (data.status === 'success') {
            resultBox.innerHTML = `
                <div class="data-card" style="text-align: center;">
                    <h3>🐕 Random Dog</h3>
                    <img src="${data.message}" alt="Random Dog" style="width: 100%; max-width: 600px; margin: 20px auto; display: block; border-radius: 12px; border: 3px solid var(--primary-color);">
                    <p style="color: var(--text-secondary); margin-top: 15px;">Click the button to see another adorable dog!</p>
                </div>
            `;
        }
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch dog image</p></div>';
    } finally {
        hideLoading();
    }
}