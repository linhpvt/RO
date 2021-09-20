import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { TodoAction, TodoEnum } from './features/todo/reducer/todo.reducer';

function App() {
  // @ts-ignore
  // const state = useSelector((state) => state);
  const dispatch = useDispatch<Dispatch<TodoAction>>();
  useEffect(() => {
    dispatch({
      type: TodoEnum.ADD,
      payload: {
        name: 'Home',
        description: 'Do something before start',
        status: 'idea',
      },
    });
    setTimeout(() => {
      dispatch<any>({
        type: TodoEnum.LIST,
        payload: '',
      });
    }, 3000);
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
