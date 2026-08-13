import { useState, useEffect } from 'react';
import CartService from './CartService';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [editingName, setEditingName] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    CartService.getCart()
        .then(response => setItems(response.data))
        .catch(error => console.error("Error loading cart:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { name, quantity: parseInt(quantity), price: parseFloat(price) };

    if (editingName) {
      CartService.updateItem(editingName, itemData).then(() => {
        resetForm();
        loadCart();
      });
    } else {
      CartService.addItem(itemData).then(() => {
        resetForm();
        loadCart();
      });
    }
  };

  const handleEditClick = (item) => {
    setEditingName(item.name);
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
  };

  const handleRemove = (itemName) => {
    CartService.removeItem(itemName).then(() => {
      loadCart();
      if (editingName === itemName) {
        resetForm();
      }
    });
  };

  const handleClear = () => {
    CartService.clearCart().then(() => {
      loadCart();
      resetForm();
    });
  };

  const resetForm = () => {
    setEditingName(null);
    setName('');
    setQuantity(1);
    setPrice('');
  };

  // --- THE UI/UX MAGIC HAPPENS HERE ---
  // This function extracts the emoji or first letter for the product image
  const processProductVisual = (rawName) => {
    if (!rawName) return { graphic: '?', displayName: 'Unknown', isEmoji: false };

    const trimmed = rawName.trim();
    // Modern Unicode regex to detect if the string starts with an emoji
    const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation})/u;
    const match = trimmed.match(emojiRegex);

    if (match) {
      return {
        graphic: match[0], // The emoji itself
        displayName: trimmed.substring(match[0].length).trim(), // The text after the emoji
        isEmoji: true
      };
    } else {
      return {
        graphic: trimmed.charAt(0).toUpperCase(), // The first letter fallback
        displayName: trimmed,
        isEmoji: false
      };
    }
  };

  const grandTotal = items.reduce((acc, item) => acc + item.total, 0);

  return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.69)' }}>Shopping Cart System 🛒</h1>
        <br></br>
        {/* Input Form */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.30)' }}>
          <h3 style={{ marginTop: 0 }}>{editingName ? 'Update Item' : 'Add New Item'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
                type="text"
                placeholder="e.g. 👗 Blue Dress or Shirt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ flex: '1 1 200px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                type="number"
                min="1"
                placeholder="Qty"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={{ width: '80px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ width: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ backgroundColor: editingName ? '#007bff' : '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {editingName ? 'Update' : 'Add'}
            </button>

            {editingName && (
                <button type="button" onClick={resetForm} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancel
                </button>
            )}
          </form>
        </div>

        {/* Carousel Section */}
        <h3>Your Cart</h3>
        {items.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Your cart is empty.</p>
        ) : (
            // Horizontal scrolling flexbox (The "Carousel")
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '20px',
              paddingBottom: '15px',
              paddingTop: '5px'
            }}>
              {items.map((item) => {
                const visual = processProductVisual(item.name);

                return (
                    // Individual Product Card
                    <div key={item.id} style={{
                      minWidth: '220px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.20)',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'white'
                    }}>
                      {/* The "Image" Area */}
                      <div style={{
                        height: '180px',
                        backgroundColor: visual.isEmoji ? '#f1f3f5' : '#e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '80px', // Massive font size scales up emojis and letters perfectly!
                        color: visual.isEmoji ? 'inherit' : '#adb5bd',
                        borderBottom: '1px solid #e0e0e0'
                      }}>
                        {visual.graphic}
                      </div>

                      {/* Card Details */}
                      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                          {visual.displayName || 'Unnamed Item'}
                        </h4>
                        <p style={{ margin: '0 0 5px 0', color: '#666' }}>Qty: <strong>{item.quantity}</strong></p>
                        <p style={{ margin: '0 0 15px 0', color: '#666' }}>Price: <strong>Rs. {item.price.toFixed(2)}</strong></p>

                        <div style={{ marginTop: 'auto', borderTop: '1px dashed #ccc', paddingTop: '10px', marginBottom: '15px' }}>
                          <span style={{ fontSize: '14px', color: '#555' }}>Total:</span>
                          <strong style={{ fontSize: '18px', float: 'right', color: '#000' }}>Rs. {item.total.toFixed(2)}</strong>
                        </div>

                        {/* Card Actions */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                              onClick={() => handleEditClick(item)}
                              style={{ flex: 1, backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Edit
                          </button>
                          <button
                              onClick={() => handleRemove(item.name)}
                              style={{ flex: 1, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
        )}

        <h2 style={{ textAlign: 'right', marginTop: '30px' }}>Total Bill: Rs. {grandTotal.toFixed(2)}</h2>

        <button
            onClick={handleClear}
            style={{ width: '100%', padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}>
          Clear Entire Cart
        </button>
      </div>
  );
}

export default App;