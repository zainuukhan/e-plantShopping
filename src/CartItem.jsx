import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return (costNumber * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div key={item.name} style={{ display: 'flex', gap: '20px', margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit Cost: {item.cost}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <button onClick={() => handleRemove(item)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px' }}>Continue Shopping</button>
        <button onClick={handleCheckoutShopping} style={{ padding: '10px 20px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
