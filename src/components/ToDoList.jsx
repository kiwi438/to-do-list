import ToDoItem from "./ToDoItem";
import { memo, useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const ToDoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet.</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Task not found.</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <ToDoItem
          className="todo__item"
          key={task.id}
          // id={task.id}
          // title={task.title}
          // isDone={task.isDone}
          {...task}
        />
      ))}
    </ul>
  );
};

export default memo(ToDoList);
