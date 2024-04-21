import React, { useContext } from 'react';
import TaskListContext from '../context/TaskListContext';
import Task from './Task';

function TaskList(props) {
  const { taskList } = useContext(TaskListContext);

  console.log(taskList);

  return (
    <>
      <h1>Your Tasks</h1>
      {taskList.length === 0 ? (
        <h2>No tasks found!</h2>
      ) : (
        taskList.map((e) => {
          return <Task key={e.id} task={e} />;
        })
      )}
    </>
  );
}

export default TaskList;
