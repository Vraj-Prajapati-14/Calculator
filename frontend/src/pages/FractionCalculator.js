import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const FractionCalculator = () => {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const simplify = (numerator, denominator) => {
    const divisor = gcd(numerator, denominator);
    return {
      num: numerator / divisor,
      den: denominator / divisor
    };
  };

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) {
      alert('Denominator cannot be zero');
      return;
    }

    let resultNum, resultDen;

    switch(operation) {
      case 'add':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'subtract':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'multiply':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case 'divide':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    const simplified = simplify(resultNum, resultDen);

    setResult({
      unsimplified: `${resultNum}/${resultDen}`,
      simplified: `${simplified.num}/${simplified.den}`,
      decimal: (simplified.num / simplified.den).toFixed(6),
      mixed: convertToMixed(simplified.num, simplified.den)
    });
  };

  const convertToMixed = (num, den) => {
    const whole = Math.floor(Math.abs(num) / Math.abs(den));
    const remainder = Math.abs(num) % Math.abs(den);
    const sign = (num < 0) !== (den < 0) ? '-' : '';
    
    if (whole === 0) return `${sign}${remainder}/${Math.abs(den)}`;
    if (remainder === 0) return `${sign}${whole}`;
    return `${sign}${whole} ${remainder}/${Math.abs(den)}`;
  };

  const seoData = calculatorSEOData['fraction-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Fraction Calculator',
    seoData.description,
    'https://yourdomain.com/fraction-calculator'
  );
  const faqs = generateCalculatorFAQs('Fraction Calculator', 'math');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/fraction-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Fraction Calculator">
          <article className="calculator-card">
            <h2>Calculate Fractions</h2>
            
            <div className="form-group">
              <label>Operation</label>
              <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="add">Addition (+)</option>
                <option value="subtract">Subtraction (−)</option>
                <option value="multiply">Multiplication (×)</option>
                <option value="divide">Division (÷)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>First Fraction</label>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Numerator"
                    style={{ marginBottom: '5px', textAlign: 'center' }}
                  />
                  <div style={{ width: '100%', height: '2px', background: '#1f2937', margin: '5px 0' }}></div>
                  <input
                    type="number"
                    value={den1}
                    onChange={(e) => setDen1(e.target.value)}
                    placeholder="Denominator"
                    style={{ marginTop: '5px', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {operation === 'add' && '+'}
                {operation === 'subtract' && '−'}
                {operation === 'multiply' && '×'}
                {operation === 'divide' && '÷'}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Second Fraction</label>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Numerator"
                    style={{ marginBottom: '5px', textAlign: 'center' }}
                  />
                  <div style={{ width: '100%', height: '2px', background: '#1f2937', margin: '5px 0' }}></div>
                  <input
                    type="number"
                    value={den2}
                    onChange={(e) => setDen2(e.target.value)}
                    placeholder="Denominator"
                    style={{ marginTop: '5px', textAlign: 'center' }}
                  />
                </div>
              </div>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
              Calculate
            </button>

            {result && (
              <div className="result-container">
                <h3>Result</h3>
                <div className="result-item"><strong>Unsimplified:</strong> {result.unsimplified}</div>
                <div className="result-item">
                  <strong>Simplified:</strong>
                  <div className="result-value">{result.simplified}</div>
                </div>
                <div className="result-item"><strong>Mixed Number:</strong> {result.mixed}</div>
                <div className="result-item"><strong>Decimal:</strong> {result.decimal}</div>
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Fraction Calculator">
          <h2>About Fractions</h2>
          <p>A fraction represents a part of a whole. It consists of a numerator (top number) and a denominator (bottom number).</p>
          
          <h3>Operations</h3>
          
          <h4>Addition/Subtraction</h4>
          <div className="formula-box">
            a/b ± c/d = (a×d ± c×b) / (b×d)
          </div>
          
          <h4>Multiplication</h4>
          <div className="formula-box">
            (a/b) × (c/d) = (a×c) / (b×d)
          </div>
          
          <h4>Division</h4>
          <div className="formula-box">
            (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d) / (b×c)
          </div>

          <h3>Simplifying Fractions</h3>
          <p>Divide both numerator and denominator by their GCD (Greatest Common Divisor).</p>
          <p>Example: 12/18 → GCD=6 → 2/3</p>
        </section>

        <FAQ calculatorName="Fraction Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default FractionCalculator;

