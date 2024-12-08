import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product({ onAddToCart, currentUser }) {
  const navigate = useNavigate();

  const products = [
    { id: '1', name: 'Product 1', price: 20 },
    { id: '2', name: 'Product 2', price: 30 },
    { id: '3', name: 'Product 3', price: 40 },
  ];

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0; // Default quantity for each product is 0
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value >= 0 ? value : 0, // Ensure quantity is not negative
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];

    if (!currentUser) {
      alert('Please log in to add items to the cart.');
      return;
    }

    if (quantity <= 0) {
      alert('Select at least one.');
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      totalPrice: product.price * quantity, // Calculating totalPrice
    };

    // Pass the new cart item to the parent component
    onAddToCart(cartItem);

    alert(`${product.name} added to cart!`);

    // Reset quantity to 0 after adding to cart
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 0,
    }));
  };

  const handleRedirectToCart = () => {
    navigate('/cart'); // Redirect to the Cart page
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <input
            type="number"
            value={quantities[product.id]}
            min="0"
            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
          />
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleRedirectToCart}>Go to Cart Page</button>
      </div>
    </div>
  );
}

export default Product;
