import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const StandardDeviationCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [type, setType] = useState('population');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numArray.length === 0) {
      alert('Please enter valid numbers');
      return;
    }

    const mean = numArray.reduce((acc, val) => acc + val, 0) / numArray.length;
    const n = type === 'population' ? numArray.length : numArray.length - 1;
    const variance = numArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    const steps = [
      { description: 'Calculate Mean', value: `μ = ${mean.toFixed(4)}` },
      { description: 'Calculate Variance', value: `σ² = ${variance.toFixed(4)}` },
      { description: 'Standard Deviation', value: `σ = √${variance.toFixed(4)} = ${stdDev.toFixed(4)}` }
    ];

    setResult({
      count: numArray.length,
      mean: mean.toFixed(4),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
      steps
    });
  };

  return (
    <>
      <SEO
        title="Standard Deviation Calculator - Calculate SD & Variance"
        description="Free standard deviation calculator. Calculate population and sample standard deviation with variance."
        keywords="standard deviation calculator, variance calculator, SD calculator, statistics"
        canonicalUrl="/standard-deviation-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Standard Deviation Calculator</h1>
          <p>Calculate standard deviation and variance</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate Standard Deviation</h2>
            
            <div className="form-group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="population">Population (σ)</option>
                <option value="sample">Sample (s)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enter Numbers (comma-separated)</label>
              <textarea
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="e.g., 2, 4, 6, 8, 10"
                rows="4"
              />
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate
            </button>

            {result && (
              <>
                <div className="result-container">
                  <h3>Results</h3>
                  <div className="result-item"><strong>Count:</strong> {result.count}</div>
                  <div className="result-item"><strong>Mean:</strong> {result.mean}</div>
                  <div className="result-item"><strong>Variance:</strong> {result.variance}</div>
                  <div className="result-item">
                    <strong>Standard Deviation:</strong>
                    <div className="result-value">{result.stdDev}</div>
                  </div>
                </div>

                <div className="steps-container">
                  <h3>Steps</h3>
                  {result.steps.map((step, index) => (
                    <div key={index} className="step">
                      <span className="step-number">{index + 1}</span>
                      <div className="step-content">
                        <strong>{step.description}:</strong>
                        <span className="step-formula">{step.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Standard Deviation</h2>
          <p>Standard deviation measures how spread out numbers are from the mean. A low standard deviation means values are close to the mean, while a high standard deviation means they are spread out.</p>
          <h3>Formula</h3>
          <div className="formula-box">
            σ = √(Σ(x - μ)² / N)  (Population)
            <br />
            s = √(Σ(x - x̄)² / (n-1))  (Sample)
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardDeviationCalculator;

