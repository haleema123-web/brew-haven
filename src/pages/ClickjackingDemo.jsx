// src/pages/ClickjackingDemo.jsx
import React, { useState } from 'react';

function ClickjackingDemo() {
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleDeleteAccount = () => {
    setClicked(true);
    setClicks(prev => prev + 1);
    alert('🔥 ACCOUNT DELETED! (Hacker ne click karvaya!)');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff4444' }}>🕵️ Clickjacking Demo - Hacker Practice</h1>
      <p style={{ color: 'red', fontWeight: 'bold', background: '#ffeeee', padding: '10px', borderRadius: '5px' }}>
        ⚠️ Yeh SIRF PRACTICE ke liye hai! Chrome mein test karein!
      </p>

      <hr />

      {/* TARGET BUTTON */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        margin: '30px 0',
        border: '2px solid red',
        padding: '20px',
        borderRadius: '10px',
        background: '#fff5f5'
      }}>
        <h3>🎯 Target Button (Real)</h3>
        <button 
          onClick={handleDeleteAccount}
          style={{
            background: '#ff4444',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          🗑️ Delete Account
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Clicks: {clicks}
        </p>
      </div>

      {/* HACKER'S OVERLAY */}
      <div style={{ 
        marginTop: '30px', 
        border: '2px solid blue', 
        padding: '20px',
        borderRadius: '10px',
        background: '#f0f8ff'
      }}>
        <h3 style={{ color: 'blue' }}>🕵️ Hacker's Transparent Overlay</h3>
        <p>Neche button click karo, asal mein "Delete Account" click hoga!</p>
        
        <div style={{ position: 'relative', width: '100%', margin: '20px 0' }}>
          {/* TRANSPARENT OVERLAY */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 255, 0.1)',
              zIndex: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
            onClick={handleDeleteAccount}
          >
            <span style={{ 
              background: 'rgba(255,255,255,0.9)', 
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
              color: 'blue',
              fontSize: '18px'
            }}>
              🎁 Click to Claim Prize!
            </span>
          </div>

          {/* TARGET BUTTON (Background) */}
          <button 
            style={{
              background: '#ff4444',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              width: '100%',
              opacity: 0.3,
              cursor: 'default'
            }}
          >
            🗑️ Delete Account
          </button>
        </div>

        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
          💡 User "Claim Prize" click karega, lekin asal mein "Delete Account" click hoga!
        </p>
      </div>

      {clicked && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          background: '#ffcccc', 
          borderRadius: '10px',
          border: '2px solid red'
        }}>
          <h2 style={{ color: 'red' }}>🔥 ACCOUNT DELETED!</h2>
          <p>Hacker ne clickjacking se user ko trick kiya!</p>
          <p>Total clicks: {clicks}</p>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>
        <h4>🛡️ Isko Kaise Rokna Hai?</h4>
        <ul>
          <li>✅ <strong>X-FRAME-OPTIONS: DENY</strong></li>
          <li>✅ <strong>frame-ancestors: 'none'</strong></li>
          <li>✅ <strong>Explicit user confirmation</strong></li>
          <li>✅ <strong>High z-index on buttons</strong></li>
        </ul>
        <p>
          👉 <a href="/safe-demo" style={{ color: '#6f4e37' }}>Safe Demo Dekhein</a>
        </p>
      </div>
    </div>
  );
}

export default ClickjackingDemo;