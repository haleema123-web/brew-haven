// src/pages/SafeOrderPage.jsx
import React, { useState } from 'react';

function SafeOrderPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleSafeDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setDeleted(true);
    setShowConfirm(false);
    alert('✅ Account deleted with explicit confirmation!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: 'green' }}>🛡️ Safe - Clickjacking Protected</h1>
      <p style={{ background: '#e8f5e9', padding: '10px', borderRadius: '5px' }}>
        ✅ Yeh page clickjacking attacks se protected hai!
      </p>
      
      <hr />

      <div style={{ 
        position: 'relative', 
        zIndex: 1000,
        border: '2px solid green',
        padding: '20px',
        borderRadius: '10px',
        background: '#f5fff5'
      }}>
        <h3>🛡️ Protected Button</h3>
        <button 
          onClick={handleSafeDelete}
          style={{
            background: '#ff4444',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            width: '100%',
            position: 'relative',
            zIndex: 1001
          }}
        >
          🗑️ Delete Account
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          ✅ Clickjacking protected with high z-index
        </p>
      </div>

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.7)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ff4444' }}>⚠️ Confirm Account Deletion</h3>
            <p>Are you sure you want to delete your account?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                onClick={handleConfirmDelete}
                style={{ background: '#ff4444', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                ✅ Yes, Delete
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                style={{ background: '#ccc', padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleted && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#ffcccc', borderRadius: '10px', border: '2px solid red' }}>
          <h2 style={{ color: 'red' }}>🗑️ Account Deleted!</h2>
          <p>✅ User ne explicit confirmation ke baad delete kiya!</p>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>
        <h4>🛡️ Protection Features:</h4>
        <ul>
          <li>✅ <strong>X-FRAME-OPTIONS: DENY</strong></li>
          <li>✅ <strong>frame-ancestors: 'none'</strong></li>
          <li>✅ <strong>Explicit user confirmation modal</strong></li>
          <li>✅ <strong>High z-index on action buttons (1000+)</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default SafeOrderPage;