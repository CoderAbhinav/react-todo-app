import React, { useContext, useState } from 'react';
import '../assets/styles/task.css';
import TaskListContext from '../context/TaskListContext';
import PropTypes from 'prop-types';
import AutoResizeTextArea from './AutoResizeTextArea';

function Task(props) {
  Task.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }).isRequired
  };

  const { taskList, setTaskList } = useContext(TaskListContext);
  const [errorValue, setErrorValue] = useState('');

  const handleOnStatusChangeToOngoing = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'ongoing' };
    setTaskList([...taskList]);
  };

  const handleOnStatusChangeToDone = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'done' };
    setTaskList([...taskList]);
  };

  const handleOnStatusChangeToReset = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'not-done' };
    setTaskList([...taskList]);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setTaskList(taskList.filter((obj) => obj.id !== props.task.id));
  };

  const validateTaskName = (inputValue) => {
    // Check if the string length exceeds 300 characters
    if (inputValue.length > 120) {
      return 'String length cannot exceed 120 characters.';
    }

    // All conditions passed, string is valid
    return true;
  };

  const handleOnTaskNameChange = (e) => {
    e.preventDefault();

    const validationResults = validateTaskName(e.target.value);

    if (validationResults === true) {
      const index = taskList.findIndex((obj) => obj.id === props.task.id);
      taskList[index] = { ...taskList[index], name: e.target.value };
      setTaskList([...taskList]);
    }

    setErrorValue(validationResults);
  };

  return (
    <div className={`task ${props.task.status}`}>
      <p className={`status tag-${props.task.status}`}>
        {props.task.status === 'not-done'
          ? '#TODO'
          : props.task.status === 'ongoing'
            ? '#ONGOING'
            : '#DONE'}
      </p>
      <div className="task-name-container">
        <AutoResizeTextArea
          className="task-name"
          type="text"
          placeholder="Write down your task..."
          currentVal={props.task.name}
          onChange={handleOnTaskNameChange}
          maxLength={121}
          autoComplete="off"
        />
        <p>Click on text to edit</p>
      </div>
      <p>{errorValue}</p>
      <div className="task-options">
        {props.task.status === 'not-done' ? (
          <button onClick={handleOnStatusChangeToOngoing}>🏁 Mark As Ongoing</button>
        ) : props.task.status === 'ongoing' ? (
          <button onClick={handleOnStatusChangeToDone}>✅ Mark As Done</button>
        ) : (
          <button onClick={handleOnStatusChangeToReset}>🆑 Reset</button>
        )}
        <button onClick={handleDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
}

export default Task;
