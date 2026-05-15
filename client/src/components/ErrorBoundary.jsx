
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-prithvi-cream flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl font-bold text-prithvi-green mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">Something went wrong in the garden.</p>
          <button onClick={() => window.location.href = '/'} className="bg-prithvi-green text-white px-6 py-2 rounded-full font-bold">
            Return Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
