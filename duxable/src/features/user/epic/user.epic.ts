import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserAction, UserEnum } from '../reducer/user.reducer';
import { post, getAll } from '../../../services/http.service';

const addUserEpic = (action$: Observable<UserAction>, state$: any) =>
  action$.pipe(
    ofType(UserEnum.ADD),
    mergeMap(post('/users', state$)),
    map((todo) => ({ type: UserEnum.ADD_SUCCESS, payload: todo })),
  );
const getUserListEpic = (action$: Observable<UserAction>, state$: any) =>
  action$.pipe(
    ofType(UserEnum.GET),
    mergeMap(getAll('/users', state$)),
    map((todos) => ({ type: UserEnum.GET_SUCCESS, payload: todos })),
  );

const userEpics = [addUserEpic, getUserListEpic];
export default userEpics;
