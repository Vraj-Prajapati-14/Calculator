import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';

const GradeCalculator = () => {
  const [assignments, setAssignments] = useState([
    { name: '', score: '', maxScore: '' }
  ]);
  const [result, setResult] = useState(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Grade Calculator - Calculate Your Final Grade",
    "description": "Free grade calculator. Calculate your final grade based on test scores, assignments, and other assessments.",
    "url": "https://yourdomain.com/grade-calculator"
  };

  const addAssignment = () => {
    setAssignments([...assignments, { name: '', score: '', maxScore: '' }]);
  };

  const removeAssignment = (index) => {
    const newAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(newAssignments.length > 0 ? newAssignments : [{ name: '', score: '', maxScore: '' }]);
  };

  const updateAssignment = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const calculateGrade = () => {
    const validAssignments = assignments.filter(a => 
      a.score !== '' && a.maxScore !== '' && !isNaN(parseFloat(a.score)) && !isNaN(parseFloat(a.maxScore))
    );

    if (validAssignments.length === 0) {
      alert('Please enter at least one assignment with score and max score');
      return;
    }

    let totalPoints = 0;
    let totalMaxPoints = 0;

    validAssignments.forEach(assignment => {
      totalPoints += parseFloat(assignment.score);
      totalMaxPoints += parseFloat(assignment.maxScore);
    });

    const percentage = (totalPoints / totalMaxPoints) * 100;
    
    let letterGrade = '';
    if (percentage >= 90) letterGrade = 'A';
    else if (percentage >= 80) letterGrade = 'B';
    else if (percentage >= 70) letterGrade = 'C';
    else if (percentage >= 60) letterGrade = 'D';
    else letterGrade = 'F';

    setResult({
      totalPoints: totalPoints.toFixed(2),
      totalMaxPoints: totalMaxPoints.toFixed(2),
      percentage: percentage.toFixed(2),
      letterGrade: letterGrade
    });
  };

  return (
    <>
      <SEO
        title="Grade Calculator - Calculate Your Final Course Grade"
        description="Free grade calculator. Calculate your final grade based on test scores, assignments, quizzes, and other assessments. Get letter grade and percentage."
        keywords="grade calculator, final grade calculator, course grade, test score calculator, assignment grade"
        canonicalUrl="/grade-calculator"
        structuredData={structuredData}
      />
      
      <div className="calculator-page">
        <div className="page-header">
          <h1>Grade Calculator</h1>
          <p>Calculate your final grade based on your scores</p>
        </div>

        <div className="calculator-container">
          <div className="calculator-card">
            <h2>Enter Your Assignments/Tests</h2>

            {assignments.map((assignment, index) => (
              <div key={index} style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '2px solid #e5e7eb' }}>
                <div className="form-group">
                  <label>Assignment/Test Name (Optional)</label>
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => updateAssignment(index, 'name', e.target.value)}
                    placeholder="e.g., Midterm Exam"
                  />
                </div>

                <div className="input-grid">
                  <div className="form-group">
                    <label>Score Earned</label>
                    <input
                      type="number"
                      value={assignment.score}
                      onChange={(e) => updateAssignment(index, 'score', e.target.value)}
                      placeholder="e.g., 85"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Max Score</label>
                    <input
                      type="number"
                      value={assignment.maxScore}
                      onChange={(e) => updateAssignment(index, 'maxScore', e.target.value)}
                      placeholder="e.g., 100"
                      step="0.1"
                    />
                  </div>
                </div>

                {assignments.length > 1 && (
                  <button onClick={() => removeAssignment(index)} className="btn btn-secondary" style={{ marginTop: '10px', width: '100%' }}>
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button onClick={addAssignment} className="btn btn-secondary btn-block" style={{ marginBottom: '15px' }}>
              + Add Another Assignment
            </button>

            <button onClick={calculateGrade} className="btn btn-primary btn-block">
              Calculate Grade
            </button>

            {result && (
              <div className="result-container">
                <h3>Your Grade</h3>
                <div className="result-value">{result.percentage}% - {result.letterGrade}</div>
                <div className="result-item">
                  <strong>Total Points Earned:</strong> {result.totalPoints} / {result.totalMaxPoints}
                </div>
                <div className="result-item">
                  <strong>Letter Grade:</strong> {result.letterGrade}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>About Grade Calculator</h2>
          <p>
            A grade calculator helps you determine your overall grade by combining scores from 
            various assignments, tests, quizzes, and exams. It calculates both percentage and 
            letter grade based on standard grading scales.
          </p>

          <h3>Standard Grading Scale</h3>
          <ul>
            <li><strong>A:</strong> 90-100% - Excellent</li>
            <li><strong>B:</strong> 80-89% - Good</li>
            <li><strong>C:</strong> 70-79% - Average</li>
            <li><strong>D:</strong> 60-69% - Below Average</li>
            <li><strong>F:</strong> 0-59% - Failing</li>
          </ul>

          <h3>How to Calculate Your Grade</h3>
          <div className="formula-box">
            Grade % = (Total Points Earned / Total Max Points) × 100
          </div>

          <h3>Tips</h3>
          <ul>
            <li>Include all assignments, tests, and quizzes</li>
            <li>Make sure to use the correct maximum scores</li>
            <li>Double-check your entered scores for accuracy</li>
            <li>Consider extra credit if applicable</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GradeCalculator;

