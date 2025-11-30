import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const FactorialCalculator = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = () => {
    const num = parseInt(number);
    
    if (isNaN(num) || num < 0) {
      alert('Please enter a valid non-negative integer');
      return;
    }

    if (num > 170) {
      alert('Number too large. Maximum is 170');
      return;
    }

    const factorialResult = factorial(num);
    const steps = [];
    
    if (num <= 10) {
      let calculation = [];
      for (let i = num; i >= 1; i--) {
        calculation.push(i);
      }
      steps.push({
        description: 'Factorial Calculation',
        value: `${num}! = ${calculation.join(' × ')} = ${factorialResult}`
      });
    }

    setResult({
      number: num,
      factorial: factorialResult.toExponential(4),
      exactValue: num <= 20 ? factorialResult.toString() : 'Too large to display exactly',
      steps: steps
    });
  };

  return (
    <>
      <SEO
        title="Factorial Calculator - Calculate Factorials Online"
        description="Free factorial calculator. Calculate factorials (n!) of any number quickly and easily with step-by-step solutions."
        keywords="factorial calculator, calculate factorial, n factorial, mathematics"
        canonicalUrl="/factorial-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Factorial Calculator</h1>
          <p>Calculate factorials (n!) quickly and easily</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate Factorial</h2>
            
            <div className="form-group">
              <label>Enter a Number (n)</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., 5"
                min="0"
                max="170"
              />
              <small>Enter a non-negative integer (0-170)</small>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate n!
            </button>

            {result && (
              <div className="result-container">
                <h3>Result</h3>
                <div className="result-item">
                  <strong>{result.number}! =</strong>
                  <div className="result-value">{result.factorial}</div>
                </div>
                {result.exactValue !== 'Too large to display exactly' && (
                  <div className="result-item">
                    <strong>Exact Value:</strong> {result.exactValue}
                  </div>
                )}
                
                {result.steps.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    {result.steps.map((step, index) => (
                      <div key={index} className="step-formula">
                        {step.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Factorial</h2>
          <p>
            The factorial of a non-negative integer n, denoted by n!, is the product of all positive 
            integers less than or equal to n.
          </p>

          <h3>Definition</h3>
          <div className="formula-box">
            n! = n × (n-1) × (n-2) × ... × 2 × 1
            <br />
            0! = 1 (by definition)
          </div>

          <h3>Examples</h3>
          <ul>
            <li>5! = 5 × 4 × 3 × 2 × 1 = 120</li>
            <li>3! = 3 × 2 × 1 = 6</li>
            <li>0! = 1</li>
          </ul>

          <h3>Applications</h3>
          <ul>
            <li>Permutations and combinations</li>
            <li>Probability calculations</li>
            <li>Series expansions (Taylor series)</li>
            <li>Number of ways to arrange objects</li>
          </ul>

          <h3>Properties</h3>
          <ul>
            <li>n! = n × (n-1)!</li>
            <li>Factorials grow very quickly</li>
            <li>10! = 3,628,800</li>
            <li>20! = 2,432,902,008,176,640,000</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FactorialCalculator;

