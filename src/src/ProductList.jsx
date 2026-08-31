import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=300", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", cost: "$14" },
        { name: "Rubber Tree", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300", cost: "$18" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", cost: "$15" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", cost: "$10" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300", cost: "$25" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=300", cost: "$12" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300", cost: "$12" },
        { name: "Echinacea", image: "https://images.unsplash.com/photo-1588615419955-32e652a2ec96?w=300", cost: "$16" },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300", cost: "$11" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300", cost: "$14" },
        { name: "Chamomile", image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=300", cost: "$13" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300", cost: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2e7d32', color: 'white' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" onClick={() => setShowCart(false)} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
          <a href="#" onClick={() => setShowCart(true)} style={{ color: 'white', textDecoration: 'none' }}>
            Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((cat, idx) => (
            <div key={idx}>
              <h2>{cat.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                {cat.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', padding: '15px', width: '220px', borderRadius: '8px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{ padding: '8px 12px', background: addedToCart[plant.name] ? '#ccc' : '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
