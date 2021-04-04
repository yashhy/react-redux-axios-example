import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from '../reducer'

const storeEnhancers = compose
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store);

export default store