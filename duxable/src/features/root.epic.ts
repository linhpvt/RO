import { combineEpics } from 'redux-observable';
import todoEpics from './todo/epic/todo.epic';
import userEpics from './user/epic/user.epic';

const allEpics = [
  ...todoEpics,
  ...userEpics,
  // add more epics
];
// combine all epics
const rootEpic = combineEpics<any>(...allEpics);

export default rootEpic;
