// src/components/SessionTimeout.jsx
import React, { useState, useEffect, useRef } from 'react';

function SessionTimeout({ 
  timeout = 300000, // 5 minutes (default)
  warningTime = 60000, // 1 minute warning (default)
  onLogout = () => {}, 
  onKeepAlive = () => {},
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.round(warningTime / 1000));
  const timerRef = useRef(null);
  const warningRef = useRef(null);

  // ✅ Check if user is active (click, keypress, scroll)
  useEffect(() => {
    const resetTimer = () => {
      // Reset session timer on user activity
      clearTimeout(timerRef.current);
      clearTimeout(warningRef.current);
      setShowDialog(false);
      
      // Start session timer
      timerRef.current = setTimeout(() => {
        // Show warning dialog
        setShowDialog(true);
        setTimeLeft(Math.round(warningTime / 1000));
        
        // Start countdown
        warningRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(warningRef.current);
              handleLogout();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, timeout - warningTime);
    };

    // ✅ User activity events
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // ✅ Start initial timer
    resetTimer();

    // ✅ Cleanup
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningRef.current);
      clearInterval(warningRef.current);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [timeout, warningTime]);

  // ✅ Handle Keep Alive (Extend Session)
  const handleKeepAlive = () => {
    setShowDialog(false);
    clearTimeout(warningRef.current);
    clearInterval(warningRef.current);
    
    // Call parent function
    onKeepAlive();
    
    // Reset timer
    timerRef.current = setTimeout(() => {
      setShowDialog(true);
      setTimeLeft(Math.round(warningTime / 1000));
      
      warningRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(warningRef.current);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, timeout - warningTime);
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    setShowDialog(false);
    clearTimeout(timerRef.current);
    clearTimeout(warningRef.current);
    clearInterval(warningRef.current);
    onLogout();
  };

  // ✅ Prevent auto-trigger on mobile zoom/click emulation
  const handleButtonClick = (e) => {
    // ✅ Prevent accidental double clicks
    if (e.detail > 1) {
      e.preventDefault();
      return;
    }
    handleKeepAlive();
  };

  if (!showDialog) return null;

  return (
    <div 
      className="session-timeout-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div 
        className="session-timeout-dialog"
        style={{
          background: 'white',
          padding: '35px 40px',
          borderRadius: '16px',
          maxWidth: '450px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'sessionSlideIn 0.3s ease',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏰</div>
        
        <h2 style={{ color: '#3e2723', marginBottom: '10px' }}>
          Session Expiring Soon!
        </h2>
        
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
          Your session will expire in{' '}
          <strong style={{ color: '#ff6b35', fontSize: '24px' }}>
            {timeLeft}
          </strong>{' '}
          seconds.
        </p>
        
        <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>
          Click "Keep me signed in" to extend your session.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '25px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* ✅ KEEP ME SIGNED IN BUTTON - Auto-trigger prevention */}
          <button
            onClick={handleButtonClick}
            className="keep-alive-btn"
            style={{
              background: '#6f4e37',
              color: 'white',
              padding: '12px 28px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s ease',
              minWidth: '180px',
              position: 'relative',
              zIndex: 100001,
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            🔐 Keep me signed in
          </button>
          
          {/* ❌ LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '12px 28px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s ease',
              minWidth: '120px',
              touchAction: 'manipulation',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SessionTimeout;