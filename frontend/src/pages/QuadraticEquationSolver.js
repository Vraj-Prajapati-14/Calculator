import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const QuadraticEquationSolver = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);

  const solve = () => {
    const coeffA = parseFloat(a);
    const coeffB = parseFloat(b);
    const coeffC = parseFloat(c);

    if (isNaN(coeffA) || isNaN(coeffB) || isNaN(coeffC)) {
      alert('Please enter valid numbers');
      return;
    }

    if (coeffA === 0) {
      alert('Coefficient a cannot be zero for quadratic equation');
      return;
    }

    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
    const steps = [];

    steps.push({
      description: 'Quadratic Formula',
      value: 'x = (-b ± √(b² - 4ac)) / (2a)'
    });

    steps.push({
      description: 'Calculate Discriminant (Δ)',
      value: `Δ = b² - 4ac = ${coeffB}² - 4(${coeffA})(${coeffC}) = ${discriminant}`
    });

    let solution = {};

    if (discriminant > 0) {
      const x1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      const x2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      
      steps.push({
        description: 'Two Real Solutions',
        value: `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`
      });

      solution = {
        type: 'two-real',
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        discriminant: discriminant
      };
    } else if (discriminant === 0) {
      const x = -coeffB / (2 * coeffA);
      
      steps.push({
        description: 'One Real Solution (Repeated Root)',
        value: `x = ${x.toFixed(4)}`
      });

      solution = {
        type: 'one-real',
        x: x.toFixed(4),
        discriminant: discriminant
      };
    } else {
      const realPart = (-coeffB / (2 * coeffA)).toFixed(4);
      const imagPart = (Math.sqrt(Math.abs(discriminant)) / (2 * coeffA)).toFixed(4);
      
      steps.push({
        description: 'Two Complex Solutions',
        value: `x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`
      });

      solution = {
        type: 'complex',
        realPart: realPart,
        imagPart: imagPart,
        discriminant: discriminant
      };
    }

    setResult({ ...solution, steps });
  };

  return (
    <>
      <SEO
        title="Quadratic Equation Solver - Solve Quadratic Equations Online"
        description="Free quadratic equation solver. Solve equations of the form ax² + bx + c = 0 with step-by-step solutions using the quadratic formula."
        keywords="quadratic equation solver, quadratic formula, solve quadratic, algebra calculator"
        canonicalUrl="/quadratic-equation-solver"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Quadratic Equation Solver</h1>
          <p>Solve quadratic equations using the quadratic formula</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Solve Quadratic Equation</h2>
            
            <p style={{ textAlign: 'center', fontSize: '1.3rem', margin: '20px 0', padding: '15px', background: '#f3f4f6', borderRadius: '8px' }}>
              <strong>ax² + bx + c = 0</strong>
            </p>

            <div className="input-grid">
              <div className="form-group">
                <label>Coefficient a</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  placeholder="e.g., 1"
                />
              </div>

              <div className="form-group">
                <label>Coefficient b</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  placeholder="e.g., -5"
                />
              </div>

              <div className="form-group">
                <label>Constant c</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="e.g., 6"
                />
              </div>
            </div>

            <button onClick={solve} className="btn btn-primary btn-block">
              Solve Equation
            </button>

            {result && (
              <>
                <div className="result-container">
                  <h3>Solution</h3>
                  {result.type === 'two-real' && (
                    <>
                      <div className="result-value">x₁ = {result.x1}</div>
                      <div className="result-value">x₂ = {result.x2}</div>
                      <p style={{ marginTop: '10px', color: '#059669' }}>Two distinct real solutions</p>
                    </>
                  )}
                  {result.type === 'one-real' && (
                    <>
                      <div className="result-value">x = {result.x}</div>
                      <p style={{ marginTop: '10px', color: '#3b82f6' }}>One repeated real solution</p>
                    </>
                  )}
                  {result.type === 'complex' && (
                    <>
                      <div className="result-value">x₁ = {result.realPart} + {result.imagPart}i</div>
                      <div className="result-value">x₂ = {result.realPart} - {result.imagPart}i</div>
                      <p style={{ marginTop: '10px', color: '#8b5cf6' }}>Two complex solutions</p>
                    </>
                  )}
                </div>

                {result.steps && (
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
                )}
              </>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Quadratic Equations</h2>
          <p>
            A quadratic equation is a second-order polynomial equation in a single variable. 
            The standard form is ax² + bx + c = 0, where a ≠ 0.
          </p>

          <h3>Quadratic Formula</h3>
          <div className="formula-box">
            x = (-b ± √(b² - 4ac)) / (2a)
          </div>

          <h3>Discriminant</h3>
          <p>The discriminant (Δ = b² - 4ac) determines the nature of roots:</p>
          <ul>
            <li><strong>Δ &gt; 0:</strong> Two distinct real roots</li>
            <li><strong>Δ = 0:</strong> One repeated real root</li>
            <li><strong>Δ &lt; 0:</strong> Two complex (imaginary) roots</li>
          </ul>

          <h3>Example</h3>
          <p>Solve: x² - 5x + 6 = 0</p>
          <ul>
            <li>a = 1, b = -5, c = 6</li>
            <li>Δ = (-5)² - 4(1)(6) = 25 - 24 = 1</li>
            <li>x = (5 ± 1) / 2</li>
            <li>x₁ = 3, x₂ = 2</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default QuadraticEquationSolver;

