import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import AddTaskForm from "./AddTaskForm";
import ToDoList from "./ToDoList";
import { TasksContext } from "../context/TasksContext";
import { useContext } from "react";

const ToDo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <ToDoInfo />
      <button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        Show first incomplete task
      </button>
      <ToDoList />
    </div>
  );
};

export default ToDo;
