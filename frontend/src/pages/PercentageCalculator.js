import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import FAQ from '../components/FAQ/FAQ';
import { generateFAQSchema } from '../utils/seoKeywords';
import { validateNumber, formatNumber, safeCalculate } from '../utils/validation';

const PercentageCalculator = () => {
  const [mode, setMode] = useState('basic');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FREE Percentage Calculator - Best Percent Calculator for Students",
    "description": "FREE, easy, and accurate percentage calculator for students, teachers, and professionals. Calculate percentages, increases, decreases instantly with step-by-step solutions.",
    "url": "https://yourdomain.com/percentage-calculator",
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

  // HowTo Schema for step-by-step solutions
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Percentages",
    "description": "Step-by-step guide to calculating percentages using our free calculator",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select calculation type",
        "text": "Choose what you want to calculate: percentage of a number, percentage increase, decrease, or reverse percentage"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Enter values",
        "text": "Enter the required numbers in the input fields"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Calculate",
        "text": "Click the Calculate button to get instant results with step-by-step solutions"
      }
    ]
  };

  const calculatePercentage = () => {
    // Reset states
    setError(null);
    setResult(null);
    setSteps([]);
    setLoading(true);

    // Validate inputs
    const validation1 = validateNumber(value1, { required: true, allowNegative: true });
    const validation2 = validateNumber(value2, { required: true, allowNegative: mode !== 'basic' });

    if (!validation1.valid) {
      setError(validation1.error);
      setLoading(false);
      return;
    }

    if (!validation2.valid) {
      setError(validation2.error);
      setLoading(false);
      return;
    }

    const num1 = validation1.value;
    const num2 = validation2.value;

    // Additional validation based on mode
    if (mode === 'reverse' && num2 === 0) {
      setError('Cannot divide by zero. The second number cannot be zero.');
      setLoading(false);
      return;
    }

    if ((mode === 'increase' || mode === 'decrease') && num1 === 0) {
      setError('Original value cannot be zero for percentage change calculations.');
      setLoading(false);
      return;
    }

    // Perform calculation with error handling
    const calculation = safeCalculate(() => {
      let calculatedResult = 0;
      let calculationSteps = [];

      switch(mode) {
        case 'basic':
          // What is X% of Y?
          calculatedResult = (num1 / 100) * num2;
          calculationSteps = [
            { 
              step: 1,
              description: 'Convert percentage to decimal', 
              formula: `${formatNumber(num1)}% = ${formatNumber(num1)} ÷ 100`,
              calculation: `${formatNumber(num1 / 100)}`,
              explanation: 'To convert a percentage to a decimal, divide by 100.'
            },
            { 
              step: 2,
              description: 'Multiply decimal by the number', 
              formula: `${formatNumber(num1 / 100)} × ${formatNumber(num2)}`,
              calculation: `${formatNumber(calculatedResult)}`,
              explanation: `Multiply the decimal form of the percentage by the number.`
            },
            { 
              step: 3,
              description: 'Final Result', 
              formula: `${formatNumber(num1)}% of ${formatNumber(num2)}`,
              calculation: `= ${formatNumber(calculatedResult)}`,
              explanation: `Therefore, ${formatNumber(num1)}% of ${formatNumber(num2)} equals ${formatNumber(calculatedResult)}.`
            }
          ];
          break;

        case 'reverse':
          // X is what % of Y?
          calculatedResult = (num1 / num2) * 100;
          calculationSteps = [
            { 
              step: 1,
              description: 'Divide the first number by the second', 
              formula: `${formatNumber(num1)} ÷ ${formatNumber(num2)}`,
              calculation: `= ${formatNumber(num1 / num2, 6)}`,
              explanation: 'Divide the part by the whole to get the decimal ratio.'
            },
            { 
              step: 2,
              description: 'Multiply by 100 to convert to percentage', 
              formula: `${formatNumber(num1 / num2, 6)} × 100`,
              calculation: `= ${formatNumber(calculatedResult)}%`,
              explanation: 'Multiply the decimal by 100 to express it as a percentage.'
            },
            { 
              step: 3,
              description: 'Final Result', 
              formula: `${formatNumber(num1)} is what percentage of ${formatNumber(num2)}?`,
              calculation: `= ${formatNumber(calculatedResult)}%`,
              explanation: `Therefore, ${formatNumber(num1)} is ${formatNumber(calculatedResult)}% of ${formatNumber(num2)}.`
            }
          ];
          break;

        case 'increase':
          // Percentage increase
          const increase = num2 - num1;
          calculatedResult = (increase / num1) * 100;
          calculationSteps = [
            { 
              step: 1,
              description: 'Calculate the increase', 
              formula: `New Value - Original Value`,
              calculation: `${formatNumber(num2)} - ${formatNumber(num1)} = ${formatNumber(increase)}`,
              explanation: 'Subtract the original value from the new value to find the increase.'
            },
            { 
              step: 2,
              description: 'Divide increase by original value', 
              formula: `Increase ÷ Original Value`,
              calculation: `${formatNumber(increase)} ÷ ${formatNumber(num1)} = ${formatNumber(increase / num1, 6)}`,
              explanation: 'Divide the increase by the original value to get the decimal ratio.'
            },
            { 
              step: 3,
              description: 'Multiply by 100 to get percentage', 
              formula: `Decimal Ratio × 100`,
              calculation: `${formatNumber(increase / num1, 6)} × 100 = ${formatNumber(calculatedResult)}%`,
              explanation: 'Multiply by 100 to express the increase as a percentage.'
            },
            { 
              step: 4,
              description: 'Final Result', 
              formula: `Percentage Increase from ${formatNumber(num1)} to ${formatNumber(num2)}`,
              calculation: `= ${formatNumber(calculatedResult)}%`,
              explanation: `The value increased by ${formatNumber(calculatedResult)}% from ${formatNumber(num1)} to ${formatNumber(num2)}.`
            }
          ];
          break;

        case 'decrease':
          // Percentage decrease
          const decrease = num1 - num2;
          calculatedResult = (decrease / num1) * 100;
          calculationSteps = [
            { 
              step: 1,
              description: 'Calculate the decrease', 
              formula: `Original Value - New Value`,
              calculation: `${formatNumber(num1)} - ${formatNumber(num2)} = ${formatNumber(decrease)}`,
              explanation: 'Subtract the new value from the original value to find the decrease.'
            },
            { 
              step: 2,
              description: 'Divide decrease by original value', 
              formula: `Decrease ÷ Original Value`,
              calculation: `${formatNumber(decrease)} ÷ ${formatNumber(num1)} = ${formatNumber(decrease / num1, 6)}`,
              explanation: 'Divide the decrease by the original value to get the decimal ratio.'
            },
            { 
              step: 3,
              description: 'Multiply by 100 to get percentage', 
              formula: `Decimal Ratio × 100`,
              calculation: `${formatNumber(decrease / num1, 6)} × 100 = ${formatNumber(calculatedResult)}%`,
              explanation: 'Multiply by 100 to express the decrease as a percentage.'
            },
            { 
              step: 4,
              description: 'Final Result', 
              formula: `Percentage Decrease from ${formatNumber(num1)} to ${formatNumber(num2)}`,
              calculation: `= ${formatNumber(calculatedResult)}%`,
              explanation: `The value decreased by ${formatNumber(calculatedResult)}% from ${formatNumber(num1)} to ${formatNumber(num2)}.`
            }
          ];
          break;

        default:
          throw new Error('Invalid calculation mode');
      }

      return { calculatedResult, calculationSteps };
    }, 'An error occurred during calculation. Please check your inputs and try again.');

    setLoading(false);

    if (!calculation.success) {
      setError(calculation.error);
      return;
    }

    const { calculatedResult, calculationSteps } = calculation.result;

    // Format result based on mode
    let resultText = '';
    switch(mode) {
      case 'basic':
        resultText = `${formatNumber(num1)}% of ${formatNumber(num2)} = ${formatNumber(calculatedResult)}`;
        break;
      case 'reverse':
        resultText = `${formatNumber(num1)} is ${formatNumber(calculatedResult)}% of ${formatNumber(num2)}`;
        break;
      case 'increase':
        resultText = `Percentage Increase: ${formatNumber(calculatedResult)}%`;
        break;
      case 'decrease':
        resultText = `Percentage Decrease: ${formatNumber(calculatedResult)}%`;
        break;
    }

    setResult(resultText);
    setSteps(calculationSteps);
  };

  const getModeLabels = () => {
    switch(mode) {
      case 'basic':
        return { label1: 'Percentage (%)', label2: 'Of Number', question: 'What is X% of Y?' };
      case 'reverse':
        return { label1: 'Number', label2: 'Out of Number', question: 'X is what % of Y?' };
      case 'increase':
        return { label1: 'Original Value', label2: 'New Value', question: 'Percentage Increase' };
      case 'decrease':
        return { label1: 'Original Value', label2: 'New Value', question: 'Percentage Decrease' };
      default:
        return { label1: 'Value 1', label2: 'Value 2', question: '' };
    }
  };

  const labels = getModeLabels();

  // FAQ data for schema
  const faqs = [
    {
      question: "What is a percentage calculator?",
      answer: "A percentage calculator is a FREE online tool that helps you calculate percentages quickly and accurately. It can find what percentage one number is of another, calculate percentage increases or decreases, and solve various percentage-related problems with step-by-step solutions."
    },
    {
      question: "Is this percentage calculator free to use?",
      answer: "Yes! Our percentage calculator is completely FREE to use. No signup, no registration, no hidden fees. You can calculate percentages, increases, decreases, and more instantly without any cost."
    },
    {
      question: "How accurate is this percentage calculator?",
      answer: "Our percentage calculator is highly accurate and uses advanced mathematical algorithms to ensure precise calculations. All results are calculated with proper decimal precision for reliable results."
    },
    {
      question: "Do I need to sign up to use this calculator?",
      answer: "No signup required! You can use our free percentage calculator immediately without creating an account. Just enter your values and get instant results with step-by-step solutions."
    },
    {
      question: "Can students use this calculator for homework?",
      answer: "Absolutely! Our percentage calculator is perfect for students. It's free, easy to use, and provides step-by-step solutions to help you understand how percentages are calculated. Great for homework, exams, and learning."
    },
    {
      question: "What types of percentage calculations can I do?",
      answer: "You can calculate: What is X% of Y, X is what % of Y, percentage increases, percentage decreases, and reverse percentages. All with detailed step-by-step solutions."
    },
    {
      question: "Is this the best percentage calculator online?",
      answer: "Yes! Our percentage calculator is one of the best free online calculators. It's fast, accurate, easy to use, and provides educational step-by-step solutions. Perfect for students, teachers, and professionals."
    },
    {
      question: "How do I calculate percentage increase?",
      answer: "To calculate percentage increase: Enter the original value and new value. The calculator will show you the percentage increase with step-by-step explanation: ((New Value - Original Value) / Original Value) × 100."
    },
    {
      question: "Can I use this calculator on mobile?",
      answer: "Yes! Our percentage calculator is fully responsive and works perfectly on all devices - desktop, tablet, and mobile phones. Use it anywhere, anytime for free."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title="FREE Percentage Calculator - Best, Easy & Accurate Percent Calculator for Students | Calculator Hub"
        description="FREE percentage calculator - Best, easy, and accurate online percent calculator for students, teachers & professionals. Calculate percentages, increases, decreases instantly with step-by-step solutions. No signup required!"
        keywords="free percentage calculator, best percentage calculator, easy percentage calculator, accurate percentage calculator, percentage calculator for students, percentage calculator for college, online percentage calculator, calculate percentage, percent calculator, percentage increase calculator, percentage decrease calculator, free online calculator, best calculator for students, easy calculator for homework, percentage calculator no signup, calculadora de porcentaje, calculatrice pourcentage"
        canonicalUrl="/percentage-calculator"
        structuredData={structuredData}
        lang="en"
        howToSchema={howToSchema}
        faqSchema={faqSchema}
        alternateLanguages={[
          { hreflang: 'es', href: '/es/calculadora-porcentaje' },
          { hreflang: 'fr', href: '/fr/calculatrice-pourcentage' },
          { hreflang: 'de', href: '/de/prozentrechner' },
          { hreflang: 'pt', href: '/pt/calculadora-porcentagem' },
          { hreflang: 'hi', href: '/hi/pratishat-kalkuleytar' },
          { hreflang: 'ar', href: '/ar/hasib-al-miat' },
          { hreflang: 'zh', href: '/zh/baifenbi-jisuanqi' },
          { hreflang: 'ja', href: '/ja/pasento-keisanki' }
        ]}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>FREE Percentage Calculator - Best Percent Calculator for Students & Professionals</h1>
          <p>Easy, accurate, and free online percentage calculator. Calculate percentages, increases, decreases instantly with step-by-step solutions. Perfect for students, teachers, and professionals.</p>
        </header>

        <section className="calculator-container" aria-label="Percentage Calculator">
          <article className="calculator-card">
            <h2>Calculate Percentage</h2>
            
            {error && (
              <div className="alert alert-error" role="alert" aria-live="polite">
                <strong>Error:</strong> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="calc-mode">Calculation Type</label>
              <select 
                id="calc-mode"
                value={mode} 
                onChange={(e) => {
                  setMode(e.target.value);
                  setResult(null);
                  setSteps([]);
                  setError(null);
                }}
                className="form-control"
                aria-label="Select calculation type"
              >
                <option value="basic">What is X% of Y?</option>
                <option value="reverse">X is what % of Y?</option>
                <option value="increase">Percentage Increase</option>
                <option value="decrease">Percentage Decrease</option>
              </select>
            </div>

            <div className="input-grid">
              <div className="form-group">
                <label htmlFor="value1">{labels.label1}</label>
                <input
                  id="value1"
                  type="number"
                  step="any"
                  value={value1}
                  onChange={(e) => {
                    setValue1(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter value"
                  aria-label={labels.label1}
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="value2">{labels.label2}</label>
                <input
                  id="value2"
                  type="number"
                  step="any"
                  value={value2}
                  onChange={(e) => {
                    setValue2(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter value"
                  aria-label={labels.label2}
                  aria-required="true"
                />
              </div>
            </div>

            <button 
              onClick={calculatePercentage} 
              className="btn btn-primary btn-block"
              disabled={loading}
              aria-label="Calculate percentage"
            >
              {loading ? <LoadingSpinner size="small" text="" /> : 'Calculate'}
            </button>

            {loading && <LoadingSpinner text="Calculating..." />}

            {result && !loading && (
              <div className="result-container" role="region" aria-live="polite" aria-label="Calculation result">
                <h3>Result</h3>
                <div className="result-value" aria-label="Result">{result}</div>
              </div>
            )}

            {steps.length > 0 && !loading && (
              <section className="steps-container" aria-label="Step-by-step solution">
                <h3>Step-by-Step Solution</h3>
                <ol className="steps-list" style={{ listStyle: 'none', padding: 0 }}>
                  {steps.map((step, index) => (
                    <li key={index} className="step">
                      <span className="step-number" aria-label={`Step ${step.step}`}>{step.step}</span>
                      <div className="step-content">
                        <strong>{step.description}:</strong>
                        <div className="step-formula">
                          <div className="step-formula-main">{step.formula}</div>
                          <div className="step-calculation">{step.calculation}</div>
                        </div>
                        {step.explanation && (
                          <div className="step-explanation" style={{ 
                            marginTop: '8px', 
                            fontSize: '0.9rem', 
                            color: '#6b7280',
                            fontStyle: 'italic'
                          }}>
                            {step.explanation}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About Percentage Calculator">
          <h2>About Percentage Calculator</h2>
          <p>
            A percentage calculator is an essential tool for calculating various percentage-related problems. 
            Whether you need to find what percentage one number is of another, calculate percentage increases 
            or decreases, our calculator provides accurate results instantly.
          </p>

          <h3>How to Calculate Percentages</h3>
          
          <h4>1. What is X% of Y?</h4>
          <div className="formula-box">
            Result = (X / 100) × Y
          </div>
          <p>Example: What is 25% of 80? → (25 / 100) × 80 = 20</p>

          <h4>2. X is what % of Y?</h4>
          <div className="formula-box">
            Percentage = (X / Y) × 100
          </div>
          <p>Example: 15 is what % of 60? → (15 / 60) × 100 = 25%</p>

          <h4>3. Percentage Increase</h4>
          <div className="formula-box">
            Percentage Increase = ((New Value - Original Value) / Original Value) × 100
          </div>
          <p>Example: Increase from 50 to 75 → ((75 - 50) / 50) × 100 = 50%</p>

          <h4>4. Percentage Decrease</h4>
          <div className="formula-box">
            Percentage Decrease = ((Original Value - New Value) / Original Value) × 100
          </div>
          <p>Example: Decrease from 100 to 80 → ((100 - 80) / 100) × 100 = 20%</p>

          <h3>Common Uses</h3>
          <ul>
            <li>Calculating discounts and sales prices</li>
            <li>Finding tax amounts</li>
            <li>Determining grade percentages</li>
            <li>Analyzing financial data and growth rates</li>
            <li>Computing tips and gratuities</li>
            <li>Measuring statistics and probabilities</li>
          </ul>

          <h3>Tips for Using Percentages</h3>
          <ul>
            <li>Remember that 100% represents the whole amount</li>
            <li>50% is always half of the number</li>
            <li>25% is one quarter (divide by 4)</li>
            <li>To find 10%, simply move the decimal point one place to the left</li>
            <li>Percentage changes are based on the original value</li>
          </ul>
        </section>

        <FAQ 
          calculatorName="Percentage Calculator"
          faqs={[
            {
              question: "Is this percentage calculator free to use?",
              answer: "Yes! Our percentage calculator is completely FREE to use. No signup, no registration, no hidden fees. You can calculate percentages, increases, decreases, and more instantly without any cost."
            },
            {
              question: "How accurate is this percentage calculator?",
              answer: "Our percentage calculator is highly accurate and uses advanced mathematical algorithms to ensure precise calculations. All results are calculated with proper decimal precision for reliable results."
            },
            {
              question: "Do I need to sign up to use this calculator?",
              answer: "No signup required! You can use our free percentage calculator immediately without creating an account. Just enter your values and get instant results with step-by-step solutions."
            },
            {
              question: "Can students use this calculator for homework?",
              answer: "Absolutely! Our percentage calculator is perfect for students. It's free, easy to use, and provides step-by-step solutions to help you understand how percentages are calculated. Great for homework, exams, and learning."
            },
            {
              question: "What types of percentage calculations can I do?",
              answer: "You can calculate: What is X% of Y, X is what % of Y, percentage increases, percentage decreases, and reverse percentages. All with detailed step-by-step solutions."
            },
            {
              question: "Is this the best percentage calculator online?",
              answer: "Yes! Our percentage calculator is one of the best free online calculators. It's fast, accurate, easy to use, and provides educational step-by-step solutions. Perfect for students, teachers, and professionals."
            },
            {
              question: "How do I calculate percentage increase?",
              answer: "To calculate percentage increase: Enter the original value and new value. The calculator will show you the percentage increase with step-by-step explanation: ((New Value - Original Value) / Original Value) × 100."
            },
            {
              question: "Can I use this calculator on mobile?",
              answer: "Yes! Our percentage calculator is fully responsive and works perfectly on all devices - desktop, tablet, and mobile phones. Use it anywhere, anytime for free."
            }
          ]}
        />
      </main>
    </ErrorBoundary>
  );
};

export default PercentageCalculator;

