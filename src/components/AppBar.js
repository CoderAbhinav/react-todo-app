import React, { useContext, useEffect, useState } from 'react';
import '../assets/styles/appbar.css';
import SiteLogo from '../assets/images/site-logo.png';
import TaskListContext from '../context/TaskListContext';
import { v4 as uuidV4 } from 'uuid';
import AutoResizeTextArea from './AutoResizeTextArea';

function AppBar(props) {
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [taskName, setTaskName] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const { taskList, setTaskList } = useContext(TaskListContext);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  const handleOnUserNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
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
      setTaskName(e.target.value);
    }
    setErrorValue(validationResults);
  };

  const handleAddTask = (e) => {
    if (errorValue === true) {
      setTaskList([{ id: uuidV4(), name: taskName, status: 'not-done' }, ...taskList]);
      setTaskName('');
    }
  };

  return (
    <>
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

export default AppBar;
