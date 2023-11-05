import React, { useRef, useEffect, useState } from 'react';
import { ButtonStyled } from './Components/Button';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const tasksFromLocalStorage: { id: string; text: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || '') || '';
      tasksFromLocalStorage.push({ id: key||'', text: value });
    }
    setTasks(tasksFromLocalStorage);
  }, []); 

  function saveTask(e: React.FormEvent) {
    e.preventDefault();
    const taskText = taskRef.current?.value || '';
    const taskId = uuidv4();
    
    setTasks(prevTasks => [...prevTasks, { id: taskId, text: taskText }]);
        localStorage.setItem(taskId, taskText);
  }

  return (
    <>
      <form onSubmit={saveTask}>
        <input type="text" placeholder="Add task" ref={taskRef} required />
        <ButtonStyled type="submit">Add</ButtonStyled>
      </form>
      <div>
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              onClick={() => {
                setCompletedTasks(prevState => ({
                  ...prevState,
                  [task.id]: !prevState[task.id]
                }));
              }}
              style={{
                textDecoration: completedTasks[task.id] ? 'line-through' : 'none'
              }}
            >
              {`${task.text}`}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
