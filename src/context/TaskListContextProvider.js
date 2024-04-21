import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskListContext from './TaskListContext';

function TaskListContextProvider({ children }) {
  const [taskList, setTaskList] = useState([]);

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
