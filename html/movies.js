const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="movieInput" placeholder="Search for a movie (e.g., Inception, Avatar)">
    <button onclick="searchMovie()">Search Movie</button>
`;

document.getElementById('mainFetchBtn').style.display = 'none';

async function searchMovie() {
    const query = document.getElementById('movieInput').value.trim();
    if (!query) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a movie name</p></div>';
        return;
    }

    showLoading();
    try {
        // Using a free alternative API
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=trilogy`);
        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        resultBox.innerHTML = `
            <div class="data-card">
                <div style="display: flex; gap: 25px; flex-wrap: wrap;">
                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${data.Title}" style="width: 250px; border-radius: 12px; border: 2px solid var(--primary-color);">
                    <div style="flex: 1; min-width: 300px;">
                        <h3>${data.Title} (${data.Year})</h3>
                        <p><strong>Rating:</strong> ${data.Rated}</p>
                        <p><strong>Released:</strong> ${data.Released}</p>
                        <p><strong>Runtime:</strong> ${data.Runtime}</p>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Director:</strong> ${data.Director}</p>
                        <p><strong>Cast:</strong> ${data.Actors}</p>
                        <p><strong>Language:</strong> ${data.Language}</p>
                        <p><strong>Country:</strong> ${data.Country}</p>
                        <p><strong>IMDb Rating:</strong> ⭐ ${data.imdbRating}/10</p>
                        <p><strong>Awards:</strong> ${data.Awards}</p>
                        <p><strong>Box Office:</strong> ${data.BoxOffice || 'N/A'}</p>
                        <p style="margin-top: 15px;"><strong>Plot:</strong><br>${data.Plot}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Movie not found. Try another title.</p></div>';
    } finally {
        hideLoading();
    }
}

document.getElementById('movieInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovie();
});