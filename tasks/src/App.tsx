import { ButtonStyled } from './Components/Button';
import { useRef } from 'react';
import saveTask from './functions/save';

export const taskRef = useRef<HTMLInputElement | null>(null); 
function App() {

  return (
    <>
      <form onSubmit={saveTask}>
        <input type="text" placeholder='Add task' ref={taskRef} />
        <ButtonStyled type='submit'> Add </ButtonStyled>
      </form>
    </>
  );
}

export default App;
