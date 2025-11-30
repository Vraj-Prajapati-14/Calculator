import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const PermutationCombinationCalculator = () => {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [result, setResult] = useState(null);

  const factorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  const calculate = () => {
    const numN = parseInt(n);
    const numR = parseInt(r);

    if (isNaN(numN) || isNaN(numR) || numN < 0 || numR < 0) {
      alert('Please enter valid non-negative integers');
      return;
    }

    if (numR > numN) {
      alert('r cannot be greater than n');
      return;
    }

    const permutation = factorial(numN) / factorial(numN - numR);
    const combination = factorial(numN) / (factorial(numR) * factorial(numN - numR));

    setResult({
      n: numN,
      r: numR,
      permutation: permutation,
      combination: combination,
      steps: [
        { description: 'Permutation Formula', value: 'P(n,r) = n! / (n-r)!' },
        { description: 'Permutation Calculation', value: `P(${numN},${numR}) = ${numN}! / ${numN - numR}! = ${permutation}` },
        { description: 'Combination Formula', value: 'C(n,r) = n! / (r! × (n-r)!)' },
        { description: 'Combination Calculation', value: `C(${numN},${numR}) = ${numN}! / (${numR}! × ${numN - numR}!) = ${combination}` }
      ]
    });
  };

  return (
    <>
      <SEO
        title="Permutation & Combination Calculator - nPr and nCr Calculator"
        description="Free permutation and combination calculator. Calculate nPr and nCr with step-by-step solutions."
        keywords="permutation calculator, combination calculator, nPr, nCr, factorial"
        canonicalUrl="/permutation-combination-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Permutation & Combination Calculator</h1>
          <p>Calculate nPr and nCr</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate P(n,r) and C(n,r)</h2>
            
            <div className="input-grid">
              <div className="form-group">
                <label>n (Total Items)</label>
                <input
                  type="number"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  placeholder="e.g., 5"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>r (Items to Choose)</label>
                <input
                  type="number"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  placeholder="e.g., 3"
                  min="0"
                />
              </div>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate
            </button>

            {result && (
              <>
                <div className="result-container">
                  <h3>Results</h3>
                  <div className="result-item">
                    <strong>Permutation P({result.n},{result.r}):</strong>
                    <div className="result-value">{result.permutation.toLocaleString()}</div>
                    <small>Order matters</small>
                  </div>
                  <div className="result-item">
                    <strong>Combination C({result.n},{result.r}):</strong>
                    <div className="result-value">{result.combination.toLocaleString()}</div>
                    <small>Order doesn't matter</small>
                  </div>
                </div>

                <div className="steps-container">
                  <h3>Formulas & Steps</h3>
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
          <h2>About Permutations & Combinations</h2>
          
          <h3>Permutations (Order Matters)</h3>
          <div className="formula-box">
            P(n,r) = n! / (n-r)!
          </div>
          <p>Used when the order of selection matters. Example: PIN codes, race rankings.</p>

          <h3>Combinations (Order Doesn't Matter)</h3>
          <div className="formula-box">
            C(n,r) = n! / (r! × (n-r)!)
          </div>
          <p>Used when only selection matters, not order. Example: Lottery numbers, committee selection.</p>

          <h3>Example</h3>
          <p>From 5 people, select 3:</p>
          <ul>
            <li><strong>Permutation:</strong> P(5,3) = 60 (different arrangements)</li>
            <li><strong>Combination:</strong> C(5,3) = 10 (just groups)</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PermutationCombinationCalculator;

