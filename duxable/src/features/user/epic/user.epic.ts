import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserAction, UserEnum } from '../reducer/user.reducer';
import { post, getAll } from '../../../services/http.service';

const addUserEpic = (action$: Observable<UserAction>) =>
  action$.pipe(
    ofType(UserEnum.USER_ADD),
    mergeMap(post('/users')),
    map((todo) => ({ type: UserEnum.USER_ADD_SUCCESS, payload: todo })),
  );
const getUserListEpic = (action$: Observable<UserAction>) =>
  action$.pipe(
    ofType(UserEnum.USER_GET),
    mergeMap(getAll('/users')),
    map((data: any) => data.response),
    map((todo) => ({ type: UserEnum.USER_GET_SUCCESS, payload: todo })),
  );

const userEpics = [addUserEpic, getUserListEpic];
export default userEpics;
