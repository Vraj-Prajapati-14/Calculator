import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

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

  const seoData = calculatorSEOData['permutation-combination-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Permutation & Combination Calculator',
    seoData.description,
    'https://yourdomain.com/permutation-combination-calculator'
  );
  const faqs = generateCalculatorFAQs('Permutation & Combination Calculator', 'math');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/permutation-combination-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Permutation & Combination Calculator">
          <article className="calculator-card">
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
          </article>
        </section>

        <section className="info-section" aria-label="About Permutation & Combination Calculator">
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
        </section>

        <FAQ calculatorName="Permutation & Combination Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default PermutationCombinationCalculator;

