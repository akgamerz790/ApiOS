const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="nameInput" placeholder="Enter a name (e.g., John, Maria, Wei)">
    <button onclick="analyzeName()">Analyze Name</button>
`;

document.getElementById('mainFetchBtn').style.display = 'none';

async function analyzeName() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a name</p></div>';
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

        resultBox.innerHTML = `
            <div class="data-card">
                <h3>Analysis for: ${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                <div style="margin-top: 20px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 10px;">👤 Age Prediction</h4>
                    <p><strong>Predicted Age:</strong> ${ageData.age || 'Unknown'} years</p>
                    <p><strong>Confidence:</strong> ${ageData.count ? `Based on ${ageData.count.toLocaleString()} data points` : 'Low confidence'}</p>

                    <h4 style="color: var(--primary-color); margin: 20px 0 10px;">⚤ Gender Prediction</h4>
                    <p><strong>Predicted Gender:</strong> ${genderData.gender ? genderData.gender.charAt(0).toUpperCase() + genderData.gender.slice(1) : 'Unknown'}</p>
                    <p><strong>Probability:</strong> ${genderData.probability ? (genderData.probability * 100).toFixed(1) + '%' : 'N/A'}</p>
                    <p><strong>Confidence:</strong> ${genderData.count ? `Based on ${genderData.count.toLocaleString()} data points` : 'Low confidence'}</p>
                </div>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to analyze name</p></div>';
    } finally {
        hideLoading();
    }
}

document.getElementById('nameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzeName();
});