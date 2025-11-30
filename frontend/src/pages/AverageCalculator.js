import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numArray.length === 0) {
      alert('Please enter valid numbers');
      return;
    }

    // Sort for median calculation
    const sorted = [...numArray].sort((a, b) => a - b);
    
    // Mean
    const sum = numArray.reduce((acc, val) => acc + val, 0);
    const mean = sum / numArray.length;

    // Median
    let median;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const frequency = {};
    let maxFreq = 0;
    numArray.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      maxFreq = Math.max(maxFreq, frequency[num]);
    });
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number);

    // Range
    const range = Math.max(...numArray) - Math.min(...numArray);

    setResult({
      count: numArray.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: maxFreq > 1 ? modes.join(', ') : 'No mode',
      range: range.toFixed(2),
      min: Math.min(...numArray),
      max: Math.max(...numArray)
    });
  };

  const seoData = calculatorSEOData['average-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Average Calculator',
    seoData.description,
    'https://yourdomain.com/average-calculator'
  );
  const faqs = generateCalculatorFAQs('Average Calculator', 'statistics');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/average-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Average Calculator">
          <article className="calculator-card">
            <h2>Calculate Average</h2>
            
            <div className="form-group">
              <label>Enter Numbers (separated by commas)</label>
              <textarea
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="e.g., 10, 20, 30, 40, 50"
                rows="4"
              />
              <small>Enter numbers separated by commas</small>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate
            </button>

            {result && (
              <div className="result-container">
                <h3>Results</h3>
                <div className="result-item">
                  <strong>Count:</strong> {result.count} numbers
                </div>
                <div className="result-item">
                  <strong>Sum:</strong> {result.sum}
                </div>
                <div className="result-item">
                  <strong>Mean (Average):</strong>
                  <div className="result-value">{result.mean}</div>
                </div>
                <div className="result-item">
                  <strong>Median:</strong> {result.median}
                </div>
                <div className="result-item">
                  <strong>Mode:</strong> {result.mode}
                </div>
                <div className="result-item">
                  <strong>Range:</strong> {result.range}
                </div>
                <div className="result-item">
                  <strong>Minimum:</strong> {result.min}
                </div>
                <div className="result-item">
                  <strong>Maximum:</strong> {result.max}
                </div>
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Average Calculator">
          <h2>About Average Calculator</h2>
          <p>
            An average calculator computes various statistical measures including mean, median, mode, 
            and range. These measures help you understand the central tendency and spread of your data.
          </p>

          <h3>Types of Averages</h3>
          
          <h4>Mean (Arithmetic Average)</h4>
          <div className="formula-box">
            Mean = Sum of all values / Count of values
          </div>
          <p>The mean is the most common type of average, calculated by adding all numbers and dividing by the count.</p>

          <h4>Median</h4>
          <p>The median is the middle value when numbers are arranged in order. If there's an even count, it's the average of the two middle numbers.</p>

          <h4>Mode</h4>
          <p>The mode is the value that appears most frequently in the dataset. There can be no mode, one mode, or multiple modes.</p>

          <h4>Range</h4>
          <div className="formula-box">
            Range = Maximum value - Minimum value
          </div>
          <p>The range shows the spread of the data from lowest to highest value.</p>

          <h3>When to Use Each Average</h3>
          <ul>
            <li><strong>Mean:</strong> Best for normally distributed data without outliers</li>
            <li><strong>Median:</strong> Better when data has outliers or is skewed</li>
            <li><strong>Mode:</strong> Useful for categorical data or finding most common values</li>
          </ul>
        </section>

        <FAQ calculatorName="Average Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default AverageCalculator;

