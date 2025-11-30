import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const LCMCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LCM Calculator - Least Common Multiple & HCF Calculator",
    "description": "Free LCM and HCF calculator. Find the Least Common Multiple and Highest Common Factor of numbers with step-by-step solutions.",
    "url": "https://yourdomain.com/lcm-calculator"
  };

  const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const findGCD = (numbers) => {
    return numbers.reduce((a, b) => gcd(a, b));
  };

  const findLCM = (numbers) => {
    return numbers.reduce((a, b) => lcm(a, b));
  };

  const primeFactorization = (num) => {
    const factors = [];
    let n = num;
    
    for (let i = 2; i <= n; i++) {
      while (n % i === 0) {
        factors.push(i);
        n = n / i;
      }
    }
    
    return factors;
  };

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
    
    if (numArray.length < 2) {
      alert('Please enter at least 2 positive numbers separated by commas');
      return;
    }

    const calculatedLCM = findLCM(numArray);
    const calculatedGCD = findGCD(numArray);

    const calculationSteps = [];
    
    // Add prime factorization for each number
    calculationSteps.push({
      description: 'Prime Factorization of each number',
      value: numArray.map(n => `${n} = ${primeFactorization(n).join(' × ')}`).join('\n')
    });

    // GCD calculation
    calculationSteps.push({
      description: 'Greatest Common Divisor (GCD/HCF)',
      value: `The GCD is the product of common prime factors with lowest powers`
    });

    calculationSteps.push({
      description: 'GCD Result',
      value: `GCD(${numArray.join(', ')}) = ${calculatedGCD}`
    });

    // LCM calculation
    calculationSteps.push({
      description: 'Least Common Multiple (LCM)',
      value: `The LCM is the product of all prime factors with highest powers`
    });

    calculationSteps.push({
      description: 'Alternative LCM Formula',
      value: `For two numbers: LCM(a,b) = (a × b) / GCD(a,b)`
    });

    calculationSteps.push({
      description: 'LCM Result',
      value: `LCM(${numArray.join(', ')}) = ${calculatedLCM}`
    });

    setResult({
      numbers: numArray,
      lcm: calculatedLCM,
      gcd: calculatedGCD,
      primeFactors: numArray.map(n => ({
        number: n,
        factors: primeFactorization(n)
      }))
    });

    setSteps(calculationSteps);
  };

  return (
    <>
      <SEO
        title="LCM Calculator - Calculate LCM and HCF/GCD Online"
        description="Free LCM and HCF calculator. Find the Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of numbers with step-by-step solutions."
        keywords="LCM calculator, HCF calculator, GCD calculator, least common multiple, highest common factor, greatest common divisor"
        canonicalUrl="/lcm-calculator"
        structuredData={structuredData}
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>LCM & HCF Calculator</h1>
          <p>Calculate Least Common Multiple and Highest Common Factor</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Calculate LCM and HCF</h2>
            
            <div className="form-group">
              <label>Enter Numbers (separated by commas)</label>
              <input
                type="text"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="e.g., 12, 18, 24"
              />
              <small>Enter at least 2 positive integers separated by commas</small>
            </div>

            <button onClick={calculate} className="btn btn-primary btn-block">
              Calculate LCM & HCF
            </button>

            {result && (
              <div className="result-container">
                <h3>Results for: {result.numbers.join(', ')}</h3>
                
                <div className="result-item">
                  <strong>LCM (Least Common Multiple):</strong>
                  <div className="result-value">{result.lcm}</div>
                </div>

                <div className="result-item">
                  <strong>HCF/GCD (Highest Common Factor):</strong>
                  <div className="result-value">{result.gcd}</div>
                </div>

                <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Prime Factorization</h4>
                {result.primeFactors.map((item, index) => (
                  <div key={index} className="result-item">
                    <strong>{item.number}:</strong> {item.factors.join(' × ')}
                  </div>
                ))}
              </div>
            )}

            {steps.length > 0 && (
              <div className="steps-container">
                <h3>Step-by-Step Solution</h3>
                {steps.map((step, index) => (
                  <div key={index} className="step">
                    <span className="step-number">{index + 1}</span>
                    <div className="step-content">
                      <strong>{step.description}:</strong>
                      <span className="step-formula" style={{ whiteSpace: 'pre-line' }}>{step.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About LCM and HCF</h2>
          
          <h3>What is LCM (Least Common Multiple)?</h3>
          <p>
            The Least Common Multiple (LCM) of two or more integers is the smallest positive integer 
            that is divisible by all the given numbers. It's useful for adding fractions, finding common 
            denominators, and solving real-world problems involving cycles and patterns.
          </p>

          <h3>What is HCF/GCD (Highest Common Factor)?</h3>
          <p>
            The Highest Common Factor (HCF), also called Greatest Common Divisor (GCD), is the largest 
            positive integer that divides all the given numbers without leaving a remainder. It's used 
            for simplifying fractions and solving divisibility problems.
          </p>

          <h3>Methods to Find LCM</h3>
          
          <h4>1. Prime Factorization Method</h4>
          <p>Find prime factors of each number and take the product of all prime factors with their highest powers.</p>
          <div className="formula-box">
            Example: LCM(12, 18)
            12 = 2² × 3
            18 = 2 × 3²
            LCM = 2² × 3² = 4 × 9 = 36
          </div>

          <h4>2. Using GCD Formula</h4>
          <div className="formula-box">
            LCM(a, b) = (a × b) / GCD(a, b)
          </div>
          <p>Example: LCM(12, 18) = (12 × 18) / 6 = 216 / 6 = 36</p>

          <h4>3. Division Method</h4>
          <p>Divide the numbers by common prime factors until no common factors remain, then multiply all divisors and remaining numbers.</p>

          <h3>Methods to Find HCF/GCD</h3>
          
          <h4>1. Prime Factorization Method</h4>
          <p>Find common prime factors and multiply them using the lowest powers.</p>
          <div className="formula-box">
            Example: HCF(12, 18)
            12 = 2² × 3
            18 = 2 × 3²
            HCF = 2 × 3 = 6
          </div>

          <h4>2. Euclidean Algorithm</h4>
          <p>Repeatedly divide and take remainders until the remainder is 0.</p>
          <div className="formula-box">
            HCF(18, 12):
            18 = 12 × 1 + 6
            12 = 6 × 2 + 0
            HCF = 6
          </div>

          <h3>Real-World Applications</h3>
          <ul>
            <li><strong>LCM:</strong> Finding when events repeat together (traffic lights, planetary alignments)</li>
            <li><strong>LCM:</strong> Determining common denominators for fractions</li>
            <li><strong>LCM:</strong> Scheduling recurring events</li>
            <li><strong>HCF:</strong> Dividing items into equal groups</li>
            <li><strong>HCF:</strong> Simplifying fractions</li>
            <li><strong>HCF:</strong> Finding maximum tile size for flooring</li>
          </ul>

          <h3>Important Properties</h3>
          <ul>
            <li>LCM(a, b) ≥ max(a, b)</li>
            <li>HCF(a, b) ≤ min(a, b)</li>
            <li>LCM(a, b) × HCF(a, b) = a × b (for two numbers)</li>
            <li>HCF is always a factor of LCM</li>
            <li>For coprime numbers (no common factors except 1), HCF = 1 and LCM = a × b</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LCMCalculator;

