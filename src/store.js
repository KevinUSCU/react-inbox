import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'

const middleware = [
  thunk,
  logger
]

const store = createStore(
  rootReducer, // this will set initial state based on each reducer's initial state
  applyMiddleware(...middleware)
)

export default store