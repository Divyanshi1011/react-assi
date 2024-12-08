import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './lists/Register';
import Login from './lists/Login';
import Product from './lists/Product';
import Cart from './lists/Cart';
import Order from './lists/Order';

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]); // Track registered users
  const [cartItems, setCartItems] = useState([]); // Track items in the cart
  const [currentUser, setCurrentUser] = useState(null); // Track the logged-in user

  // Register a new user
  const handleRegister = (user) => {
    const existingUser = registeredUsers.find((u) => u.email === user.email);
    if (existingUser) {
      alert('User already exists.');
      return;
    }
    setRegisteredUsers([...registeredUsers, user]);
    alert('Registration successful!');
  };

  // Log in a user
  const handleLogin = (credentials) => {
    const user = registeredUsers.find(
      (user) => user.email === credentials.email && user.password === credentials.password
    );

    if (user) {
      setCurrentUser(user);
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  // Add an item to the cart
  const handleAddToCart = (cartItem) => {
    setCartItems((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find(item => item.productId === cartItem.productId);
      if (existingItem) {
        // If it exists, update the quantity and total price
        return prevCart.map(item => 
          item.productId === cartItem.productId
            ? { ...item, quantity: item.quantity + cartItem.quantity, totalPrice: item.price * (item.quantity + cartItem.quantity) }
            : item
        );
      } else {
        // If it doesn't exist, add it as a new item
        return [...prevCart, cartItem];
      }
    });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My E-commerce Store</h1>
          <nav>
            <Link to="/register">Register</Link> | 
            <Link to="/login">Login</Link> | 
            <Link to="/cart">Cart</Link> | 
            <Link to="/order">Order</Link> | 
            <Link to="/product">Product</Link>
          </nav>
        </header>

        <Routes>
          {/* Register route */}
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          
          {/* Login route */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          {/* Cart route */}
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} />}
          />

          {/* Order route, passing currentUser and cartItems */}
          <Route
            path="/order"
            element={<Order currentUser={currentUser} cartItems={cartItems} />}
          />

          {/* Product route, passing currentUser and handleAddToCart */}
          <Route
            path="/product"
            element={
              <Product 
                onAddToCart={handleAddToCart} 
                currentUser={currentUser} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
