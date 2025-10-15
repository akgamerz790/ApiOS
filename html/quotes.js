const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

mainBtn.textContent = 'Get Random Quote';
mainBtn.onclick = fetchQuote;

async function fetchQuote() {
    showLoading();
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        resultBox.innerHTML = `
            <div class="data-card" style="text-align: center; padding: 40px;">
                <p style="font-size: 1.8rem; font-style: italic; color: var(--text-primary); margin-bottom: 25px; line-height: 1.8;">"${data.content}"</p>
                <p style="color: var(--primary-color); font-weight: 600; font-size: 1.3rem; margin-bottom: 15px;">— ${data.author}</p>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">Tags: ${data.tags.join(', ')}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 10px;">Length: ${data.length} characters</p>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch quote</p></div>';
    } finally {
        hideLoading();
    }
}