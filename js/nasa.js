const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

document.getElementById('mainFetchBtn').textContent = 'Get Astronomy Picture of the Day';
document.getElementById('mainFetchBtn').onclick = fetchNASA;

async function fetchNASA() {
    showLoading();
    try {
        // Using NASA's demo API key - for production, get your own from api.nasa.gov
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await response.json();

        resultBox.innerHTML = `
            <div class="data-card">
                <h3>${data.title}</h3>
                <p><strong>Date:</strong> ${data.date}</p>
                ${data.copyright ? `<p><strong>Copyright:</strong> ${data.copyright}</p>` : ''}

                ${data.media_type === 'image' 
                    ? `<img src="${data.url}" alt="${data.title}" style="width: 100%; border-radius: 12px; margin: 20px 0; border: 2px solid var(--primary-color);">`
                    : `<iframe src="${data.url}" style="width: 100%; height: 400px; border-radius: 12px; margin: 20px 0; border: 2px solid var(--primary-color);"></iframe>`
                }

                <h4 style="color: var(--primary-color); margin: 20px 0 10px;">Explanation</h4>
                <p style="line-height: 1.8;">${data.explanation}</p>

                ${data.hdurl ? `<p style="margin-top: 20px; text-align: center;"><a href="${data.hdurl}" target="_blank" style="color: var(--primary-color); font-weight: 600; font-size: 1.1rem;">🔗 View HD Image</a></p>` : ''}
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch NASA data. The demo API key has limited requests.</p></div>';
    } finally {
        hideLoading();
    }
}