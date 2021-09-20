import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserEnum } from '../reducer/user.reducer';
import { post, getAll } from '../../../services/http.service';
import { AppAction } from '../../../store';

const addUserEpic = (action$: Observable<AppAction<any>>, state$: any) =>
  action$.pipe(
    ofType(UserEnum.ADD),
    mergeMap(post('/users', action$, state$)),
    map((todo) => ({ type: UserEnum.ADD_SUCCESS, payload: todo })),
  );
const getUserListEpic = (action$: Observable<AppAction<any>>, state$: any) =>
  action$.pipe(
    ofType(UserEnum.GET),
    mergeMap(getAll('/users', action$, state$)),
    map((todos) => ({ type: UserEnum.GET_SUCCESS, payload: todos })),
  );

const userEpics = [addUserEpic, getUserListEpic];
export default userEpics;
