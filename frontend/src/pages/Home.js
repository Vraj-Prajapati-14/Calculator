import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { 
  FaBolt, FaBullseye, FaMobileAlt, FaBook, FaDollarSign, FaLock,
  FaCalculator, FaPercent, FaGraduationCap, FaFileAlt, FaBalanceScale,
  FaChartLine, FaRulerCombined, FaExclamation, FaSync, FaTable,
  FaEquals, FaChartBar, FaChartArea, FaDice, FaRuler, FaDivide,
  FaFont, FaArrowDown, FaArrowUp
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const calculators = [
    {
      name: 'Basic Calculator',
      path: '/basic-calculator',
      description: 'Scientific calculator with advanced functions',
      icon: FaCalculator,
      category: 'Basic'
    },
    {
      name: 'Percentage Calculator',
      path: '/percentage-calculator',
      description: 'Calculate percentages, increases, and decreases',
      icon: FaPercent,
      category: 'Basic'
    },
    {
      name: 'GPA Calculator',
      path: '/gpa-calculator',
      description: 'Calculate your Grade Point Average',
      icon: FaGraduationCap,
      category: 'Academic'
    },
    {
      name: 'Grade Calculator',
      path: '/grade-calculator',
      description: 'Calculate your final grades',
      icon: FaFileAlt,
      category: 'Academic'
    },
    {
      name: 'Weighted Grade Calculator',
      path: '/weighted-grade-calculator',
      description: 'Calculate weighted grades',
      icon: FaBalanceScale,
      category: 'Academic'
    },
    {
      name: 'Average Calculator',
      path: '/average-calculator',
      description: 'Calculate mean, median, and mode',
      icon: FaChartLine,
      category: 'Statistics'
    },
    {
      name: 'Ratio Calculator',
      path: '/ratio-calculator',
      description: 'Simplify and calculate ratios',
      icon: FaRulerCombined,
      category: 'Basic'
    },
    {
      name: 'Factorial Calculator',
      path: '/factorial-calculator',
      description: 'Calculate factorials and permutations',
      icon: FaExclamation,
      category: 'Math'
    },
    {
      name: 'LCM/HCF Calculator',
      path: '/lcm-calculator',
      description: 'Find LCM and HCF of numbers',
      icon: FaSync,
      category: 'Math'
    },
    {
      name: 'Matrix Calculator',
      path: '/matrix-calculator',
      description: 'Perform matrix operations',
      icon: FaTable,
      category: 'Advanced'
    },
    {
      name: 'Linear Equation Solver',
      path: '/linear-equation-solver',
      description: 'Solve linear equations',
      icon: FaEquals,
      category: 'Algebra'
    },
    {
      name: 'Quadratic Equation Solver',
      path: '/quadratic-equation-solver',
      description: 'Solve quadratic equations',
      icon: FaChartLine,
      category: 'Algebra'
    },
    {
      name: 'Statistics Calculator',
      path: '/statistics-calculator',
      description: 'Calculate statistical measures',
      icon: FaChartBar,
      category: 'Statistics'
    },
    {
      name: 'Standard Deviation Calculator',
      path: '/standard-deviation-calculator',
      description: 'Calculate standard deviation and variance',
      icon: FaChartArea,
      category: 'Statistics'
    },
    {
      name: 'Permutation & Combination',
      path: '/permutation-combination-calculator',
      description: 'Calculate nPr and nCr',
      icon: FaDice,
      category: 'Math'
    },
    {
      name: 'Trigonometry Calculator',
      path: '/trigonometry-calculator',
      description: 'Calculate sin, cos, tan and more',
      icon: FaRuler,
      category: 'Trigonometry'
    },
    {
      name: 'Fraction Calculator',
      path: '/fraction-calculator',
      description: 'Add, subtract, multiply, divide fractions',
      icon: FaDivide,
      category: 'Basic'
    },
    {
      name: 'Algebra Calculator',
      path: '/algebra-calculator',
      description: 'Solve algebraic expressions',
      icon: FaFont,
      category: 'Algebra'
    },
    {
      name: 'Derivative Calculator',
      path: '/derivative-calculator',
      description: 'Calculate derivatives step by step',
      icon: FaArrowDown,
      category: 'Calculus'
    },
    {
      name: 'Integral Calculator',
      path: '/integral-calculator',
      description: 'Calculate integrals with steps',
      icon: FaArrowUp,
      category: 'Calculus'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Calculator Hub",
    "url": "https://yourdomain.com",
    "description": "Free online calculators for math, statistics, algebra, calculus and more. Calculate percentages, GPA, derivatives, integrals and much more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourdomain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Calculator Hub - Free Online Math Calculators | Scientific Calculator"
        description="Free online calculators for all your math needs. Calculate percentages, GPA, derivatives, integrals, statistics, and more. Fast, accurate, and easy to use."
        keywords="calculator, math calculator, scientific calculator, percentage calculator, GPA calculator, integral calculator, derivative calculator, statistics calculator, free calculator online"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      
      <div className="home-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Free Online Calculators</h1>
            <p className="hero-subtitle">
              Your ultimate destination for all mathematical calculations. Fast, accurate, and easy to use.
            </p>
            <p className="hero-description">
              From basic arithmetic to advanced calculus, we've got you covered with 20+ specialized calculators.
            </p>
          </div>
        </section>

        <section className="calculators-section">
          <div className="container">
            <h2 className="section-title">All Calculators</h2>
            <div className="calculators-grid">
              {calculators.map((calc, index) => {
                const IconComponent = calc.icon;
                return (
                  <Link 
                    to={calc.path} 
                    key={index}
                    className="calculator-card-home"
                  >
                    <div className="calculator-icon"><IconComponent /></div>
                    <h3>{calc.name}</h3>
                    <p>{calc.description}</p>
                    <span className="category-badge">{calc.category}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose Calculator Hub?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><FaBolt /></div>
                <h3>Lightning Fast</h3>
                <p>Get instant results for all your calculations without any delays</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaBullseye /></div>
                <h3>Highly Accurate</h3>
                <p>Precise calculations using advanced mathematical algorithms</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaMobileAlt /></div>
                <h3>Mobile Friendly</h3>
                <p>Works perfectly on all devices - desktop, tablet, and mobile</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaBook /></div>
                <h3>Step-by-Step Solutions</h3>
                <p>Understand the process with detailed step-by-step explanations</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaDollarSign /></div>
                <h3>100% Free</h3>
                <p>All calculators are completely free to use, no hidden charges</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaLock /></div>
                <h3>Private & Secure</h3>
                <p>Your calculations are private and not stored on our servers</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section-home">
          <div className="container">
            <h2>About Calculator Hub</h2>
            <p>
              Calculator Hub is your comprehensive online resource for mathematical calculations. 
              Whether you're a student, teacher, engineer, or professional, our suite of calculators 
              is designed to make your mathematical tasks easier and faster.
            </p>
            <p>
              Our calculators cover a wide range of topics including basic arithmetic, algebra, 
              calculus, statistics, trigonometry, and more. Each calculator is designed with 
              user experience in mind, providing not just answers but also step-by-step solutions 
              to help you understand the underlying concepts.
            </p>
            <h3>Popular Calculators</h3>
            <ul>
              <li><strong>Percentage Calculator:</strong> Calculate percentages, percentage increases, decreases, and percentage differences</li>
              <li><strong>GPA Calculator:</strong> Calculate your Grade Point Average for academic performance tracking</li>
              <li><strong>Integral Calculator:</strong> Solve definite and indefinite integrals with detailed steps</li>
              <li><strong>Derivative Calculator:</strong> Calculate derivatives of functions with step-by-step solutions</li>
              <li><strong>LCM Calculator:</strong> Find the Least Common Multiple and Highest Common Factor of numbers</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

