const loadingOverlay = document.getElementById('loadingOverlay');
const resultBox = document.getElementById('result');
const inputContainer = document.getElementById('inputContainer');

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

inputContainer.innerHTML = `
    <input type="text" id="recipeInput" placeholder="Search for a recipe (e.g., pasta, chicken, cake)">
    <button onclick="searchRecipe()">Search Recipe</button>
`;

document.getElementById('mainFetchBtn').textContent = 'Random Recipe';
document.getElementById('mainFetchBtn').onclick = getRandomRecipe;

async function searchRecipe() {
    const query = document.getElementById('recipeInput').value.trim();
    if (!query) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Please enter a recipe name</p></div>';
        return;
    }

    showLoading();
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data.meals) {
            throw new Error('No recipes found');
        }

        displayRecipes(data.meals.slice(0, 5));
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ No recipes found. Try another search.</p></div>';
    } finally {
        hideLoading();
    }
}

async function getRandomRecipe() {
    showLoading();
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        resultBox.innerHTML = '<div class="data-card" style="border-color: var(--error);"><p style="color: var(--error);">⚠️ Failed to fetch recipe</p></div>';
    } finally {
        hideLoading();
    }
}

function displayRecipes(meals) {
    const html = meals.map(meal => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            }
        }

        return `
            <div class="data-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">
                <h3>${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Tags:</strong> ${meal.strTags || 'None'}</p>
                <h4 style="color: var(--primary-color); margin: 20px 0 10px;">Ingredients</h4>
                <ul style="color: var(--text-secondary); line-height: 1.8;">
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                <h4 style="color: var(--primary-color); margin: 20px 0 10px;">Instructions</h4>
                <p style="line-height: 1.8;">${meal.strInstructions}</p>
                ${meal.strYoutube ? `<p style="margin-top: 15px;"><a href="${meal.strYoutube}" target="_blank" style="color: var(--primary-color); font-weight: 600;">▶️ Watch Video Tutorial</a></p>` : ''}
            </div>
        `;
    }).join('');
    resultBox.innerHTML = html;
}

document.getElementById('recipeInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchRecipe();
});