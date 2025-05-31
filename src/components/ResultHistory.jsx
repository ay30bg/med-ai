import React from 'react';
import './ResultHistory.css';

function ResultHistory({ history, clearHistory, theme }) {
  const downloadHistory = () => {
    const csv = [
      'Timestamp,Height,Weight,BMI,Category,Unit',
      ...history.map(
        (item) =>
          `${item.timestamp},${item.height},${item.weight},${item.bmi},${item.category},${item.unit}`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history-card">
      <h2>Calculation History</h2>
      {history.length === 0 ? (
        <p>No calculations yet.</p>
      ) : (
        <>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <span>{item.timestamp}</span>
                <span>
                  BMI: {item.bmi} ({item.category})
                </span>
                <span>
                  Height: {item.height}
                  {item.unit === 'metric' ? 'cm' : 'in'}, Weight: {item.weight}
                  {item.unit === 'metric' ? 'kg' : 'lbs'}
                </span>
              </li>
            ))}
          </ul>
          <div className="history-buttons">
            <button className="clear-btn" onClick={clearHistory}>
              Clear History
            </button>
            <button className="download-history-btn" onClick={downloadHistory}>
              Download History
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ResultHistory;