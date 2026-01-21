// src/App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Company name */}
      <h1>Welcome to Paradise Nursery</h1>

      {/* Get Started button */}
      <button
        className="get-started-btn"
        onClick={() => navigate("/products")}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;
