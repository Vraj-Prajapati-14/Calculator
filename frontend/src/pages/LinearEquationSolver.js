import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const LinearEquationSolver = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const solve = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);

    if (isNaN(coeffA) || isNaN(coeffB)) {
      alert('Please enter valid numbers');
      return;
    }

    if (coeffA === 0) {
      if (coeffB === 0) {
        setResult({ solution: 'Infinite solutions', type: 'infinite' });
      } else {
        setResult({ solution: 'No solution', type: 'none' });
      }
    } else {
      const x = -coeffB / coeffA;
      setResult({
        solution: x.toFixed(4),
        type: 'unique',
        steps: [
          { description: 'Original equation', value: `${coeffA}x + ${coeffB} = 0` },
          { description: 'Subtract b from both sides', value: `${coeffA}x = ${-coeffB}` },
          { description: 'Divide by a', value: `x = ${-coeffB} / ${coeffA}` },
          { description: 'Solution', value: `x = ${x.toFixed(4)}` }
        ]
      });
    }
  };

  return (
    <>
      <SEO
        title="Linear Equation Solver - Solve Linear Equations Online"
        description="Free linear equation solver. Solve equations of the form ax + b = 0 with step-by-step solutions."
        keywords="linear equation solver, solve linear equations, algebra calculator, equation solver"
        canonicalUrl="/linear-equation-solver"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Linear Equation Solver</h1>
          <p>Solve linear equations of the form ax + b = 0</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Solve Linear Equation</h2>
            
            <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: '20px 0', padding: '15px', background: '#f3f4f6', borderRadius: '8px' }}>
              <strong>ax + b = 0</strong>
            </p>

            <div className="input-grid">
              <div className="form-group">
                <label>Coefficient a</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="e.g., 2"
                />
              </div>

              <div className="form-group">
                <label>Constant b</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="e.g., 6"
                />
              </div>
            </div>

            <button onClick={solve} className="btn btn-primary btn-block">
              Solve Equation
            </button>

            {result && (
              <div className="result-container">
                <h3>Solution</h3>
                <div className="result-value">{result.solution}</div>
                
                {result.steps && (
                  <div className="steps-container" style={{ marginTop: '20px' }}>
                    <h4>Step-by-Step Solution</h4>
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
                )}
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Linear Equations</h2>
          <p>
            A linear equation is an equation where the highest power of the variable is 1. 
            The general form is ax + b = 0, where a and b are constants and x is the variable.
          </p>

          <h3>Solution Formula</h3>
          <div className="formula-box">
            x = -b / a  (when a ≠ 0)
          </div>

          <h3>Example</h3>
          <p>Solve: 2x + 6 = 0</p>
          <ul>
            <li>2x = -6</li>
            <li>x = -6 / 2</li>
            <li>x = -3</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LinearEquationSolver;

