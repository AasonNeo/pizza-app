import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
    return (
        <div className="app-container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

// Header component with conditional tagline
const Header = () => {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 10 && currentHour < 22;

    return (
        <header>
            {isOpen && <h2 className="tagline">Authentic Italian Cuisine</h2>}
            <h1 style={{ color: 'orange', fontSize: '48px', textTransform: 'uppercase' }}>
                Aason's Pizza Co.
            </h1>
        </header>
    );
};

// Pizza data array
const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "prosciutto.jpg",
      soldOut: false,
    },
  ];

// Pizza component with "Add to Favourites" feature
function Pizza({ name, ingredients, price, photoName, soldOut, toggleFavourite, isFavourite }) {
    return (
        <div className={`pizza-item ${soldOut ? "sold-out" : ""}`}>
            <img src={`/pizzas/${photoName}`} alt={name} />
            <h3>{name}</h3>
            <p>{ingredients}</p>
            <p className="price">${price}</p>
            {soldOut ? (
                <p className="sold-out-text">Sold Out</p>
            ) : (
                <button className="favourite-button" onClick={toggleFavourite}>
                    {isFavourite ? "❤️ Favourite" : "🤍 Add to Favourites"}
                </button>
            )}
        </div>
    );
}

// Menu component with "Search" and "Favorites Only" filter
function Menu() {
    const [favourites, setFavourites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

    // Toggle favourite status for a pizza
    const toggleFavourite = (pizzaName) => {
        setFavourites((prevFavourites) =>
            prevFavourites.includes(pizzaName)
                ? prevFavourites.filter((name) => name !== pizzaName)
                : [...prevFavourites, pizzaName]
        );
    };

    // Toggle "Show Favourites Only" filter 
    const toggleShowFavouritesOnly = () => {
        setShowFavouritesOnly((prevValue) => !prevValue);
    };

    // Filter pizzas based on search term and favorites-only setting
    const filteredPizzas = pizzaData
        .filter((pizza) => pizza.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((pizza) => !showFavouritesOnly || favourites.includes(pizza.name));

    return (
        <main>
            <div className="menu-controls">
                <input
                    type="text"
                    placeholder="Search for pizzas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <button onClick={toggleShowFavouritesOnly} className="filter-button">
                    {showFavouritesOnly ? "Show All Pizzas" : "Show Favourites Only"}
                </button>
            </div>
            <div className="menu">
                {filteredPizzas.map((pizza) => (
                    <Pizza
                        key={pizza.name}
                        name={pizza.name}
                        ingredients={pizza.ingredients}
                        price={pizza.price}
                        photoName={pizza.photoName}
                        soldOut={pizza.soldOut}
                        toggleFavourite={() => toggleFavourite(pizza.name)}
                        isFavourite={favourites.includes(pizza.name)}
                    />
                ))}
            </div>
        </main>
    );
}

// Order component displayed when the shop is open
function Order() {
    return (
        <div className="order">
            <p>We’re currently open!</p>
            <button className="order-button">Order Now</button>
        </div>
    );
}

// Footer component with conditional rendering for shop status
function Footer() {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 10 && currentHour < 22;

    return (
        <footer className="footer">
            {isOpen ? <Order /> : "Sorry, we're closed"}
        </footer>
    );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


