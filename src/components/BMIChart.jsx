import React from 'react';
import './BMIChart.css';

function BMIChart({ bmi, theme }) {
  const position = bmi ? Math.min((bmi / 40) * 100, 100) : 0; // Scale BMI to 0-40
  return (
    <div className="bmi-chart">
      <div className="range underweight">Underweight (&lt;18.5)</div>
      <div className="range normal">Normal (18.5-24.9)</div>
      <div className="range overweight">Overweight (25-29.9)</div>
      <div className="range obese">Obese (≥30)</div>
      {bmi && (
        <div className="bmi-marker" style={{ left: `${position}%` }}>
          {bmi}
        </div>
      )}
    </div>
  );
}

export default BMIChart;