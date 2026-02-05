import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import AddTaskForm from "./AddTaskForm";
import ToDoList from "./ToDoList";

const ToDo = () => {
  const tasks = [
    { id: "task-1", title: "Learn JS", isDone: false },
    { id: "task-2", title: "Buy a milk", isDone: true },
  ];

  const deleteAllTasks = () => {};

  const deleteTask = (taskId) => {};

  const toggleTaskComplete = (taskId, isDone) => {};

  const filterTasks = (query) => {}; // make debounce

  const addTask = () => {};

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm onSearchInput={filterTasks} />
      <ToDoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <ToDoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default ToDo;
