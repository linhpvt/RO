import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootEpic from '../features/root.epic';
import rootReducer from '../features/root.reducer';

const ENV = process.env.NODE_ENV || 'development';
const epicMiddleware = createEpicMiddleware();
const middlewares: any[] = [epicMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers =
  ENV === 'development'
    ? composeWithDevTools(...enhancers)
    : compose(...enhancers);

// @ts-ignore
const store = createStore(rootReducer, undefined, composedEnhancers);
epicMiddleware.run(rootEpic);

// @ts-ignore
if (ENV !== 'production' && module.hot) {
  // @ts-ignore
  module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer));
}

// define some of interested piece of data in store
// it's used to add access token and authorization headers
export interface AccessAuthType {
  user: any;
}

// represent an action to store
export interface AppAction<T> {
  type: string;
  payload?: T;
}

export default store;
