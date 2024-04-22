/**
 * Main entry point of the application.
 * Combines the AppBar and TaskList components within a TaskListContextProvider to manage the task list state.
 * @file App.js
 */
import AppBar from './components/AppBar';
import TaskList from './components/TaskList';
import TaskListContextProvider from './context/TaskListContextProvider';

/**
 * Main component of the application.
 * Combines the AppBar and TaskList components within a TaskListContextProvider to manage the task list state.
 * @returns {JSX.Element} JSX representation of the App component.
 */
function App(props) {
  return (
    <TaskListContextProvider>
      <AppBar />
      <TaskList />
    </TaskListContextProvider>
  );
}

export default App;
