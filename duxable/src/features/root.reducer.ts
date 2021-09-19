import { combineReducers } from 'redux';
import todoReducer from './todo/reducer/todo.reducer';
import httpReducer from './http/http.reducer';
import userReducer from './user/reducer/user.reducer';

const allReducers = {
  todo: todoReducer,
  http: httpReducer,
  user: userReducer,
  // add more reducers
};

// combine all reducers
const rootReducer = combineReducers(allReducers);
export default rootReducer;
