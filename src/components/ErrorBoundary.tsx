import React, { Component, Fragment } from 'react';
import { logger } from '../utility';
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    logger.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <Fragment>
        <h2>This is how you can handle global errors inside you app! Now next time don't click 💣</h2>
        <br/>
        <br/>
        <br />
        Click <a href={process.env.PUBLIC_URL}>here</a> to go back!
      </Fragment>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;