import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const TrigonometryCalculator = () => {
  const [angle, setAngle] = useState('');
  const [unit, setUnit] = useState('degrees');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const angleValue = parseFloat(angle);
    
    if (isNaN(angleValue)) {
      alert('Please enter a valid angle');
      return;
    }

    const radians = unit === 'degrees' ? (angleValue * Math.PI) / 180 : angleValue;
    
    setResult({
      angle: angleValue,
      unit: unit,
      radians: radians.toFixed(6),
      sin: Math.sin(radians).toFixed(6),
      cos: Math.cos(radians).toFixed(6),
      tan: Math.tan(radians).toFixed(6),
      csc: (1 / Math.sin(radians)).toFixed(6),
      sec: (1 / Math.cos(radians)).toFixed(6),
      cot: (1 / Math.tan(radians)).toFixed(6)
    });
  };

  const seoData = calculatorSEOData['trigonometry-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Trigonometry Calculator',
    seoData.description,
    'https://yourdomain.com/trigonometry-calculator'
  );
  const faqs = generateCalculatorFAQs('Trigonometry Calculator', 'math');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/trigonometry-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Trigonometry Calculator">
          <article className="calculator-card">
            <h2>Calculate Trig Functions</h2>
            
            <div className="form-group">
              <label>Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="degrees">Degrees</option>
                <option value="radians">Radians</option>
              </select>
            </div>

            <div className="form-group">
              <label>Angle</label>
              <input
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                placeholder={unit === 'degrees' ? 'e.g., 45' : 'e.g., 0.785'}
                step="any"
              />
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate
            </button>

            {result && (
              <div className="result-container">
                <h3>Results</h3>
                <div className="result-item"><strong>Angle:</strong> {result.angle}° / {result.radians} rad</div>
                <div className="result-item"><strong>sin:</strong> {result.sin}</div>
                <div className="result-item"><strong>cos:</strong> {result.cos}</div>
                <div className="result-item"><strong>tan:</strong> {result.tan}</div>
                <div className="result-item"><strong>csc:</strong> {result.csc}</div>
                <div className="result-item"><strong>sec:</strong> {result.sec}</div>
                <div className="result-item"><strong>cot:</strong> {result.cot}</div>
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Trigonometry Calculator">
          <h2>About Trigonometry</h2>
          <p>Trigonometry studies relationships between angles and sides of triangles.</p>
          
          <h3>Basic Functions</h3>
          <ul>
            <li><strong>sin(θ):</strong> Opposite / Hypotenuse</li>
            <li><strong>cos(θ):</strong> Adjacent / Hypotenuse</li>
            <li><strong>tan(θ):</strong> Opposite / Adjacent = sin(θ) / cos(θ)</li>
          </ul>

          <h3>Reciprocal Functions</h3>
          <ul>
            <li><strong>csc(θ):</strong> 1 / sin(θ)</li>
            <li><strong>sec(θ):</strong> 1 / cos(θ)</li>
            <li><strong>cot(θ):</strong> 1 / tan(θ)</li>
          </ul>

          <h3>Common Angles</h3>
          <ul>
            <li>0°: sin=0, cos=1, tan=0</li>
            <li>30°: sin=0.5, cos=0.866, tan=0.577</li>
            <li>45°: sin=0.707, cos=0.707, tan=1</li>
            <li>60°: sin=0.866, cos=0.5, tan=1.732</li>
            <li>90°: sin=1, cos=0, tan=undefined</li>
          </ul>
        </section>

        <FAQ calculatorName="Trigonometry Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default TrigonometryCalculator;

