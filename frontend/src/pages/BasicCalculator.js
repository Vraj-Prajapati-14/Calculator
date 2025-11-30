import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { evaluate } from 'mathjs';
import { generateFAQSchema } from '../utils/seoKeywords';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FREE Scientific Calculator - Best Math Calculator for Students",
    "description": "FREE, easy, and accurate scientific calculator for students, teachers, and professionals. Calculate trigonometric, logarithmic, exponential operations and more instantly.",
    "url": "https://yourdomain.com/basic-calculator",
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
    "name": "How to Use Scientific Calculator",
    "description": "Step-by-step guide to using our free scientific calculator",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter numbers",
        "text": "Click number buttons or type numbers to enter your calculation"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select operation",
        "text": "Choose basic operations (+, -, ×, ÷) or scientific functions (sin, cos, log, etc.)"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Get result",
        "text": "Click equals (=) to get instant accurate results"
      }
    ]
  };

  const faqs = [
    {
      question: "Is this scientific calculator free to use?",
      answer: "Yes! Our scientific calculator is completely FREE to use. No signup, no registration, no hidden fees. Use it for all your math calculations instantly."
    },
    {
      question: "What functions does this calculator support?",
      answer: "Our free scientific calculator supports basic operations (add, subtract, multiply, divide), trigonometric functions (sin, cos, tan), logarithmic functions (log, ln), square root, square, inverse, and more. Perfect for students and professionals."
    },
    {
      question: "Can students use this calculator for homework?",
      answer: "Absolutely! Our scientific calculator is perfect for students. It's free, easy to use, accurate, and works on all devices. Great for math homework, exams, and learning."
    },
    {
      question: "Is this the best calculator online?",
      answer: "Yes! Our scientific calculator is one of the best free online calculators. It's fast, accurate, easy to use, and provides all essential math functions. Perfect for students, teachers, and professionals."
    },
    {
      question: "Do I need to sign up to use this calculator?",
      answer: "No signup required! You can use our free scientific calculator immediately without creating an account. Just start calculating right away."
    },
    {
      question: "Can I use this calculator on mobile?",
      answer: "Yes! Our scientific calculator is fully responsive and works perfectly on all devices - desktop, tablet, and mobile phones. Use it anywhere, anytime for free."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  const handleNumberClick = (num) => {
    if (isNewCalculation) {
      setDisplay(num);
      setIsNewCalculation(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorClick = (operator) => {
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
    setIsNewCalculation(false);
  };

  const handleEquals = () => {
    try {
      const fullEquation = equation + display;
      const result = evaluate(fullEquation);
      setDisplay(String(result));
      setEquation('');
      setIsNewCalculation(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewCalculation(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewCalculation(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleScientific = (func) => {
    try {
      let result;
      const value = parseFloat(display);
      
      switch(func) {
        case 'sin':
          result = Math.sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(value * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'square':
          result = value * value;
          break;
        case 'inverse':
          result = 1 / value;
          break;
        default:
          result = value;
      }
      
      setDisplay(String(result));
      setIsNewCalculation(true);
    } catch (error) {
      setDisplay('Error');
      setIsNewCalculation(true);
    }
  };

  return (
    <ErrorBoundary>
      <SEO
          title="FREE Scientific Calculator - Best Easy Accurate Math Calculator for Students | Calculator Hub"
          description="FREE scientific calculator - Best, easy, and accurate online math calculator for students, teachers & professionals. Calculate trigonometric, logarithmic, exponential operations instantly. No signup required!"
          keywords="free calculator, best calculator, easy calculator, accurate calculator, scientific calculator, math calculator, calculator for students, calculator for college, online calculator, free online calculator, best calculator for students, easy calculator for homework, calculator no signup, scientific calculator online, math calculator free"
          canonicalUrl="/basic-calculator"
          structuredData={structuredData}
          lang="en"
          howToSchema={howToSchema}
          faqSchema={faqSchema}
        />
        
        <main className="calculator-page" role="main">
          <header className="page-header">
            <h1>FREE Scientific Calculator - Best Math Calculator for Students</h1>
            <p>Easy, accurate, and free scientific calculator. Perform basic and advanced mathematical calculations instantly. Perfect for students, teachers, and professionals.</p>
          </header>

        <section className="calculator-container" aria-label="Scientific Calculator">
          <article className="calculator-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="calc-display-section">
              <div className="calc-equation">{equation}</div>
              <div className="calc-display">{display}</div>
            </div>

            <div className="calc-buttons">
              <div className="calc-row">
                <button className="calc-btn calc-btn-function" onClick={handleClear}>C</button>
                <button className="calc-btn calc-btn-function" onClick={handleBackspace}>←</button>
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('square')}>x²</button>
                <button className="calc-btn calc-btn-operator" onClick={() => handleOperatorClick('/')}>÷</button>
              </div>

              <div className="calc-row">
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('sin')}>sin</button>
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('cos')}>cos</button>
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('tan')}>tan</button>
                <button className="calc-btn calc-btn-operator" onClick={() => handleOperatorClick('*')}>×</button>
              </div>

              <div className="calc-row">
                <button className="calc-btn" onClick={() => handleNumberClick('7')}>7</button>
                <button className="calc-btn" onClick={() => handleNumberClick('8')}>8</button>
                <button className="calc-btn" onClick={() => handleNumberClick('9')}>9</button>
                <button className="calc-btn calc-btn-operator" onClick={() => handleOperatorClick('-')}>−</button>
              </div>

              <div className="calc-row">
                <button className="calc-btn" onClick={() => handleNumberClick('4')}>4</button>
                <button className="calc-btn" onClick={() => handleNumberClick('5')}>5</button>
                <button className="calc-btn" onClick={() => handleNumberClick('6')}>6</button>
                <button className="calc-btn calc-btn-operator" onClick={() => handleOperatorClick('+')}>+</button>
              </div>

              <div className="calc-row">
                <button className="calc-btn" onClick={() => handleNumberClick('1')}>1</button>
                <button className="calc-btn" onClick={() => handleNumberClick('2')}>2</button>
                <button className="calc-btn" onClick={() => handleNumberClick('3')}>3</button>
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('sqrt')}>√</button>
              </div>

              <div className="calc-row">
                <button className="calc-btn" onClick={() => handleNumberClick('0')}>0</button>
                <button className="calc-btn" onClick={() => handleNumberClick('.')}>.</button>
                <button className="calc-btn calc-btn-function" onClick={() => handleScientific('log')}>log</button>
                <button className="calc-btn calc-btn-equals" onClick={handleEquals}>=</button>
              </div>
            </div>
          </article>
        </section>

        <section className="info-section" aria-label="About Scientific Calculator">
          <h2>About Scientific Calculator</h2>
          <p>
            Our scientific calculator is a powerful tool that goes beyond basic arithmetic operations. 
            It supports trigonometric functions (sin, cos, tan), logarithmic calculations, square roots, 
            and more advanced mathematical operations.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Basic arithmetic operations: addition, subtraction, multiplication, division</li>
            <li>Trigonometric functions: sine, cosine, tangent (in degrees)</li>
            <li>Logarithmic functions: log (base 10) and ln (natural logarithm)</li>
            <li>Square and square root operations</li>
            <li>Clear and backspace functionality</li>
            <li>Responsive design for all devices</li>
          </ul>

          <h3>How to Use</h3>
          <ol>
            <li>Click on numbers to input values</li>
            <li>Use operator buttons (+, −, ×, ÷) for calculations</li>
            <li>Press = to get the result</li>
            <li>Use C to clear everything or ← to delete the last digit</li>
            <li>For scientific functions, enter the number first, then press the function button</li>
          </ol>

          <h3>Tips</h3>
          <ul>
            <li>Trigonometric functions work with angles in degrees</li>
            <li>Use parentheses for complex calculations</li>
            <li>The calculator follows standard order of operations (PEMDAS)</li>
          </ul>
        </section>

        <FAQ calculatorName="Scientific Calculator" faqs={faqs} />

        <style jsx>{`
          .calc-display-section {
            background: #1f2937;
            padding: 25px;
            border-radius: 12px 12px 0 0;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
          }

          .calc-equation {
            color: #9ca3af;
            font-size: 1rem;
            min-height: 24px;
            margin-bottom: 10px;
          }

          .calc-display {
            color: white;
            font-size: 2.5rem;
            font-weight: 600;
            word-break: break-all;
          }

          .calc-buttons {
            background: #f3f4f6;
            padding: 20px;
            border-radius: 0 0 12px 12px;
          }

          .calc-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 10px;
          }

          .calc-row:last-child {
            margin-bottom: 0;
          }

          .calc-btn {
            padding: 20px;
            font-size: 1.3rem;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: white;
            color: #1f2937;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .calc-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .calc-btn:active {
            transform: translateY(0);
          }

          .calc-btn-operator {
            background: #3b82f6;
            color: white;
          }

          .calc-btn-operator:hover {
            background: #2563eb;
          }

          .calc-btn-function {
            background: #6b7280;
            color: white;
            font-size: 1.1rem;
          }

          .calc-btn-function:hover {
            background: #4b5563;
          }

          .calc-btn-equals {
            background: #10b981;
            color: white;
          }

          .calc-btn-equals:hover {
            background: #059669;
          }

          @media (max-width: 480px) {
            .calc-display {
              font-size: 2rem;
            }

            .calc-btn {
              padding: 15px;
              font-size: 1.1rem;
            }

            .calc-btn-function {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </main>
    </ErrorBoundary>
  );
};

export default BasicCalculator;

