import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const calculators = [
    { name: 'Basic Calculator', path: '/basic-calculator' },
    { name: 'Percentage Calculator', path: '/percentage-calculator' },
    { name: 'GPA Calculator', path: '/gpa-calculator' },
    { name: 'Grade Calculator', path: '/grade-calculator' },
    { name: 'Weighted Grade Calculator', path: '/weighted-grade-calculator' },
    { name: 'Average Calculator', path: '/average-calculator' },
    { name: 'Ratio Calculator', path: '/ratio-calculator' },
    { name: 'Factorial Calculator', path: '/factorial-calculator' },
    { name: 'LCM/HCF Calculator', path: '/lcm-calculator' },
    { name: 'Matrix Calculator', path: '/matrix-calculator' },
    { name: 'Linear Equation Solver', path: '/linear-equation-solver' },
    { name: 'Quadratic Equation Solver', path: '/quadratic-equation-solver' },
    { name: 'Statistics Calculator', path: '/statistics-calculator' },
    { name: 'Standard Deviation Calculator', path: '/standard-deviation-calculator' },
    { name: 'Permutation & Combination Calculator', path: '/permutation-combination-calculator' },
    { name: 'Trigonometry Calculator', path: '/trigonometry-calculator' },
    { name: 'Fraction Calculator', path: '/fraction-calculator' },
    { name: 'Algebra Calculator', path: '/algebra-calculator' },
    { name: 'Derivative Calculator', path: '/derivative-calculator' },
    { name: 'Integral Calculator', path: '/integral-calculator' },
  ];

  const handleMenuClose = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon"><FaCalculator /></span>
          <span className="logo-text">Calculator Hub</span>
        </Link>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={handleMenuClose}>Home</Link>
          
          <div className="dropdown">
            <button 
              className="dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              type="button"
            >
              Calculators <span className={`arrow ${dropdownOpen ? 'arrow-open' : ''}`}>▼</span>
            </button>
            <div className={`dropdown-menu ${dropdownOpen ? 'dropdown-menu-open' : ''}`}>
              {calculators.map((calc, index) => (
                <Link 
                  key={index} 
                  to={calc.path}
                  onClick={handleMenuClose}
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

