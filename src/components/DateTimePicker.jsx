// src/components/DateTimePicker.jsx
import React, { useState, useEffect } from 'react';

function DateTimePicker({ value, onChange, label, required = false }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // ✅ Parse value when it changes
  useEffect(() => {
    if (value) {
      try {
        const dateObj = new Date(value);
        if (!isNaN(dateObj)) {
          const datePart = dateObj.toISOString().split('T')[0];
          const timePart = dateObj.toTimeString().slice(0, 5);
          setDate(datePart);
          setTime(timePart);
        }
      } catch (e) {
        console.error('Date parse error:', e);
      }
    }
  }, [value]);

  // ✅ Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    updateDateTime(newDate, time);
  };

  // ✅ Handle time change
  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    updateDateTime(date, newTime);
  };

  // ✅ Combine date + time -> ISO format
  const updateDateTime = (datePart, timePart) => {
    if (datePart && timePart) {
      try {
        // ✅ Consistent format: YYYY-MM-DDTHH:mm
        const isoString = `${datePart}T${timePart}`;
        onChange(isoString);
      } catch (e) {
        console.error('DateTime combine error:', e);
      }
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* ✅ DATE INPUT */}
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
          aria-label={`${label} - Date`}
        />
        
        {/* ✅ TIME INPUT */}
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
          aria-label={`${label} - Time`}
        />
      </div>
      {/* ✅ Show consistent format */}
      {date && time && (
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          Selected: {date} {time}
        </div>
      )}
    </div>
  );
}

export default DateTimePicker;