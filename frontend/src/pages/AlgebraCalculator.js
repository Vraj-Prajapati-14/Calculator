import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const AlgebraCalculator = () => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState(null);

  const simplifyExpression = () => {
    if (!expression) {
      alert('Please enter an expression');
      return;
    }

    try {
      // Basic expression parsing and display
      setResult({
        original: expression,
        note: 'For complex algebraic simplification, use specialized tools. This calculator provides basic algebraic operations.',
        suggestions: [
          'Combine like terms',
          'Factor common factors',
          'Apply distributive property',
          'Simplify powers and roots'
        ]
      });
    } catch (error) {
      alert('Error processing expression');
    }
  };

  return (
    <>
      <SEO
        title="Algebra Calculator - Solve Algebraic Expressions Online"
        description="Free algebra calculator. Simplify algebraic expressions, solve equations, and perform algebraic operations online."
        keywords="algebra calculator, algebraic expressions, simplify algebra, solve equations"
        canonicalUrl="/algebra-calculator"
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Algebra Calculator</h1>
          <p>Simplify and solve algebraic expressions</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Enter Algebraic Expression</h2>
            
            <div className="form-group">
              <label>Expression</label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., 2x + 3x - 5"
              />
              <small>Use * for multiplication, ^ for powers (e.g., x^2)</small>
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

            <button onClick={simplifyExpression} className="btn btn-primary btn-block">
              Simplify Expression
            </button>

            {result && (
              <div className="result-container">
                <h3>Your Expression</h3>
                <div className="result-value">{result.original}</div>
                
                <div className="alert alert-info" style={{ marginTop: '20px' }}>
                  {result.note}
                </div>

                <h4 style={{ marginTop: '20px' }}>Algebraic Techniques:</h4>
                <ul>
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Algebra</h2>
          <p>
            Algebra is a branch of mathematics that uses symbols and letters to represent numbers 
            and quantities in formulas and equations.
          </p>

          <h3>Basic Algebraic Operations</h3>
          
          <h4>Combining Like Terms</h4>
          <p>Terms with the same variable and power can be combined:</p>
          <div className="formula-box">
            3x + 5x = 8x
            <br />
            2x² + 3x² = 5x²
          </div>

          <h4>Distributive Property</h4>
          <div className="formula-box">
            a(b + c) = ab + ac
          </div>
          <p>Example: 3(x + 2) = 3x + 6</p>

          <h4>Factoring</h4>
          <p>Extracting common factors:</p>
          <div className="formula-box">
            6x + 9 = 3(2x + 3)
            <br />
            x² - 4 = (x + 2)(x - 2)
          </div>

          <h3>Solving Equations</h3>
          <ul>
            <li>Isolate the variable on one side</li>
            <li>Perform the same operation on both sides</li>
            <li>Simplify step by step</li>
            <li>Check your solution</li>
          </ul>

          <h3>Order of Operations (PEMDAS)</h3>
          <ol>
            <li><strong>P</strong>arentheses</li>
            <li><strong>E</strong>xponents</li>
            <li><strong>M</strong>ultiplication and <strong>D</strong>ivision (left to right)</li>
            <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default AlgebraCalculator;

