import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();

  const [tasks, setTasks] = useState(
    savedTasks ?? [
      { id: "task-1", title: "Learn JS", isDone: false },
      { id: "task-2", title: "Buy a milk", isDone: true },
    ],
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = window.confirm("Are you sure?");

    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prev) => prev.filter((task) => taskId !== task.id));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (taskId === task.id) return { ...task, isDone };
          return task;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isDone: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current.focus();
  }, []);
  // dependencies array ?

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
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
