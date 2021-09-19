import { combineEpics } from 'redux-observable';
import todoEpics from './todo/epic/todo.epic';

const allEpics = [
  ...todoEpics,
  // add more epics
];
// combine all epics
const rootEpic = combineEpics<any>(...allEpics);

export default rootEpic;
