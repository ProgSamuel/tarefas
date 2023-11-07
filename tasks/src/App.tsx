import React, { useRef, useEffect, useState } from 'react';
import { ButtonStyled } from './Components/Button';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    const tasksFromLocalStorage: { id: string; text: string; completed: boolean }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || '') || '';
      tasksFromLocalStorage.push({ id: key || '', text: value, completed: false });
    }
    setTasks(tasksFromLocalStorage);
  }, []);

  function saveTask(e: React.FormEvent) {
    e.preventDefault();
    const taskText = taskInputRef.current?.value || '';
    const taskId = uuidv4();

    setTasks(prevTasks => [...prevTasks, { id: taskId, text: taskText, completed: false }]);
    localStorage.setItem(taskId, taskText);
    taskInputRef.current!.value = ''; 
  }

  function toggleTaskCompletion(taskId: string) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  }

  function filterTasks() {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }

  return (
    <>
      <form onSubmit={saveTask}>
        <input type="text" placeholder="Add task" ref={taskInputRef} required />
        <ButtonStyled type="submit">Add</ButtonStyled>
      </form>
      <div className='buttons'>
        <ButtonStyled onClick={() => setFilter('all')}>Show All</ButtonStyled>
        <ButtonStyled onClick={() => setFilter('completed')}>Completed</ButtonStyled>
        <ButtonStyled onClick={() => setFilter('pending')}>Pending</ButtonStyled>
      </div>
      <ul>
        {filterTasks().map(task => (
          <li
            key={task.id}
            onClick={() => toggleTaskCompletion(task.id)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            {`${task.text}`}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
