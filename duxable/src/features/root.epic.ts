import { combineEpics, StateObservable } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import todoEpics from './todo/epic/todo.epic';
import userEpics from './user/epic/user.epic';

const allEpics = [
  ...todoEpics,
  ...userEpics,
  // add more epics
];

// combine all epics
/* STANDARD */
// const rootEpic = combineEpics<any>(...allEpics);

/* WITH ERROR CATCH */
const rootEpic = (
  action$: any,
  store$: StateObservable<any>,
  dependencies: any,
) =>
  combineEpics(...allEpics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    }),
  );
export default rootEpic;
