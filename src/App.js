import AppBar from './components/AppBar';
import TaskList from './components/TaskList';
import TaskListContextProvider from './context/TaskListContextProvider';

function App(props) {
  return (
    <TaskListContextProvider>
      <AppBar />
      <TaskList />
    </TaskListContextProvider>
  );
}

export default App;
