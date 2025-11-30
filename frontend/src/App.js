import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import BasicCalculator from './pages/BasicCalculator';
import PercentageCalculator from './pages/PercentageCalculator';
import GPACalculator from './pages/GPACalculator';
import GradeCalculator from './pages/GradeCalculator';
import WeightedGradeCalculator from './pages/WeightedGradeCalculator';
import AverageCalculator from './pages/AverageCalculator';
import RatioCalculator from './pages/RatioCalculator';
import FactorialCalculator from './pages/FactorialCalculator';
import LCMCalculator from './pages/LCMCalculator';
import MatrixCalculator from './pages/MatrixCalculator';
import LinearEquationSolver from './pages/LinearEquationSolver';
import QuadraticEquationSolver from './pages/QuadraticEquationSolver';
import StatisticsCalculator from './pages/StatisticsCalculator';
import StandardDeviationCalculator from './pages/StandardDeviationCalculator';
import PermutationCombinationCalculator from './pages/PermutationCombinationCalculator';
import TrigonometryCalculator from './pages/TrigonometryCalculator';
import FractionCalculator from './pages/FractionCalculator';
import AlgebraCalculator from './pages/AlgebraCalculator';
import DerivativeCalculator from './pages/DerivativeCalculator';
import IntegralCalculator from './pages/IntegralCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-calculator" element={<BasicCalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />
            <Route path="/grade-calculator" element={<GradeCalculator />} />
            <Route path="/weighted-grade-calculator" element={<WeightedGradeCalculator />} />
            <Route path="/average-calculator" element={<AverageCalculator />} />
            <Route path="/ratio-calculator" element={<RatioCalculator />} />
            <Route path="/factorial-calculator" element={<FactorialCalculator />} />
            <Route path="/lcm-calculator" element={<LCMCalculator />} />
            <Route path="/matrix-calculator" element={<MatrixCalculator />} />
            <Route path="/linear-equation-solver" element={<LinearEquationSolver />} />
            <Route path="/quadratic-equation-solver" element={<QuadraticEquationSolver />} />
            <Route path="/statistics-calculator" element={<StatisticsCalculator />} />
            <Route path="/standard-deviation-calculator" element={<StandardDeviationCalculator />} />
            <Route path="/permutation-combination-calculator" element={<PermutationCombinationCalculator />} />
            <Route path="/trigonometry-calculator" element={<TrigonometryCalculator />} />
            <Route path="/fraction-calculator" element={<FractionCalculator />} />
            <Route path="/algebra-calculator" element={<AlgebraCalculator />} />
            <Route path="/derivative-calculator" element={<DerivativeCalculator />} />
            <Route path="/integral-calculator" element={<IntegralCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

