const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="bookInput" placeholder="Search for books (e.g., Harry Potter, 1984)">
    <button onclick="searchBooks()">Search Books</button>
`;

document.getElementById('mainFetchBtn').style.display = 'none';

async function searchBooks() {
    const query = document.getElementById('bookInput').value.trim();
    if (!query) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a search term</p></div>';
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
        const data = await response.json();

        if (!data.docs || data.docs.length === 0) {
            throw new Error('No books found');
        }

        const html = data.docs.map(book => `
            <div class="data-card">
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    ${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}" style="width: 120px; border-radius: 8px; border: 2px solid var(--primary-color);">` : ''}
                    <div style="flex: 1; min-width: 250px;">
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                        <p><strong>First Published:</strong> ${book.first_publish_year || 'Unknown'}</p>
                        <p><strong>Publisher:</strong> ${book.publisher ? book.publisher[0] : 'Unknown'}</p>
                        <p><strong>ISBN:</strong> ${book.isbn ? book.isbn[0] : 'N/A'}</p>
                        <p><strong>Pages:</strong> ${book.number_of_pages_median || 'Unknown'}</p>
                        <p><strong>Language:</strong> ${book.language ? book.language.join(', ').toUpperCase() : 'Unknown'}</p>
                        ${book.subject ? `<p><strong>Subjects:</strong> ${book.subject.slice(0, 5).join(', ')}</p>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        resultBox.innerHTML = html;
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ No books found. Try another search.</p></div>';
    } finally {
        hideLoading();
    }
}

document.getElementById('bookInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBooks();
});