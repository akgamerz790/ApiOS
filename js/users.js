const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const mainBtn = document.getElementById('mainFetchBtn');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="number" id="userLimit" placeholder="Number of users (1-100)" min="1" max="100" value="10">
`;

mainBtn.textContent = 'Get Users';
mainBtn.onclick = fetchUsers;

async function fetchUsers() {
    const limit = document.getElementById('userLimit').value || 10;
    showLoading();
    try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
        const data = await response.json();

        const html = data.users.map(user => `
            <div class="data-card">
                <div style="text-align: center;">
                    <img src="${user.image}" alt="${user.firstName}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 15px; border: 2px solid var(--primary-color);">
                </div>
                <h3 style="text-align: center;">${user.firstName} ${user.lastName}</h3>
                <p><strong>Username:</strong> @${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Age:</strong> ${user.age} | <strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>Position:</strong> ${user.company.title}</p>
                <p><strong>Department:</strong> ${user.company.department}</p>
                <p><strong>Address:</strong> ${user.address.address}, ${user.address.city}, ${user.address.state}</p>
                <p><strong>University:</strong> ${user.university}</p>
            </div>
        `).join('');

        resultBox.innerHTML = html;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch users</p></div>';
    } finally {
        hideLoading();
    }
}