import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('📊 State changed - menuOpen:', menuOpen, 'dropdownOpen:', dropdownOpen);
  }, [menuOpen, dropdownOpen]);

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

  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    console.log('🔵 toggleMenu called - menuOpen:', menuOpen, '-> newMenuState:', newMenuState);
    setMenuOpen(newMenuState);
    if (menuOpen) {
      console.log('🔵 Closing dropdown because menu is closing');
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('🟢 toggleDropdown called - current dropdownOpen:', dropdownOpen, 'menuOpen:', menuOpen);
    
    // Only allow dropdown toggle if menu is open (for mobile)
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !menuOpen) {
      console.log('⚠️ Mobile detected but menu is not open - opening menu first');
      setMenuOpen(true);
    }
    
    setDropdownOpen(prev => {
      const newState = !prev;
      console.log('🟢 dropdownOpen changing from', prev, 'to', newState);
      console.log('🟢 Dropdown menu should now be:', newState ? 'VISIBLE' : 'HIDDEN');
      return newState;
    });
  };

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeAll}>
          <span className="logo-icon"><FaCalculator /></span>
          <span className="logo-text">Calculator Hub</span>
        </Link>

        <button 
          className={`menu-toggle ${menuOpen ? 'menu-toggle-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div 
            className="menu-overlay"
            onClick={closeAll}
            aria-hidden="true"
          />
        )}

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <div className="dropdown">
            <button 
              className="dropdown-toggle"
              onClick={toggleDropdown}
              type="button"
            >
              Calculators 
              <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </button>
            <div 
              className={`dropdown-menu ${dropdownOpen ? 'dropdown-menu-open' : ''}`}
              style={{ 
                '--debug-dropdown-open': dropdownOpen ? 'true' : 'false'
              }}
            >
              {calculators.map((calc, index) => (
                <Link 
                  key={index} 
                  to={calc.path}
                  onClick={closeAll}
                  className="dropdown-item"
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
