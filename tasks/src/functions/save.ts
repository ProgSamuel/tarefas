import { taskRef } from "../App";
// import { v4 as uuidv4 } from "uuid";

export default function saveTask(e:any) {
    e.preventDefault();
    // const id = uuidv4()
    const task = taskRef.current?.value
    // localStorage.setItem( useId(), taskRef.current.value)
      console.log(task);
}

