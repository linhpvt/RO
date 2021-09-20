import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { TodoAction, TodoEnum } from '../reducer/todo.reducer';
import { post, getAll } from '../../../services/http.service';

const addTodoEpic = (action$: Observable<TodoAction>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.ADD),
    mergeMap(post('/todos', state$)),
    map((todo) => ({ type: TodoEnum.ADD_SUCCESS, payload: todo })),
  );
const completeTodoEpic = (action$: Observable<TodoAction>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.COMPLETE),
    mergeMap(post('/complete-todo', state$)),
    map((todo) => ({ type: TodoEnum.COMPLETE_SUCCESS, payload: todo })),
  );

const listTodoEpic = (action$: Observable<TodoAction>, state$: any) =>
  action$.pipe(
    ofType(TodoEnum.LIST),
    mergeMap(getAll('/todos', state$)),
    map((todos) => ({ type: TodoEnum.LIST_SUCCESS, payload: todos })),
  );

const todoEpics = [addTodoEpic, completeTodoEpic, listTodoEpic];
export default todoEpics;
