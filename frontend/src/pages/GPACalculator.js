import React, { useState } from 'react';
import SEO from '../components/SEO/SEO';
import FAQ from '../components/FAQ/FAQ';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { generateFAQSchema } from '../utils/seoKeywords';
import { calculatorSEOData, generateCalculatorStructuredData, generateCalculatorFAQs } from '../utils/calculatorSEOData';

const GPACalculator = () => {
  const [courses, setCourses] = useState([
    { courseName: '', grade: '', credits: '' }
  ]);
  const [result, setResult] = useState(null);
  const [scale, setScale] = useState('4.0');

  const gradePoints = {
    '4.0': {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    },
    '5.0': {
      'A+': 5.0, 'A': 5.0, 'A-': 4.7,
      'B+': 4.3, 'B': 4.0, 'B-': 3.7,
      'C+': 3.3, 'C': 3.0, 'C-': 2.7,
      'D+': 2.3, 'D': 2.0, 'D-': 1.7,
      'F': 0.0
    }
  };

  const addCourse = () => {
    setCourses([...courses, { courseName: '', grade: '', credits: '' }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses.length > 0 ? newCourses : [{ courseName: '', grade: '', credits: '' }]);
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.grade && c.credits && !isNaN(parseFloat(c.credits)));
    
    if (validCourses.length === 0) {
      alert('Please enter at least one course with grade and credits');
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;
    const courseDetails = [];

    validCourses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[scale][course.grade];
      const earnedPoints = points * credits;
      
      totalPoints += earnedPoints;
      totalCredits += credits;
      
      courseDetails.push({
        name: course.courseName || 'Unnamed Course',
        grade: course.grade,
        credits: credits,
        points: points,
        earnedPoints: earnedPoints.toFixed(2)
      });
    });

    const gpa = totalPoints / totalCredits;

    setResult({
      gpa: gpa.toFixed(2),
      totalCredits: totalCredits.toFixed(1),
      totalPoints: totalPoints.toFixed(2),
      courses: courseDetails
    });
  };

  const seoData = calculatorSEOData['gpa-calculator'];
  const structuredData = generateCalculatorStructuredData(
    'GPA Calculator',
    seoData.description,
    'https://yourdomain.com/gpa-calculator'
  );
  const faqs = generateCalculatorFAQs('GPA Calculator', 'education');
  const faqSchema = generateFAQSchema(faqs);

  return (
    <ErrorBoundary>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl="/gpa-calculator"
        structuredData={structuredData}
        lang="en"
        faqSchema={faqSchema}
      />
      
      <main className="calculator-page" role="main">
        <header className="page-header">
          <h1>FREE GPA Calculator - Best Grade Point Average Calculator for College Students</h1>
          <p>Easy, accurate, and free GPA calculator. Calculate your cumulative GPA, semester GPA with weighted credits instantly. Perfect for college students and teachers.</p>
        </header>

        <section className="calculator-container" aria-label="GPA Calculator">
          <article className="calculator-card">
            <h2>Enter Your Courses</h2>
            
            <div className="form-group">
              <label>GPA Scale</label>
              <select value={scale} onChange={(e) => setScale(e.target.value)}>
                <option value="4.0">4.0 Scale</option>
                <option value="5.0">5.0 Scale</option>
              </select>
            </div>

            {courses.map((course, index) => (
              <div key={index} className="course-row" style={{ 
                background: '#f9fafb', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '15px',
                border: '2px solid #e5e7eb'
              }}>
                <div className="form-group">
                  <label>Course Name (Optional)</label>
                  <input
                    type="text"
                    value={course.courseName}
                    onChange={(e) => updateCourse(index, 'courseName', e.target.value)}
                    placeholder="e.g., Calculus I"
                  />
                </div>

                <div className="input-grid">
                  <div className="form-group">
                    <label>Grade</label>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="D-">D-</option>
                      <option value="F">F</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Credits</label>
                    <input
                      type="number"
                      step="0.5"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                      placeholder="e.g., 3"
                    />
                  </div>
                </div>

                {courses.length > 1 && (
                  <button 
                    onClick={() => removeCourse(index)} 
                    className="btn btn-secondary"
                    style={{ marginTop: '10px', width: '100%' }}
                  >
                    Remove Course
                  </button>
                )}
              </div>
            ))}

            <button onClick={addCourse} className="btn btn-secondary btn-block" style={{ marginBottom: '15px' }}>
              + Add Another Course
            </button>

            <button onClick={calculateGPA} className="btn btn-primary btn-block">
              Calculate GPA
            </button>

            {result && (
              <div className="result-container">
                <h3>Your GPA</h3>
                <div className="result-value">{result.gpa}</div>
                <div className="result-item">
                  <strong>Total Credits:</strong> {result.totalCredits}
                </div>
                <div className="result-item">
                  <strong>Total Grade Points:</strong> {result.totalPoints}
                </div>

                <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Course Breakdown</h4>
                {result.courses.map((course, index) => (
                  <div key={index} className="result-item">
                    <strong>{course.name}:</strong> Grade {course.grade} × {course.credits} credits = {course.earnedPoints} points
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>

        <section className="info-section" aria-label="About GPA Calculator">
          <h2>About GPA Calculator</h2>
          <p>
            A GPA (Grade Point Average) calculator helps you determine your academic performance by 
            converting letter grades into numerical values and calculating the weighted average based 
            on credit hours.
          </p>

          <h3>How to Calculate GPA</h3>
          <div className="formula-box">
            GPA = (Sum of (Grade Points × Credits)) / Total Credits
          </div>
          
          <p><strong>Example:</strong></p>
          <ul>
            <li>Math (A, 3 credits): 4.0 × 3 = 12 points</li>
            <li>English (B+, 3 credits): 3.3 × 3 = 9.9 points</li>
            <li>History (A-, 2 credits): 3.7 × 2 = 7.4 points</li>
          </ul>
          <p>Total: 29.3 points ÷ 8 credits = <strong>3.66 GPA</strong></p>

          <h3>Grade Point Scale (4.0)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', margin: '20px 0' }}>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>A/A+: 4.0</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>A-: 3.7</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>B+: 3.3</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>B: 3.0</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>B-: 2.7</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>C+: 2.3</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>C: 2.0</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>C-: 1.7</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>D+: 1.3</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>D: 1.0</div>
            <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px' }}>F: 0.0</div>
          </div>

          <h3>GPA Ranges</h3>
          <ul>
            <li><strong>4.0 GPA:</strong> Perfect - All A grades</li>
            <li><strong>3.5-3.9 GPA:</strong> Excellent - Dean's List level</li>
            <li><strong>3.0-3.4 GPA:</strong> Good - Above average performance</li>
            <li><strong>2.5-2.9 GPA:</strong> Average - Satisfactory performance</li>
            <li><strong>2.0-2.4 GPA:</strong> Below Average - May need improvement</li>
            <li><strong>Below 2.0 GPA:</strong> Poor - Academic probation risk</li>
          </ul>

          <h3>Tips for Improving Your GPA</h3>
          <ul>
            <li>Focus on higher credit-hour courses for greater impact</li>
            <li>Attend all classes and participate actively</li>
            <li>Complete assignments on time</li>
            <li>Seek help from tutors or professors when needed</li>
            <li>Study consistently rather than cramming</li>
            <li>Form study groups with classmates</li>
          </ul>
        </section>

        <FAQ calculatorName="GPA Calculator" faqs={faqs} />
      </main>
    </ErrorBoundary>
  );
};

export default GPACalculator;

