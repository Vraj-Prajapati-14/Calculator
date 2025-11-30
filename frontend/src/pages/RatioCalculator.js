import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const RatioCalculator = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
      alert('Please enter valid numbers');
      return;
    }

    const divisor = gcd(Math.abs(num1), Math.abs(num2));
    const simplified1 = num1 / divisor;
    const simplified2 = num2 / divisor;

    setResult({
      original: `${num1}:${num2}`,
      simplified: `${simplified1}:${simplified2}`,
      decimal: (num1 / num2).toFixed(4),
      percentage: ((num1 / num2) * 100).toFixed(2) + '%'
    });
  };

  const seoData = calculatorSEOData['ratio-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Ratio Calculator',
    seoData.description,
    'https://yourdomain.com/ratio-calculator'
  );
  const faqs = generateCalculatorFAQs('Ratio Calculator', 'math');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/ratio-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Ratio Calculator">
          <article className="calculator-card">
            <h2>Calculate Ratio</h2>
            
            <div className="input-grid">
              <div className="form-group">
                <label>First Value</label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="Enter first value"
                />
              </div>

              <div className="form-group">
                <label>Second Value</label>
                <input
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder="Enter second value"
                />
              </div>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate Ratio
            </button>

            {result && (
              <div className="result-container">
                <h3>Results</h3>
                <div className="result-item">
                  <strong>Original Ratio:</strong> {result.original}
                </div>
                <div className="result-item">
                  <strong>Simplified Ratio:</strong>
                  <div className="result-value">{result.simplified}</div>
                </div>
                <div className="result-item">
                  <strong>As Decimal:</strong> {result.decimal}
                </div>
                <div className="result-item">
                  <strong>As Percentage:</strong> {result.percentage}
                </div>
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Ratio Calculator">
          <h2>About Ratio Calculator</h2>
          <p>
            A ratio shows the relative sizes of two or more values. Ratios can be simplified by dividing 
            both numbers by their greatest common divisor (GCD).
          </p>

          <h3>How to Simplify Ratios</h3>
          <div className="formula-box">
            Simplified Ratio = (Value1 ÷ GCD) : (Value2 ÷ GCD)
          </div>
          <p>Example: 12:16 → GCD is 4 → 12÷4:16÷4 = 3:4</p>

          <h3>Applications</h3>
          <ul>
            <li>Cooking and recipes</li>
            <li>Map scales</li>
            <li>Financial ratios</li>
            <li>Mixing solutions</li>
          </ul>
        </section>

        <FAQ calculatorName="Ratio Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default RatioCalculator;

