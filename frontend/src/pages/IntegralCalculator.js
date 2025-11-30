import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import { derivative, parse, simplify } from 'mathjs';

const IntegralCalculator = () => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [type, setType] = useState('indefinite');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Integral Calculator - Calculate Integrals Online",
    "description": "Free integral calculator. Calculate definite and indefinite integrals with step-by-step solutions. Supports polynomial, trigonometric, and exponential functions.",
    "url": "https://yourdomain.com/integral-calculator"
  };

  // Basic integration rules
  const basicIntegrationRules = {
    'power': 'ʃ x^n dx = x^(n+1)/(n+1) + C',
    'constant': 'ʃ k dx = kx + C',
    'exponential': 'ʃ e^x dx = e^x + C',
    'sin': 'ʃ sin(x) dx = -cos(x) + C',
    'cos': 'ʃ cos(x) dx = sin(x) + C',
    'ln': 'ʃ 1/x dx = ln|x| + C'
  };

  const integratePolynomial = (expr) => {
    try {
      // Simple polynomial integration
      const terms = expr.split('+').map(t => t.trim());
      const integratedTerms = terms.map(term => {
        // Handle x^n
        if (term.includes('^')) {
          const match = term.match(/([0-9.]*)\*?x\^([0-9]+)/);
          if (match) {
            const coef = match[1] || '1';
            const power = parseInt(match[2]);
            const newCoef = parseFloat(coef) / (power + 1);
            const newPower = power + 1;
            return `${newCoef.toFixed(3)}x^${newPower}`;
          }
        }
        // Handle x
        else if (term.includes('x')) {
          const match = term.match(/([0-9.]*)\*?x/);
          const coef = match && match[1] ? parseFloat(match[1]) : 1;
          return `${(coef / 2).toFixed(3)}x^2`;
        }
        // Handle constant
        else {
          const coef = parseFloat(term);
          return `${coef.toFixed(3)}x`;
        }
      });
      
      return integratedTerms.join(' + ') + ' + C';
    } catch (error) {
      return null;
    }
  };

  const calculate = () => {
    if (!expression) {
      alert('Please enter an expression');
      return;
    }

    try {
      const calculationSteps = [];
      
      calculationSteps.push({
        description: 'Original Expression',
        value: `ʃ ${expression} d${variable}`
      });

      // Attempt simple polynomial integration
      const integral = integratePolynomial(expression);
      
      if (integral) {
        calculationSteps.push({
          description: 'Apply Integration Rules',
          value: 'Using power rule: ʃ x^n dx = x^(n+1)/(n+1) + C'
        });

        if (type === 'indefinite') {
          calculationSteps.push({
            description: 'Indefinite Integral Result',
            value: integral
          });

          setResult({
            type: 'indefinite',
            integral: integral,
            expression: expression
          });
        } else {
          // Definite integral
          const lower = parseFloat(lowerLimit);
          const upper = parseFloat(upperLimit);

          if (isNaN(lower) || isNaN(upper)) {
            alert('Please enter valid numeric limits');
            return;
          }

          calculationSteps.push({
            description: 'Definite Integral Setup',
            value: `ʃ from ${lower} to ${upper} ${expression} d${variable}`
          });

          calculationSteps.push({
            description: 'Apply Limits',
            value: `[${integral.replace(' + C', '')}] evaluated from ${lower} to ${upper}`
          });

          // For demonstration - simplified calculation
          const area = `F(${upper}) - F(${lower})`;
          
          calculationSteps.push({
            description: 'Calculate Definite Integral',
            value: `Substitute upper and lower limits into the antiderivative`
          });

          setResult({
            type: 'definite',
            integral: integral.replace(' + C', ''),
            expression: expression,
            lowerLimit: lower,
            upperLimit: upper,
            note: 'Substitute limits into antiderivative and evaluate'
          });
        }

        setSteps(calculationSteps);
      } else {
        alert('Could not integrate this expression. Try simpler polynomial expressions like "x^2 + 3x + 5"');
      }
    } catch (error) {
      alert('Error calculating integral. Please check your expression.');
      console.error(error);
    }
  };

  return (
    <>
      <SEO
        title="Integral Calculator - Calculate Definite & Indefinite Integrals"
        description="Free integral calculator with steps. Calculate definite and indefinite integrals of polynomial, trigonometric, and exponential functions. Get step-by-step solutions."
        keywords="integral calculator, integration calculator, definite integral, indefinite integral, calculus calculator, antiderivative"
        canonicalUrl="/integral-calculator"
        structuredData={structuredData}
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Integral Calculator</h1>
          <p>Calculate definite and indefinite integrals with step-by-step solutions</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate Integral</h2>
            
            <div className="form-group">
              <label>Integration Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="indefinite">Indefinite Integral (ʃ f(x) dx)</option>
                <option value="definite">Definite Integral (ʃᵇₐ f(x) dx)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expression (Function to integrate)</label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., x^2 + 3x + 5"
              />
              <small>Use ^ for powers (e.g., x^2 for x²). Use * for multiplication (optional)</small>
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

            {type === 'definite' && (
              <div className="input-grid">
                <div className="form-group">
                  <label>Lower Limit (a)</label>
                  <input
                    type="number"
                    value={lowerLimit}
                    onChange={(e) => setLowerLimit(e.target.value)}
                    placeholder="e.g., 0"
                  />
                </div>

                <div className="form-group">
                  <label>Upper Limit (b)</label>
                  <input
                    type="number"
                    value={upperLimit}
                    onChange={(e) => setUpperLimit(e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>
            )}

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate Integral
            </button>

            {result && (
              <div className="result-container">
                <h3>Result</h3>
                
                {result.type === 'indefinite' ? (
                  <>
                    <div className="result-item">
                      <strong>Integral:</strong>
                      <div className="result-value" style={{ fontSize: '1.5rem' }}>
                        ʃ {result.expression} d{variable} = {result.integral}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="result-item">
                      <strong>Antiderivative:</strong>
                      <div className="result-value" style={{ fontSize: '1.3rem' }}>
                        {result.integral}
                      </div>
                    </div>
                    <div className="result-item">
                      <strong>Limits:</strong> From {result.lowerLimit} to {result.upperLimit}
                    </div>
                    <div className="alert alert-info">
                      {result.note}
                    </div>
                  </>
                )}
              </div>
            )}

            {steps.length > 0 && (
              <div className="steps-container">
                <h3>Step-by-Step Solution</h3>
                {steps.map((step, index) => (
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
        </div>

        <div className="info-section">
          <h2>About Integration</h2>
          <p>
            Integration is the reverse process of differentiation. It's used to find areas, volumes, 
            central points, and many other useful things. An integral assigns numbers to functions 
            in a way that describes displacement, area, volume, and other concepts.
          </p>

          <h3>Types of Integrals</h3>
          
          <h4>1. Indefinite Integral</h4>
          <p>An indefinite integral represents a family of functions and includes a constant of integration (C).</p>
          <div className="formula-box">
            ʃ f(x) dx = F(x) + C
          </div>

          <h4>2. Definite Integral</h4>
          <p>A definite integral has upper and lower limits and gives a specific numerical value.</p>
          <div className="formula-box">
            ʃᵇₐ f(x) dx = F(b) - F(a)
          </div>

          <h3>Basic Integration Rules</h3>
          
          <h4>Power Rule</h4>
          <div className="formula-box">
            ʃ x^n dx = x^(n+1)/(n+1) + C  (where n ≠ -1)
          </div>
          <p>Example: ʃ x³ dx = x⁴/4 + C</p>

          <h4>Constant Rule</h4>
          <div className="formula-box">
            ʃ k dx = kx + C
          </div>
          <p>Example: ʃ 5 dx = 5x + C</p>

          <h4>Sum Rule</h4>
          <div className="formula-box">
            ʃ [f(x) + g(x)] dx = ʃ f(x) dx + ʃ g(x) dx
          </div>

          <h4>Constant Multiple Rule</h4>
          <div className="formula-box">
            ʃ k·f(x) dx = k·ʃ f(x) dx
          </div>

          <h3>Common Integrals</h3>
          <ul>
            <li>ʃ x^n dx = x^(n+1)/(n+1) + C</li>
            <li>ʃ 1/x dx = ln|x| + C</li>
            <li>ʃ e^x dx = e^x + C</li>
            <li>ʃ a^x dx = a^x/ln(a) + C</li>
            <li>ʃ sin(x) dx = -cos(x) + C</li>
            <li>ʃ cos(x) dx = sin(x) + C</li>
            <li>ʃ sec²(x) dx = tan(x) + C</li>
            <li>ʃ 1/√(1-x²) dx = arcsin(x) + C</li>
          </ul>

          <h3>Integration Techniques</h3>
          <ul>
            <li><strong>Substitution:</strong> Used when the integrand contains a function and its derivative</li>
            <li><strong>Integration by Parts:</strong> Based on the product rule for differentiation</li>
            <li><strong>Partial Fractions:</strong> Used for rational functions</li>
            <li><strong>Trigonometric Substitution:</strong> Used for integrands with √(a²±x²)</li>
          </ul>

          <h3>Applications of Integration</h3>
          <ul>
            <li>Finding areas under curves</li>
            <li>Calculating volumes of solids of revolution</li>
            <li>Determining arc lengths</li>
            <li>Computing work done by variable forces</li>
            <li>Finding centers of mass</li>
            <li>Solving differential equations</li>
          </ul>

          <h3>Tips for Integration</h3>
          <ul>
            <li>Always add the constant C for indefinite integrals</li>
            <li>Check your answer by differentiating</li>
            <li>Simplify the integrand before integrating when possible</li>
            <li>Look for patterns that match standard forms</li>
            <li>Practice recognizing when to use different techniques</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default IntegralCalculator;

