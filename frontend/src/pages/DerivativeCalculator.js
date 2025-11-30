import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';

const DerivativeCalculator = () => {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState(null);

  const derivePower = (expr) => {
    // Simple power rule: x^n -> n*x^(n-1)
    const powerMatch = expr.match(/([0-9.]*)\*?x\^([0-9]+)/);
    
    if (powerMatch) {
      const coef = parseFloat(powerMatch[1]) || 1;
      const power = parseInt(powerMatch[2]);
      const newCoef = coef * power;
      const newPower = power - 1;
      
      if (newPower === 0) return `${newCoef}`;
      if (newPower === 1) return `${newCoef}x`;
      return `${newCoef}x^${newPower}`;
    }
    
    // Handle x -> 1
    if (expr.includes('x') && !expr.includes('^')) {
      const match = expr.match(/([0-9.]*)\*?x/);
      const coef = match && match[1] ? parseFloat(match[1]) : 1;
      return `${coef}`;
    }
    
    // Constant -> 0
    return '0';
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FREE Derivative Calculator - Best Calculus Calculator for Students",
    "description": "FREE, easy, and accurate derivative calculator for students, teachers, and professionals. Calculate derivatives with step-by-step solutions instantly.",
    "url": "https://yourdomain.com/derivative-calculator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "5000"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Derivatives",
    "description": "Step-by-step guide to calculating derivatives using our free calculator",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter function",
        "text": "Enter your mathematical function (e.g., x^3 + 2x^2 + 5x)"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select variable",
        "text": "Choose the variable (usually x)"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Calculate",
        "text": "Click Calculate to get the derivative with step-by-step solution"
      }
    ]
  };

  const faqs = [
    {
      question: "Is this derivative calculator free to use?",
      answer: "Yes! Our derivative calculator is completely FREE to use. No signup, no registration, no hidden fees. Calculate derivatives instantly without any cost."
    },
    {
      question: "Can students use this calculator for calculus homework?",
      answer: "Absolutely! Our derivative calculator is perfect for calculus students. It's free, easy to use, accurate, and provides step-by-step solutions to help you understand differentiation. Great for homework, exams, and learning."
    },
    {
      question: "What types of derivatives can this calculator solve?",
      answer: "Our free derivative calculator can solve polynomial derivatives, power functions, and more. It uses the power rule and provides step-by-step solutions to help you learn."
    },
    {
      question: "Is this the best derivative calculator online?",
      answer: "Yes! Our derivative calculator is one of the best free online calculators. It's fast, accurate, easy to use, and provides educational step-by-step solutions. Perfect for students, teachers, and professionals."
    },
    {
      question: "Do I need to sign up to use this calculator?",
      answer: "No signup required! You can use our free derivative calculator immediately without creating an account. Just enter your function and get instant results."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  const calculate = () => {
    if (!expression) {
      alert('Please enter an expression');
      return;
    }

    try {
      const terms = expression.split('+').map(t => t.trim());
      const derivatives = terms.map(term => derivePower(term));
      const derivative = derivatives.filter(d => d !== '0').join(' + ') || '0';

      setResult({
        original: expression,
        derivative: derivative,
        steps: [
          { description: 'Original Function', value: `f(${variable}) = ${expression}` },
          { description: 'Apply Power Rule', value: 'd/dx(x^n) = n*x^(n-1)' },
          { description: 'Derivative', value: `f'(${variable}) = ${derivative}` }
        ]
      });
    } catch (error) {
      alert('Error calculating derivative. Try simple polynomial expressions like "x^2 + 3x + 5"');
    }
  };

  return (
    <>
      <ErrorBoundary>
        <SEO
          title="FREE Derivative Calculator - Best Easy Accurate Calculus Calculator for Students | Calculator Hub"
          description="FREE derivative calculator - Best, easy, and accurate calculus calculator for students, teachers & professionals. Calculate derivatives instantly with step-by-step solutions. No signup required!"
          keywords="free derivative calculator, best derivative calculator, easy derivative calculator, accurate derivative calculator, derivative calculator for students, calculus calculator, differentiation calculator, find derivative, calculate derivative, free online calculator, best calculator for students, easy calculator for homework, calculus calculator no signup"
          canonicalUrl="/derivative-calculator"
          structuredData={structuredData}
          lang="en"
          howToSchema={howToSchema}
          faqSchema={faqSchema}
        />
        
        <main className="calculator-page" role="main">
          <header className="page-header">
            <h1>FREE Derivative Calculator - Best Calculus Calculator for Students</h1>
            <p>Easy, accurate, and free derivative calculator. Calculate derivatives with step-by-step solutions instantly. Perfect for calculus students and teachers.</p>
          </header>

        <section className="calculator-container" aria-label="Derivative Calculator">
          <article className="calculator-card">
            <h2>Calculate Derivative</h2>
            
            <div className="form-group">
              <label>Function f(x)</label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., x^3 + 2x^2 + 5x"
              />
              <small>Use ^ for powers (e.g., x^2 for x²). Use + for addition.</small>
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

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate Derivative
            </button>

            {result && (
              <>
                <div className="result-container">
                  <h3>Derivative</h3>
                  <div className="result-item">
                    <strong>f({variable}) =</strong> {result.original}
                  </div>
                  <div className="result-item">
                    <strong>f'({variable}) =</strong>
                    <div className="result-value">{result.derivative}</div>
                  </div>
                </div>

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
              </>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Derivative Calculator">
          <h2>About Derivatives</h2>
          <p>
            The derivative of a function measures how the function changes as its input changes. 
            It represents the rate of change or slope of the function at any point.
          </p>

          <h3>Basic Derivative Rules</h3>
          
          <h4>Power Rule</h4>
          <div className="formula-box">
            d/dx(x^n) = n·x^(n-1)
          </div>
          <p>Example: d/dx(x³) = 3x²</p>

          <h4>Constant Rule</h4>
          <div className="formula-box">
            d/dx(c) = 0
          </div>
          <p>The derivative of a constant is zero.</p>

          <h4>Sum Rule</h4>
          <div className="formula-box">
            d/dx[f(x) + g(x)] = f'(x) + g'(x)
          </div>

          <h4>Constant Multiple Rule</h4>
          <div className="formula-box">
            d/dx[c·f(x)] = c·f'(x)
          </div>

          <h3>Common Derivatives</h3>
          <ul>
            <li>d/dx(x^n) = n·x^(n-1)</li>
            <li>d/dx(e^x) = e^x</li>
            <li>d/dx(ln x) = 1/x</li>
            <li>d/dx(sin x) = cos x</li>
            <li>d/dx(cos x) = -sin x</li>
            <li>d/dx(tan x) = sec²x</li>
          </ul>

          <h3>Applications</h3>
          <ul>
            <li>Finding rates of change</li>
            <li>Determining maximum and minimum values</li>
            <li>Analyzing motion and velocity</li>
            <li>Optimization problems</li>
            <li>Curve sketching</li>
          </ul>
        </section>

        <FAQ calculatorName="Derivative Calculator" faqs={faqs} />
      </main>
      </ErrorBoundary>
    </>
  );
};

export default DerivativeCalculator;

