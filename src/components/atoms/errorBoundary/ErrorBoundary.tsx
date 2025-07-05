import React from 'react';

/**
 * ErrorBoundary is a React class component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * This helps prevent the entire app from crashing due to errors in a part of the UI.
 */
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  /**
   * As of now, React error boundaries must be class components.
   * This is because error boundaries rely on specific lifecycle methods (componentDidCatch and getDerivedStateFromError)
   * that are only available in class components.
   */
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Log error if needed
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
