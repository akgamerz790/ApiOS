const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="githubInput" placeholder="Enter GitHub username (e.g., torvalds, gaearon)">
    <button onclick="searchGithubUser()">Search User</button>
`;

document.getElementById('mainFetchBtn').style.display = 'none';

async function searchGithubUser() {
    const username = document.getElementById('githubInput').value.trim();
    if (!username) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a username</p></div>';
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error('User not found');

        const data = await response.json();
        resultBox.innerHTML = `
            <div class="data-card">
                <div style="text-align: center;">
                    <img src="${data.avatar_url}" alt="${data.login}" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px; border: 3px solid var(--primary-color);">
                </div>
                <h3 style="text-align: center;">${data.name || data.login}</h3>
                <p><strong>Username:</strong> @${data.login}</p>
                <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
                <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
                <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
                <p><strong>Email:</strong> ${data.email || 'Not public'}</p>
                <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
                <p><strong>Account Created:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
                ${data.blog ? `<p><strong>Website:</strong> <a href="${data.blog}" target="_blank" style="color: var(--primary-color);">${data.blog}</a></p>` : ''}
                <p style="text-align: center; margin-top: 20px;"><a href="${data.html_url}" target="_blank" style="color: var(--primary-color); font-weight: 600; font-size: 1.1rem;">View GitHub Profile →</a></p>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ User not found</p></div>';
    } finally {
        hideLoading();
    }
}

document.getElementById('githubInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchGithubUser();
});