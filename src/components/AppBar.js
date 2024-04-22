/**
 * Functional component representing the application header.
 * Allows users to set their username and add tasks to the task list.
 * @file AppBar.js
 */
import React, { useContext, useEffect, useState } from 'react';
import '../assets/styles/appbar.css'; // Importing CSS styles for the component.
import SiteLogo from '../assets/images/site-logo.png'; // Importing site logo image.
import TaskListContext from '../context/TaskListContext'; // Importing TaskListContext for managing task list state.
import { v4 as uuidV4 } from 'uuid'; // Importing UUID library for generating unique IDs.
import AutoResizeTextArea from './AutoResizeTextArea'; // Importing custom AutoResizeTextArea component.

/**
 * Functional component representing the application header.
 * Allows users to set their username and add tasks to the task list.
 * @returns {JSX.Element} JSX representation of the AppBar component.
 */
function AppBar(props) {
  // State variables for managing username, task name, and error handling.
  const [userName, setUserName] = useState(localStorage.getItem('userName') || ''); // Stores the user's name.
  const [taskName, setTaskName] = useState(''); // Stores the name of the task being added.
  const [errorValue, setErrorValue] = useState(''); // Stores error messages related to task name validation.

  // Accessing task list state and setter function from TaskListContext.
  const { taskList, setTaskList } = useContext(TaskListContext);

  // Effect hook to update local storage with the username.
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  /**
   * Event handler for username input change.
   * @param {object} e - Event object.
   */
  const handleOnUserNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  /**
   * Function to validate the task name input.
   * @param {string} inputValue - The task name to be validated.
   * @returns {(string|boolean)} Error message if validation fails, otherwise true.
   */
  const validateTaskName = (inputValue) => {
    // Check if the string length exceeds 300 characters.
    if (inputValue.length > 120) {
      return 'String length cannot exceed 120 characters.';
    }

    // All conditions passed, string is valid.
    return true;
  };

  /**
   * Event handler for task name input change.
   * @param {object} e - Event object.
   */
  const handleOnTaskNameChange = (e) => {
    e.preventDefault();
    const validationResults = validateTaskName(e.target.value);
    if (validationResults === true) {
      setTaskName(e.target.value);
    }
    setErrorValue(validationResults);
  };

  /**
   * Event handler for adding a new task to the task list.
   * @param {object} e - Event object.
   */
  const handleAddTask = (e) => {
    // Check if task name validation passed.
    if (errorValue === true) {
      // Add the new task to the task list.
      setTaskList([{ id: uuidV4(), name: taskName, status: 'not-done' }, ...taskList]);
      // Clear the task name input field.
      setTaskName('');
    }
  };

  // Rendering the AppBar component.
  return (
    <>
      {/* Header section. Contains username. */}
      <header>
        <img id="site-logo-header" src={SiteLogo} alt="TODO App" />
        <div className="user-greeting-area">
          <h1>Hello,</h1>
          <input
            id="textbox-username"
            type="text"
            placeholder="User"
            value={userName}
            onChange={handleOnUserNameChange}
            autoComplete="off"
          />
        </div>
      </header>
      {/* Section to add tasks. */}
      <div id="form-add-task">
        <AutoResizeTextArea
          id="textbox-add-task"
          type="text"
          placeholder="Write down your task..."
          currentVal={taskName}
          onChange={handleOnTaskNameChange}
          maxLength={121}
          autoComplete="off"
        />
        {errorValue === true ? (
          <button id="button-add-task" onClick={handleAddTask}>
            Add +
          </button>
        ) : (
          <p>{errorValue}</p>
        )}
      </div>
    </>
  );
}

// Exporting the AppBar component as the default export.
export default AppBar;
