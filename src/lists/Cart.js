import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems }) {
  const navigate = useNavigate();

  // Merge products with the same ID
  const mergedCart = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((product) => product.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Add quantities together
      existingItem.totalPrice = existingItem.price * existingItem.quantity; // Recalculate total price
    } else {
      acc.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      });
    }
    return acc;
  }, []);

  // Calculate the total amount
  const totalAmount = mergedCart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleAddMoreProducts = () => {
    navigate('/product'); // Navigate to the product page
  };

  const handlePlaceOrder = () => {
    navigate('/order'); // Navigate to the order page
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {mergedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {mergedCart.map((item, index) => (
            <p key={index}>
              Product: {item.name} (ID: {item.productId}) - Quantity: {item.quantity} - Amount: ₹{item.totalPrice.toFixed(2)}
            </p>
          ))}
          <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
        </div>
      )}
      <button onClick={handleAddMoreProducts}>Add More Products</button>
      <button onClick={handlePlaceOrder} style={{ marginLeft: '10px' }}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
