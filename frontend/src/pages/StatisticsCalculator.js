import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const StatisticsCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numArray.length === 0) {
      alert('Please enter valid numbers');
      return;
    }

    const sorted = [...numArray].sort((a, b) => a - b);
    const sum = numArray.reduce((acc, val) => acc + val, 0);
    const mean = sum / numArray.length;
    
    // Median
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];

    // Mode
    const frequency = {};
    numArray.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number);

    // Variance and Standard Deviation
    const variance = numArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numArray.length;
    const stdDev = Math.sqrt(variance);

    setResult({
      count: numArray.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(4),
      median: median.toFixed(4),
      mode: maxFreq > 1 ? modes.join(', ') : 'No mode',
      range: (Math.max(...numArray) - Math.min(...numArray)).toFixed(2),
      min: Math.min(...numArray),
      max: Math.max(...numArray),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4)
    });
  };

  return (
    <>
      <SEO
        title="Statistics Calculator - Calculate Mean, Median, Mode, Variance"
        description="Free statistics calculator. Calculate mean, median, mode, standard deviation, variance, and more statistical measures."
        keywords="statistics calculator, mean, median, mode, variance, standard deviation"
        canonicalUrl="/statistics-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Statistics Calculator</h1>
          <p>Calculate statistical measures for your data</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate Statistics</h2>
            
            <div className="form-group">
              <label>Enter Numbers (comma-separated)</label>
              <textarea
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="e.g., 12, 15, 18, 20, 22, 25"
                rows="4"
              />
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate Statistics
            </button>

            {result && (
              <div className="result-container">
                <h3>Results</h3>
                <div className="result-item"><strong>Count:</strong> {result.count}</div>
                <div className="result-item"><strong>Sum:</strong> {result.sum}</div>
                <div className="result-item"><strong>Mean:</strong> {result.mean}</div>
                <div className="result-item"><strong>Median:</strong> {result.median}</div>
                <div className="result-item"><strong>Mode:</strong> {result.mode}</div>
                <div className="result-item"><strong>Range:</strong> {result.range}</div>
                <div className="result-item"><strong>Min:</strong> {result.min}</div>
                <div className="result-item"><strong>Max:</strong> {result.max}</div>
                <div className="result-item"><strong>Variance:</strong> {result.variance}</div>
                <div className="result-item"><strong>Std Deviation:</strong> {result.stdDev}</div>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Statistics</h2>
          <p>Statistics is the science of collecting, analyzing, and interpreting data. This calculator computes various statistical measures that help describe and understand data distributions.</p>
          <h3>Statistical Measures</h3>
          <ul>
            <li><strong>Mean:</strong> Average value</li>
            <li><strong>Median:</strong> Middle value</li>
            <li><strong>Mode:</strong> Most frequent value</li>
            <li><strong>Variance:</strong> Measure of spread</li>
            <li><strong>Standard Deviation:</strong> Square root of variance</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatisticsCalculator;

