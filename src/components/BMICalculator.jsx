import React, { useState } from 'react';
import BMIChart from './BMIChart';
import HealthTips from './HealthTips';
import './BMICalculator.css';

function BMICalculator({ saveToHistory, setError, theme }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null); // Corrected typo: bAscendancybmi -> bmi
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!height || !weight) {
      setError('Please enter both height and weight.');
      return false;
    }
    if (height <= 0 || weight <= 0) {
      setError('Height and weight must be positive numbers.');
      return false;
    }
    if (height > 300 || weight > 500) {
      setError('Please enter realistic values (height ≤ 300cm, weight ≤ 500kg).');
      return false;
    }
    return true;
  };

  const calculateBMI = () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setTimeout(() => {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let category;
      if (bmiValue < 18.5) category = 'Underweight';
      else if (bmiValue >= 18.5 && bmiValue < 25) category = 'Normal';
      else if (bmiValue >= 25 && bmiValue < 30) category = 'Overweight';
      else category = 'Obese';
      setCategory(category);

      const result = {
        height,
        weight,
        bmi: bmiValue,
        category,
        timestamp: new Date().toLocaleString(),
      };
      saveToHistory(result);
      setIsLoading(false);
    }, 500);
  };

  const downloadResult = () => {
    if (!bmi) return;

    const resultText = `BMI Result\n\nTimestamp: ${new Date().toLocaleString()}\nWeight: ${weight} kg\nHeight: ${height} cm\nBMI: ${bmi}\nCategory: ${category}`;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi_result_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetInputs = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="calculator-card">
      <h2>Calculate Your BMI</h2>
      <div className="input-group">
        <label>Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in cm (180cm)"
        />
      </div>
      <div className="input-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kg (65kg)"
        />
      </div>
      <div className="button-group">
        <button className="calculate-btn" onClick={calculateBMI} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Calculate'}
        </button>
        <button className="reset-btn" onClick={resetInputs}>
          Reset
        </button>
      </div>
      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {category}</p>
          <BMIChart bmi={bmi} theme={theme} />
          <HealthTips category={category} theme={theme} />
          <button className="download-btn" onClick={downloadResult}>
            Download Result
          </button>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
