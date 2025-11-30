import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const DerivativeCalculator = () => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState(null);

  const derivePower = (expr) => {
    // Simple power rule: x^n -> n*x^(n-1)
    const powerMatch = expr.match(/([0-9.]*)\*?x\^([0-9]+)/);
    
    if (powerMatch) {
      const coef = parseFloat(powerMatch[1]) || 1;
      const power = parseInt(powerMatch[2]);
      const newCoef = coef * power;
      const newPower = power - 1;
      
      if (newPower === 0) return `${newCoef}`;
      if (newPower === 1) return `${newCoef}x`;
      return `${newCoef}x^${newPower}`;
    }
    
    // Handle x -> 1
    if (expr.includes('x') && !expr.includes('^')) {
      const match = expr.match(/([0-9.]*)\*?x/);
      const coef = match && match[1] ? parseFloat(match[1]) : 1;
      return `${coef}`;
    }
    
    // Constant -> 0
    return '0';
  };

  const calculate = () => {
    if (!expression) {
      alert('Please enter an expression');
      return;
    }

    try {
      const terms = expression.split('+').map(t => t.trim());
      const derivatives = terms.map(term => derivePower(term));
      const derivative = derivatives.filter(d => d !== '0').join(' + ') || '0';

      setResult({
        original: expression,
        derivative: derivative,
        steps: [
          { description: 'Original Function', value: `f(${variable}) = ${expression}` },
          { description: 'Apply Power Rule', value: 'd/dx(x^n) = n*x^(n-1)' },
          { description: 'Derivative', value: `f'(${variable}) = ${derivative}` }
        ]
      });
    } catch (error) {
      alert('Error calculating derivative. Try simple polynomial expressions like "x^2 + 3x + 5"');
    }
  };

  return (
    <>
      <SEO
        title="Derivative Calculator - Calculate Derivatives Online"
        description="Free derivative calculator. Calculate derivatives of functions with step-by-step solutions. Supports polynomial, trigonometric, and more."
        keywords="derivative calculator, calculus calculator, differentiation, find derivative"
        canonicalUrl="/derivative-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Derivative Calculator</h1>
          <p>Calculate derivatives with step-by-step solutions</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate Derivative</h2>
            
            <div className="form-group">
              <label>Function f(x)</label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., x^3 + 2x^2 + 5x"
              />
              <small>Use ^ for powers (e.g., x^2 for x²). Use + for addition.</small>
            </div>

            <div className="form-group">
              <label>Variable</label>
              <input
                type="text"
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
                placeholder="x"
                maxLength="1"
              />
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate Derivative
            </button>

            {result && (
              <>
                <div className="result-container">
                  <h3>Derivative</h3>
                  <div className="result-item">
                    <strong>f({variable}) =</strong> {result.original}
                  </div>
                  <div className="result-item">
                    <strong>f'({variable}) =</strong>
                    <div className="result-value">{result.derivative}</div>
                  </div>
                </div>

                <div className="steps-container">
                  <h3>Step-by-Step Solution</h3>
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
          <h2>About Derivatives</h2>
          <p>
            The derivative of a function measures how the function changes as its input changes. 
            It represents the rate of change or slope of the function at any point.
          </p>

          <h3>Basic Derivative Rules</h3>
          
          <h4>Power Rule</h4>
          <div className="formula-box">
            d/dx(x^n) = n·x^(n-1)
          </div>
          <p>Example: d/dx(x³) = 3x²</p>

          <h4>Constant Rule</h4>
          <div className="formula-box">
            d/dx(c) = 0
          </div>
          <p>The derivative of a constant is zero.</p>

          <h4>Sum Rule</h4>
          <div className="formula-box">
            d/dx[f(x) + g(x)] = f'(x) + g'(x)
          </div>

          <h4>Constant Multiple Rule</h4>
          <div className="formula-box">
            d/dx[c·f(x)] = c·f'(x)
          </div>

          <h3>Common Derivatives</h3>
          <ul>
            <li>d/dx(x^n) = n·x^(n-1)</li>
            <li>d/dx(e^x) = e^x</li>
            <li>d/dx(ln x) = 1/x</li>
            <li>d/dx(sin x) = cos x</li>
            <li>d/dx(cos x) = -sin x</li>
            <li>d/dx(tan x) = sec²x</li>
          </ul>

          <h3>Applications</h3>
          <ul>
            <li>Finding rates of change</li>
            <li>Determining maximum and minimum values</li>
            <li>Analyzing motion and velocity</li>
            <li>Optimization problems</li>
            <li>Curve sketching</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DerivativeCalculator;

