import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);
  const [editingTask, setEditingTask] = useState<{id: string, text: string, completed: boolean} | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [visible, setVisible] = useState<number>(5);

  useEffect(() => {
    const tasksFromLocalStorage: {
      id: string;
      text: string;
      completed: boolean;
    }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || '') || '';
      tasksFromLocalStorage.push({
        id: key || '',
        text: value,
        completed: false,
      });
    }
    setTasks(tasksFromLocalStorage);
  }, [localStorage]);

  const saveTask = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const taskText = taskInputRef.current?.value || '';
    const taskId = editingTask ? editingTask.id : uuidv4();
  
    if (editingTask) {
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === editingTask.id ? { ...task, text: taskText } : task))
      );
      setEditingTask(null); 
    } else {
      setTasks(prevTasks => [...prevTasks, { id: taskId, text: taskText, completed: false }]);
    }
  
    localStorage.setItem(taskId, taskText);
    taskInputRef.current!.value = '';
  }, [editingTask]);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  }, []);

  const filterTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter, localStorage]);

  function removeTask(id: string) {
    localStorage.removeItem(id);
    setTasks((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function editTask(task: any) {
setEditingTask({id: task.id, text: task.text, completed: task.completed})    
    taskInputRef.current!.value = task.text;  }

    const toggleVisibleTasks = () => {
      setVisible((prevVisible) => (prevVisible === filterTasks.length ? 5 : filterTasks.length));
    };
  return (
    <section>
      <h1> To-do List </h1>
      <form onSubmit={saveTask}>
        <input type="text" placeholder="Add task" ref={taskInputRef} required />
        <button type="submit"> {editingTask? 'Update': 'Add'}</button>
      </form>
      <div className="buttons">
        <button onClick={() => setFilter('all')} style={{
          backgroundColor: filter==='all' ? 'orange ':'black'
        }}>Show All</button>
        <button onClick={() => setFilter('completed')}
        style={{
          backgroundColor: filter==='completed' ? 'orange ':'black'
        }}
        >
          Completed
        </button>
        <button onClick={() => setFilter('pending')} style={{
          backgroundColor: filter==='pending' ? 'orange ':'black'
        }}>
          Pending
        </button>
      </div>
      <ul>
        {filterTasks.slice(0,visible).map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTaskCompletion(task.id)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              backgroundColor: task.completed ? '#98FB98' : '#FFB6C1',
            }}
          >
            {`${task.text}`}
            <div className="divButtons">
              <button onClick={() => removeTask(task.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
              <button onClick={() => editTask(task)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </li>
        ))}
      {filterTasks.length >= visible && (
          <li className='seeMore' onClick={toggleVisibleTasks}>
            {visible === filterTasks.length ? 'See Less' : 'See More'}
          </li>
        )}
      </ul>
    </section>
  );
}

export default App;
