import React, { useRef } from 'react';
import { ButtonStyled } from './Components/Button';

function App() {
  const taskRef = useRef<HTMLInputElement | null>(null);

  function saveTask(e: React.FormEvent) {
    e.preventDefault();
    const task = taskRef.current?.value;
    console.log(task);
  }

  return (
    <>
      <form onSubmit={saveTask}>
        <input type="text" placeholder='Add task' ref={taskRef} />
        <ButtonStyled type="submit">Add</ButtonStyled>
      </form>
    </>
  );
}

export default App;
