import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import tasksAPI from "../api/tasksAPI.js";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      setTasks([]);

      tasksAPI.deleteAll(tasks).then(() => setTasks([]))
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {

      tasksAPI.delete(taskId)
          .then(() => {
            setTasks((prev) => prev.filter((task) => taskId !== task.id));
          })
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {


      tasksAPI.toggleComplete(taskId, isDone)
          .then(() => {
            setTasks((prev) =>
                prev.map((task) => {
                  if (taskId === task.id) return { ...task, isDone };
                  return task;
                }),
            );
          })
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

   tasksAPI.add(newTask)
        .then((addedTask) => {
          setTasks((prev) => [...prev, addedTask]);
          setNewTaskTitle("");
          setSearchQuery("");
          newTaskInputRef.current.focus();
        })
  }, []);
  // dependencies array ?

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll().then((setTasks))
  }, []);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++; // Для чего current
    console.log(`Renders: ${renderCount.current}`);
  });

  // Сделать debounce
  // ??
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);
  // Вычисляется из 2х других состояний
  //
  return {
    tasks,
    filteredTasks,
    deleteAllTasks,
    deleteTask,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
