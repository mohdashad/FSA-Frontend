import React, { useState } from 'react';
import '../../styles/styles.css'; // with import

const RequestPopup = ({ isOpen, onClose, onSubmit }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('In-person');
  const [duration, setDuration] = useState('');
  const [negotiatedTerms, setNegotiatedTerms] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ deliveryMethod, duration, negotiatedTerms });
    onClose(); // Close the popup after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Request Exchange</h2>
        <div>
          <label>Delivery Method:</label>
          <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
            <option value="In-person">In-person</option>
            <option value="Shipping">Shipping</option>
          </select>
        </div>
        <div>
          <label>Duration (in days):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
          />
        </div>
        <div>
          <label>Negotiated Terms:</label>
          <textarea
            value={negotiatedTerms}
            onChange={(e) => setNegotiatedTerms(e.target.value)}
            placeholder="Enter any terms"
          />
        </div>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RequestPopup;
