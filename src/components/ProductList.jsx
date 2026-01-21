// src/components/ProductList.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import Navbar from "./Navbar";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Track disabled state for Add to Cart buttons
  const [addedToCart, setAddedToCart] = useState({});

  // Example plant categories
  const categories = {
    Indoor: [
      { id: 1, name: "Snake Plant", price: 15, thumbnail: "/assets/snake.jpg" },
      { id: 2, name: "Peace Lily", price: 20, thumbnail: "/assets/peace.jpg" },
      { id: 3, name: "Spider Plant", price: 12, thumbnail: "/assets/spider.jpg" },
      { id: 4, name: "ZZ Plant", price: 18, thumbnail: "/assets/zz.jpg" },
      { id: 5, name: "Aloe Vera", price: 10, thumbnail: "/assets/aloe.jpg" },
      { id: 6, name: "Pothos", price: 14, thumbnail: "/assets/pothos.jpg" },
    ],
    Outdoor: [
      { id: 7, name: "Rose", price: 25, thumbnail: "/assets/rose.jpg" },
      { id: 8, name: "Hibiscus", price: 22, thumbnail: "/assets/hibiscus.jpg" },
      { id: 9, name: "Bougainvillea", price: 30, thumbnail: "/assets/bougainvillea.jpg" },
      { id: 10, name: "Jasmine", price: 18, thumbnail: "/assets/jasmine.jpg" },
      { id: 11, name: "Marigold", price: 12, thumbnail: "/assets/marigold.jpg" },
      { id: 12, name: "Sunflower", price: 20, thumbnail: "/assets/sunflower.jpg" },
    ],
    Succulents: [
      { id: 13, name: "Echeveria", price: 15, thumbnail: "/assets/echeveria.jpg" },
      { id: 14, name: "Sedum", price: 12, thumbnail: "/assets/sedum.jpg" },
      { id: 15, name: "Haworthia", price: 14, thumbnail: "/assets/haworthia.jpg" },
      { id: 16, name: "Cactus", price: 10, thumbnail: "/assets/cactus.jpg" },
      { id: 17, name: "Agave", price: 18, thumbnail: "/assets/agave.jpg" },
      { id: 18, name: "Lithops", price: 16, thumbnail: "/assets/lithops.jpg" },
    ],
  };

  // Calculate cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart({ ...addedToCart, [plant.name]: true });
  };

  return (
    <div>
      {/* Navbar with dynamic cart count */}
      <Navbar cartCount={cartCount} />

      <h2>Our Plant Collection</h2>
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="plant-grid">
            {categories[category].map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>
                <button
                  disabled={addedToCart[plant.name]}
                  onClick={() => handleAddToCart(plant)}
                >
                  {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
