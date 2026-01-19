import React from 'react';
import { toast } from 'react-toastify';

/**
 * Error Boundary Component
 * Catches React component errors and displays fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Show toast notification
    toast.error('An unexpected error occurred. Please refresh the page.');
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] p-4">
          <div className="bg-white rounded-[24px] shadow-sm p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#1A1D1F] mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Something went wrong
            </h2>
            <p className="text-sm text-[#6F767E] mb-6" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleReset}
              className="bg-[#C8EE44] text-[#1B212D] font-semibold px-6 py-3 rounded-lg hover:bg-[#B8DE34] transition-colors"
              style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-xs text-[#6F767E] cursor-pointer mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
