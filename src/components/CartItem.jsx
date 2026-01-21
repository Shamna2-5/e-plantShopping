// src/components/CartItem.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CartItem.css";

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cart amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrement = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>Unit Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div className="cart-controls">
                  <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          <h3>Total Cart Amount: ${totalAmount}</h3>
          <div className="cart-actions">
            <button onClick={handleCheckout}>Checkout</button>
            <button onClick={() => navigate("/products")}>Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
