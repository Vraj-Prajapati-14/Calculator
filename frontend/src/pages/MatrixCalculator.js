import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const MatrixCalculator = () => {
  const [rows] = useState(2);
  const [cols] = useState(2);
  const [matrixA, setMatrixA] = useState([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const updateMatrix = (matrix, setMatrix, row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const calculate = () => {
    let resultMatrix = [];
    
    if (operation === 'add') {
      resultMatrix = matrixA.map((row, i) => 
        row.map((val, j) => val + matrixB[i][j])
      );
    } else if (operation === 'subtract') {
      resultMatrix = matrixA.map((row, i) => 
        row.map((val, j) => val - matrixB[i][j])
      );
    } else if (operation === 'multiply') {
      resultMatrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          for (let k = 0; k < cols; k++) {
            resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }
    }

    setResult(resultMatrix);
  };

  const seoData = calculatorSEOData['matrix-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'Matrix Calculator',
    seoData.description,
    'https://yourdomain.com/matrix-calculator'
  );
  const faqs = generateCalculatorFAQs('Matrix Calculator', 'math');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/matrix-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>{seoData.h1}</h1>
          <p>{seoData.subtitle}</p>
        </header>

        <section className="calculator-container" aria-label="Matrix Calculator">
          <article className="calculator-card">
            <h2>Matrix Operations</h2>
            
            <div className="form-group">
              <label>Operation</label>
              <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="add">Addition (A + B)</option>
                <option value="subtract">Subtraction (A - B)</option>
                <option value="multiply">Multiplication (A × B)</option>
              </select>
            </div>

            <div className="alert alert-info">
              For simplicity, this calculator supports 2x2 matrices. Enter your matrix values below.
            </div>

            <h3>Matrix A</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {matrixA.map((row, i) => 
                row.map((val, j) => (
                  <input
                    key={`a-${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateMatrix(matrixA, setMatrixA, i, j, e.target.value)}
                    style={{ padding: '10px', fontSize: '1rem' }}
                  />
                ))
              )}
            </div>

            <h3>Matrix B</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {matrixB.map((row, i) => 
                row.map((val, j) => (
                  <input
                    key={`b-${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateMatrix(matrixB, setMatrixB, i, j, e.target.value)}
                    style={{ padding: '10px', fontSize: '1rem' }}
                  />
                ))
              )}
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate
            </button>

            {result && (
              <div className="result-container">
                <h3>Result</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {result.map((row, i) => 
                    row.map((val, j) => (
                      <div key={`r-${i}-${j}`} style={{ padding: '15px', background: '#f3f4f6', borderRadius: '6px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {val.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Matrix Calculator">
          <h2>About Matrix Calculator</h2>
          <p>
            A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are 
            fundamental in linear algebra and have applications in physics, engineering, computer graphics, 
            and data science.
          </p>

          <h3>Matrix Operations</h3>
          <ul>
            <li><strong>Addition:</strong> Add corresponding elements</li>
            <li><strong>Subtraction:</strong> Subtract corresponding elements</li>
            <li><strong>Multiplication:</strong> Row by column multiplication</li>
          </ul>
        </section>

        <FAQ calculatorName="Matrix Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default MatrixCalculator;

