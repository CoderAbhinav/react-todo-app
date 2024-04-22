import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TaskListContext from './TaskListContext';

function TaskListContextProvider({ children }) {

  const retriveTaskListFromLocalStorage = ( ) => {
    let taskListFromLocalStorage = localStorage.getItem( 'tasklist' );
    console.log( 'TaskList:' +  taskListFromLocalStorage );
    return JSON.parse( taskListFromLocalStorage ) || [];
  }

  const [taskList, setTaskList] = useState( retriveTaskListFromLocalStorage() );

  useEffect(() => {
    console.log( 'Storing In Local Storage: ' + JSON.stringify( taskList ) );
    localStorage.setItem( 'tasklist', JSON.stringify( taskList ) );
  }, [taskList]);

  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </TaskListContext.Provider>
  );
}

TaskListContextProvider.propTypes = {
  children: PropTypes.node.isRequired // Define children prop
};

export default TaskListContextProvider;
