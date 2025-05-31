import React, { useState } from 'react';
import { healthTips } from '../data/healthTips';
import './HealthTips.css';

function HealthTips({ category, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="health-tips">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide' : 'Show'} Health Tips
      </button>
      {isOpen && (
        <div className="tips-content">
          <p>{healthTips[category] || 'Calculate your BMI to see personalized tips.'}</p>
        </div>
      )}
    </div>
  );
}

export default HealthTips;