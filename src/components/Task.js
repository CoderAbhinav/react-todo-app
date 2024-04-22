/**
 * Component representing an individual task.
 * @file Task.js
 */
import React, { useContext, useState } from 'react';
import '../assets/styles/task.css';
import TaskListContext from '../context/TaskListContext';
import PropTypes from 'prop-types';
import AutoResizeTextArea from './AutoResizeTextArea';

/**
 * Functional component representing an individual task.
 * @param {object} props - Properties passed to the Task component.
 * @returns {JSX.Element} JSX representation of the Task component.
 */
function Task(props) {
  // Destructuring taskList and setTaskList functions from TaskListContext.
  const { taskList, setTaskList } = useContext(TaskListContext);

  // State variable for handling error messages.
  const [errorValue, setErrorValue] = useState('');

  // Event handler for changing task status to ongoing.
  const handleOnStatusChangeToOngoing = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'ongoing' };
    setTaskList([...taskList]);
  };

  // Event handler for changing task status to done.
  const handleOnStatusChangeToDone = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'done' };
    setTaskList([...taskList]);
  };

  // Event handler for resetting task status to not-done.
  const handleOnStatusChangeToReset = (e) => {
    e.preventDefault();
    const index = taskList.findIndex((obj) => obj.id === props.task.id);
    taskList[index] = { ...taskList[index], status: 'not-done' };
    setTaskList([...taskList]);
  };

  // Event handler for deleting a task.
  const handleDelete = (e) => {
    e.preventDefault();
    setTaskList(taskList.filter((obj) => obj.id !== props.task.id));
  };

  // Function to validate task name input.
  const validateTaskName = (inputValue) => {
    // Check if the string length exceeds 300 characters.
    if (inputValue.length > 120) {
      return 'String length cannot exceed 120 characters.';
    }

    // All conditions passed, string is valid.
    return true;
  };

  // Event handler for changing task name.
  const handleOnTaskNameChange = (e) => {
    e.preventDefault();

    const validationResults = validateTaskName(e.target.value);

    if (validationResults === true) {
      const index = taskList.findIndex((obj) => obj.id === props.task.id);
      taskList[index] = { ...taskList[index], name: e.target.valuename };
      setTaskList([...taskList]);
    }

    setErrorValue(validationResults);
  };

  // Rendering the Task component.
  return (
    <div className={`task ${props.task.status}`}>
      {/* Task status tag. */}
      <p className={`status tag-${props.task.status}`}>
        {props.task.status === 'not-done'
          ? '#TODO'
          : props.task.status === 'ongoing'
            ? '#ONGOING'
            : '#DONE'}
      </p>
      <div className="task-name-container">
        {/* Taskname area. */}
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
      {/* Error field. */}
      <p>{errorValue}</p>
      {/* Task options area. */}
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

// Prop types for Task component
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
