import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Calculator Hub</h3>
            <p>Your one-stop destination for all mathematical calculations. Fast, accurate, and easy to use.</p>
          </div>

          <div className="footer-section">
            <h4>Popular Calculators</h4>
            <ul>
              <li><Link to="/percentage-calculator">Percentage Calculator</Link></li>
              <li><Link to="/gpa-calculator">GPA Calculator</Link></li>
              <li><Link to="/basic-calculator">Basic Calculator</Link></li>
              <li><Link to="/lcm-calculator">LCM Calculator</Link></li>
              <li><Link to="/integral-calculator">Integral Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Math Tools</h4>
            <ul>
              <li><Link to="/matrix-calculator">Matrix Calculator</Link></li>
              <li><Link to="/trigonometry-calculator">Trigonometry</Link></li>
              <li><Link to="/statistics-calculator">Statistics</Link></li>
              <li><Link to="/algebra-calculator">Algebra</Link></li>
              <li><Link to="/fraction-calculator">Fraction Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>If you have any doubts or suggestions, please contact us at:</p>
            <p>
              <a 
                href="mailto:prajapativraj147@gmail.com?subject=Calculator Hub - Inquiry&body=Hello,%0D%0A%0D%0AI would like to share the following:%0D%0A%0D%0A" 
                className="contact-email"
                title="Send us an email"
              >
                prajapativraj147@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Calculator Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

