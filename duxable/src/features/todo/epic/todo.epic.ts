import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { TodoAction, TodoEnum } from '../reducer/todo.reducer';
import { post, getByOne } from '../../../services/http.service';

const addTodoEpic = (action$: Observable<TodoAction>) =>
  action$.pipe(
    ofType(TodoEnum.TODO_ADD),
    mergeMap(getByOne('/api/food/random_food')),
    map((todo) => ({ type: TodoEnum.TODO_ADD_SUCCESS, payload: todo })),
  );
const completeTodoEpic = (action$: Observable<TodoAction>) =>
  action$.pipe(
    ofType(TodoEnum.TODO_COMPLETE),
    mergeMap(post('/complete-todo')),
    map((data: any) => data.response),
    map((todo) => ({ type: TodoEnum.TODO_COMPLETE_SUCCESS, payload: todo })),
  );

const todoEpics = [addTodoEpic, completeTodoEpic];
export default todoEpics;
