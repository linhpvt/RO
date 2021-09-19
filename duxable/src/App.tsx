import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { TodoAction, TodoEnum } from './features/todo/reducer/todo.reducer';

function App() {
  // @ts-ignore
  // const state = useSelector((state) => state);
  const dispatch = useDispatch<TodoAction>();
  useEffect(() => {
    // @ts-ignore
    dispatch({ type: TodoEnum.TODO_ADD, payload: { a: 10 } });
  }, [dispatch]);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Welcome to Redux-Obserbable and Hooks.</p>
        Keep growing and keep learning
      </header>
    </div>
  );
}

export default App;
