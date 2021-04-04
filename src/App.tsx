import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from './store'
import ErrorBoundary from './components/ErrorBoundary';

import {
  GithubSearch,
  NotFound,
  Error
} from './pages';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/github-search">
                <GithubSearch />
              </Route>
              <Route exact path="/💣">
                <Error />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
