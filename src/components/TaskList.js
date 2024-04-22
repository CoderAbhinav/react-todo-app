import React, { useContext, useMemo, useState } from 'react';
import TaskListContext from '../context/TaskListContext';
import Task from './Task';
import '../assets/styles/tasklist.css';

function TaskList(props) {
  const { taskList } = useContext(TaskListContext);

  const [taskListFilter, setTaskListFilter] = useState('all');

  const handleTaskListFilterChange = (e) => {
    e.preventDefault();
    setTaskListFilter(e.currentTarget.dataset.filtername);
  };

  const isActiveButton = (currentVal) => {
    if (currentVal === taskListFilter) {
      return 'active-filter';
    }

    return '';
  };

  const getTaskTagCount = useMemo(() => {
    return {
      all: taskList.length,
      todo: taskList.filter((val) => {
        return val.status === 'not-done';
      }).length,
      ongoing: taskList.filter((val) => {
        return val.status === 'ongoing';
      }).length,
      done: taskList.filter((val) => {
        return val.status === 'done';
      }).length
    };
  }, [taskList]);

  const getFilteredList = useMemo(() => {
    return taskList.filter((val, idx, arr) => {
      if (taskListFilter === 'all') {
        return true;
      }

      return val.status === taskListFilter;
    });
  }, [taskListFilter, taskList]);

  return (
    <>
      <h1>Your Tasks</h1>
      <h2>Filters</h2>
      <div id="tasklist-filter-buttons">
        <button
          className={isActiveButton('all')}
          data-filtername="all"
          onClick={handleTaskListFilterChange}
        >
          <p className="status tag-not-done">#ALL ({getTaskTagCount.all})</p>
        </button>
        <button
          className={isActiveButton('not-done')}
          data-filtername="not-done"
          onClick={handleTaskListFilterChange}
        >
          <p className="status tag-not-done">#TODO ({getTaskTagCount.todo})</p>
        </button>
        <button
          className={isActiveButton('ongoing')}
          data-filtername="ongoing"
          onClick={handleTaskListFilterChange}
        >
          <p className="status tag-ongoing">#ONGOING ({getTaskTagCount.ongoing})</p>
        </button>
        <button
          className={isActiveButton('done')}
          data-filtername="done"
          onClick={handleTaskListFilterChange}
        >
          <p className="status tag-done">#DONE ({getTaskTagCount.done})</p>
        </button>
      </div>
      {taskList.length === 0 ? (
        <h2>No tasks found!</h2>
      ) : getFilteredList.length === 0 ? (
        <h3>No tasks for the given tag</h3>
      ) : (
        getFilteredList.map((e) => {
          return <Task key={e.id} task={e} />;
        })
      )}
    </>
  );
}

export default TaskList;
