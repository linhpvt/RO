import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoEnum } from '../reducer/todo.reducer';
import { post, getAll } from '../../../services/http.service';
import { AppAction } from '../../../store';
const addTodoEpic = (action$: Observable<AppAction<any>>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.ADD),
    mergeMap(post('/todos', action$, state$)),
    map((todo) => ({ type: TodoEnum.ADD_SUCCESS, payload: todo })),
  );
const completeTodoEpic = (action$: Observable<AppAction<any>>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.COMPLETE),
    mergeMap(post('/complete-todo', action$, state$)),
    map((todo) => ({ type: TodoEnum.COMPLETE_SUCCESS, payload: todo })),
  );

const listTodoEpic = (action$: Observable<AppAction<null>>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.LIST),
    mergeMap(getAll('/todos', action$, state$)),
    map((todos) => ({ type: TodoEnum.LIST_SUCCESS, payload: todos })),
  );

const todoEpics = [addTodoEpic, completeTodoEpic, listTodoEpic];
export default todoEpics;
