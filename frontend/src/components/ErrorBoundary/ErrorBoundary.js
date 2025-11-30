import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Calculator error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          padding: '40px',
          textAlign: 'center',
          background: '#fee2e2',
          border: '2px solid #fca5a5',
          borderRadius: '12px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#991b1b', marginBottom: '15px' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#7f1d1d', marginBottom: '20px' }}>
            We encountered an error while processing your calculation.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="btn btn-primary"
          >
            Reload Calculator
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

