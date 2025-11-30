import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const WeightedGradeCalculator = () => {
  const [categories, setCategories] = useState([
    { name: '', score: '', weight: '' }
  ]);
  const [result, setResult] = useState(null);

  const addCategory = () => {
    setCategories([...categories, { name: '', score: '', weight: '' }]);
  };

  const removeCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories.length > 0 ? newCategories : [{ name: '', score: '', weight: '' }]);
  };

  const updateCategory = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const calculateGrade = () => {
    const validCategories = categories.filter(c => 
      c.score !== '' && c.weight !== '' && !isNaN(parseFloat(c.score)) && !isNaN(parseFloat(c.weight))
    );

    if (validCategories.length === 0) {
      alert('Please enter at least one category');
      return;
    }

    let weightedSum = 0;
    let totalWeight = 0;

    validCategories.forEach(cat => {
      const score = parseFloat(cat.score);
      const weight = parseFloat(cat.weight);
      weightedSum += (score * weight);
      totalWeight += weight;
    });

    const finalGrade = weightedSum / totalWeight;

    setResult({
      finalGrade: finalGrade.toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      categories: validCategories.map(c => ({
        name: c.name || 'Unnamed',
        score: c.score,
        weight: c.weight,
        contribution: ((parseFloat(c.score) * parseFloat(c.weight)) / totalWeight).toFixed(2)
      }))
    });
  };

  const seoData = calculatorSEOData['weighted-grade-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Weighted Grade Calculator',
    seoData.description,
    'https://yourdomain.com/weighted-grade-calculator'
  );
  const faqs = generateCalculatorFAQs('Weighted Grade Calculator', 'education');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/weighted-grade-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <div className="page-header">
          <h1>Weighted Grade Calculator</h1>
          <p>Calculate final grades with different category weights</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Enter Grade Categories</h2>

            {categories.map((category, index) => (
              <div key={index} style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '2px solid #e5e7eb' }}>
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(index, 'name', e.target.value)}
                    placeholder="e.g., Exams, Homework, Participation"
                  />
                </div>

                <div className="input-grid">
                  <div className="form-group">
                    <label>Score (%)</label>
                    <input
                      type="number"
                      value={category.score}
                      onChange={(e) => updateCategory(index, 'score', e.target.value)}
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>Weight (%)</label>
                    <input
                      type="number"
                      value={category.weight}
                      onChange={(e) => updateCategory(index, 'weight', e.target.value)}
                      placeholder="e.g., 40"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {categories.length > 1 && (
                  <button onClick={() => removeCategory(index)} className="btn btn-secondary" style={{ marginTop: '10px', width: '100%' }}>
                    Remove Category
                  </button>
                )}
              </div>
            ))}

            <button onClick={addCategory} className="btn btn-secondary btn-block" style={{ marginBottom: '15px' }}>
              + Add Category
            </button>

            <button onClick={calculateGrade} className="btn btn-primary btn-block">
              Calculate Weighted Grade
            </button>

            {result && (
              <div className="result-container">
                <h3>Your Final Grade</h3>
                <div className="result-value">{result.finalGrade}%</div>
                
                <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Category Breakdown</h4>
                {result.categories.map((cat, index) => (
                  <div key={index} className="result-item">
                    <strong>{cat.name}:</strong> {cat.score}% × {cat.weight}% weight = {cat.contribution}% contribution
                  </div>
                ))}
                <div className="result-item">
                  <strong>Total Weight:</strong> {result.totalWeight}%
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="info-section" aria-label="About Weighted Grade Calculator">
          <h2>About Weighted Grade Calculator</h2>
          <p>
            A weighted grade calculator helps you calculate your final grade when different categories 
            (like tests, homework, projects) have different weights or importance in your final grade.
          </p>

          <h3>How to Calculate Weighted Grade</h3>
          <div className="formula-box">
            Weighted Grade = Σ(Score × Weight) / Σ(Weight)
          </div>

          <p><strong>Example:</strong></p>
          <ul>
            <li>Tests: 85% with 50% weight → 85 × 0.50 = 42.5</li>
            <li>Homework: 90% with 30% weight → 90 × 0.30 = 27</li>
            <li>Participation: 95% with 20% weight → 95 × 0.20 = 19</li>
          </ul>
          <p>Final Grade: (42.5 + 27 + 19) / (50 + 30 + 20) = 88.5%</p>

          <h3>Tips</h3>
          <ul>
            <li>Make sure your weights add up to 100% for accuracy</li>
            <li>Enter scores as percentages (0-100)</li>
            <li>Include all graded categories from your syllabus</li>
          </ul>
        </section>

        <FAQ calculatorName="Weighted Grade Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default WeightedGradeCalculator;

