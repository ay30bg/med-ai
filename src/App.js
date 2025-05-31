import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BMICalculator from './components/BMICalculator';
import ResultHistory from './components/ResultHistory';
import Footer from './components/Footer';
import ErrorModal from './components/ErrorModal';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    setHistory(savedHistory);
    // Apply theme
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const saveToHistory = (result) => {
    const newHistory = [result, ...history].slice(0, 5); // Keep latest 5 results
    setHistory(newHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmiHistory');
  };

  return (
    <div className="app-container">
      <Header theme={theme} setTheme={setTheme} />
      <main>
        <BMICalculator saveToHistory={saveToHistory} setError={setError} theme={theme} />
        <ResultHistory history={history} clearHistory={clearHistory} theme={theme} />
      </main>
      <Footer />
      {error && <ErrorModal message={error} onClose={() => setError(null)} theme={theme} />}
    </div>
  );
}

export default App;