import React, { useState } from 'react';

function Order({ currentUser, cartItems }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Ensure that the user is logged in before proceeding with the order
  if (!currentUser) {
    return <p>You need to be logged in to place an order.</p>; // Show this if user is not logged in
  }

  const handlePlaceOrder = () => {
    if (!shippingAddress) {
      alert('Please enter a shipping address.');
      return;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the order object
    const order = {
      userId: currentUser.id,
      products: cartItems,
      totalPrice,
      shippingAddress,
      paymentStatus: 'Pending', // Default value
      orderStatus: 'Pending', // Default value
    };

    // Log the order (You can replace this with your order submission logic)
    console.log('Order placed:', order);

    setOrderPlaced(true);
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      {orderPlaced ? (
        <p>Your order has been placed successfully!</p>
      ) : (
        <div>
          <label>
            Shipping Address:
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </label>
          <br />
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Order;
