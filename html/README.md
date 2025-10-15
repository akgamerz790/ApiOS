# API Hub - Free Public APIs Website

A comprehensive, highly responsive website showcasing 15+ free public APIs with individual pages for each API.

## 📁 Project Structure

```
Root/
├── index.html              # Main homepage
├── html/                   # Individual API pages
│   ├── weather.html
│   ├── countries.html
│   ├── quotes.html
│   ├── github.html
│   ├── names.html
│   ├── facts.html
│   ├── dogs.html
│   ├── users.html
│   ├── jokes.html
│   ├── pokemon.html
│   ├── movies.html
│   ├── recipes.html
│   ├── books.html
│   ├── crypto.html
│   └── nasa.html
├── css/                    # Styling files
│   ├── main.css           # Global styles
│   ├── weather.css
│   ├── countries.css
│   ├── quotes.css
│   ├── github.css
│   ├── names.css
│   ├── facts.css
│   ├── dogs.css
│   ├── users.css
│   ├── jokes.css
│   ├── pokemon.css
│   ├── movies.css
│   ├── recipes.css
│   ├── books.css
│   ├── crypto.css
│   └── nasa.css
└── js/                     # JavaScript files
    ├── main.js            # Global scripts
    ├── weather.js
    ├── countries.js
    ├── quotes.js
    ├── github.js
    ├── names.js
    ├── facts.js
    ├── dogs.js
    ├── users.js
    ├── jokes.js
    ├── pokemon.js
    ├── movies.js
    ├── recipes.js
    ├── books.js
    ├── crypto.js
    └── nasa.js
```

## 🌟 Features

### 15 Free Public APIs Integrated

1. **Weather API** - Real-time weather data for any city
   - Endpoint: `https://wttr.in/`
   - No authentication required

2. **Countries API** - Comprehensive country information
   - Endpoint: `https://restcountries.com/v3.1/`
   - Data: 250+ countries

3. **Quotes API** - Inspirational quotes
   - Endpoint: `https://api.quotable.io/random`
   - Thousands of quotes

4. **GitHub API** - Public user profiles
   - Endpoint: `https://api.github.com/users/`
   - 100M+ users

5. **Name Analysis API** - Age and gender prediction
   - Endpoints: `https://api.agify.io/` & `https://api.genderize.io/`
   - AI-powered predictions

6. **Cat Facts API** - Random cat facts
   - Endpoint: `https://catfact.ninja/fact`
   - Educational content

7. **Dog Images API** - Random dog pictures
   - Endpoint: `https://dog.ceo/api/breeds/image/random`
   - All breeds covered

8. **Dummy Users API** - Mock user data for testing
   - Endpoint: `https://dummyjson.com/users`
   - Perfect for development

9. **Jokes API** - Random jokes
   - Endpoint: `https://official-joke-api.appspot.com/random_joke`
   - Multiple categories

10. **Pokémon API** - Complete Pokémon database
    - Endpoint: `https://pokeapi.co/api/v2/pokemon/`
    - 1000+ Pokémon with stats

11. **Movies API** - Movie and TV show information
    - Endpoint: `https://www.omdbapi.com/`
    - Millions of titles

12. **Recipes API** - Meal recipes worldwide
    - Endpoint: `https://www.themealdb.com/api/json/v1/1/`
    - 1000+ recipes

13. **Books API** - Open Library database
    - Endpoint: `https://openlibrary.org/search.json`
    - 20M+ books

14. **Cryptocurrency API** - Live crypto prices
    - Endpoint: `https://api.coingecko.com/api/v3/`
    - 10,000+ coins

15. **NASA API** - Astronomy Picture of the Day
    - Endpoint: `https://api.nasa.gov/planetary/apod`
    - Daily space content

## 🎨 Design Features

- **Modern Dark Theme** with gradient accents
- **Fully Responsive** - Works on mobile, tablet, and desktop
- **Smooth Animations** and transitions
- **Card-based Layout** for better content organization
- **Loading Overlays** during API calls
- **Error Handling** with user-friendly messages
- **Custom Scrollbars** matching the theme
- **Accessibility** features throughout

## 🚀 How to Use

1. Open `index.html` in any modern web browser
2. Browse available APIs from the homepage
3. Click on any API card to explore that specific API
4. Use the navigation bar to switch between different APIs
5. Each API page has its own search/fetch functionality

## 💻 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks required
- **Fetch API** - For all HTTP requests
- **ES6+** - Modern JavaScript features

## 🎯 Key Highlights

- ✅ **No Dependencies** - Pure vanilla JavaScript
- ✅ **No Authentication Required** - Most APIs work instantly
- ✅ **100% Free** - All APIs are free to use
- ✅ **Modular Structure** - Each API has separate files
- ✅ **Easy to Extend** - Add more APIs easily
- ✅ **Mobile-First Design** - Optimized for all devices
- ✅ **Clean Code** - Well-organized and commented

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔧 Customization

### Adding a New API

1. Create HTML file in `html/` folder
2. Create corresponding CSS file in `css/` folder
3. Create JavaScript file in `js/` folder
4. Add API card to `index.html`
5. Update navigation menu

### Modifying Styles

- Edit `css/main.css` for global styles
- Edit individual CSS files for API-specific styles
- Use CSS custom properties (variables) for theming

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 Notes

- Some APIs have rate limits (especially with demo keys)
- For production use, consider getting your own API keys
- NASA API uses DEMO_KEY (limited requests)
- OMDb API uses a demo key (may have restrictions)

## 🎓 Perfect For

- Learning API integration
- Frontend development practice
- Portfolio projects
- Educational purposes
- Quick prototyping
- API testing and exploration

## 📄 License

This project is open source and available for educational purposes.

## 🙏 API Credits

All data provided by their respective API sources:
- wttr.in
- REST Countries
- Quotable
- GitHub
- Agify & Genderize
- Cat Facts Ninja
- Dog CEO
- DummyJSON
- Official Joke API
- PokéAPI
- OMDb
- TheMealDB
- Open Library
- CoinGecko
- NASA

## 👨‍💻 Developer

Built with ❤️ for the developer community

---

**Note**: This is a demonstration project showcasing free public APIs. For production use, please review each API's terms of service and consider getting proper API keys where required.
