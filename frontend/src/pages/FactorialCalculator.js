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
        title="FREE Factorial Calculator - Best Easy Accurate n! Calculator for Students | Calculator Hub"
        description="FREE factorial calculator - Best, easy, and accurate n! calculator for students. Calculate factorials quickly with step-by-step solutions. Perfect for math homework and exams. No signup required!"
        keywords="free factorial calculator, best factorial calculator, easy factorial calculator, factorial calculator for students, calculate factorial, n factorial calculator, factorial calculator for college, free online factorial calculator, best calculator for students, easy calculator for homework, permutation calculator, combination calculator"
        canonicalUrl="/factorial-calculator"
        lang="en"
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>FREE Factorial Calculator - Best n! Calculator for Students</h1>
          <p>Easy, accurate, and free factorial calculator. Calculate factorials (n!) quickly with step-by-step solutions. Perfect for students and math homework.</p>
        </header>

        <section className="calculator-container" aria-label="Factorial Calculator">
          <article className="calculator-card">
            <h2>Calculate Factorial</h2>
            
            <div className="form-group">
              <label htmlFor="factorial-number">Enter a Number (n)</label>
              <input
                id="factorial-number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., 5"
                min="0"
                max="170"
                aria-label="Enter a number to calculate factorial"
                aria-required="true"
              />
              <small>Enter a non-negative integer (0-170)</small>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate n!
            </button>

            {result && (
              <div className="result-container" role="region" aria-live="polite" aria-label="Calculation result">
                <h3>Result</h3>
                <div className="result-item">
                  <strong>{result.number}! =</strong>
                  <div className="result-value" aria-label={`Factorial of ${result.number}`}>{result.factorial}</div>
                </div>
                {result.exactValue !== 'Too large to display exactly' && (
                  <div className="result-item">
                    <strong>Exact Value:</strong> {result.exactValue}
                  </div>
                )}
                
                {result.steps.length > 0 && (
                  <section className="steps-container" aria-label="Step-by-step solution" style={{ marginTop: '15px' }}>
                    <h4>Calculation Steps</h4>
                    {result.steps.map((step, index) => (
                      <div key={index} className="step-formula">
                        {step.value}
                      </div>
                    ))}
                  </section>
                )}
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Factorial Calculator">
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
        </section>
      </main>
    </>
  );
};

export default FactorialCalculator;

