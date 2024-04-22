/**
 * Provides context for managing the task list state.
 * Retrieves task list from local storage on component mount and updates local storage on task list change.
 * @file TaskListContextProvider.js
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TaskListContext from './TaskListContext';

/**
 * Provides a context for managing the task list state.
 * Retrieves task list from local storage on component mount and updates local storage on task list change.
 * @param {object} children - Child components to be wrapped by the TaskListContextProvider.
 * @returns {JSX.Element} JSX representation of the TaskListContextProvider component.
 */
function TaskListContextProvider({ children }) {
  // Function to retrieve task list from local storage or return an empty array if not found.
  const retriveTaskListFromLocalStorage = () => {
    const taskListFromLocalStorage = localStorage.getItem('tasklist');
    return JSON.parse(taskListFromLocalStorage) || [];
  };

  // State variable for managing the task list.
  const [taskList, setTaskList] = useState(retriveTaskListFromLocalStorage());

  // Effect hook to update local storage with the task list whenever it changes.
  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(taskList));
  }, [taskList]);

  // Rendering the TaskListContextProvider component.
  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
}

// Prop types for TaskListContextProvider component.
TaskListContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default TaskListContextProvider;
