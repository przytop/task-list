"use strict";

{
  let tasks = [
    { id: 1, name: "Take out the trash", done: true },
    { id: 2, name: "Do the laundry", done: false },
    { id: 3, name: "Walk the dog", done: true },
  ];

  const addTask = (taskName) => {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      name: taskName,
      done: false,
    };

    tasks = [...tasks, newTask];
    render();
  };

  const removeTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    render();
  };

  const toggleTask = (taskId) => {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    render();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const input = document.querySelector(".form__input");
    const value = input.value.trim();

    if (value) {
      addTask(value);
      input.value = "";
    }
    input.focus();
  };

  const bindFormButtonListener = () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", onFormSubmit);
  };

  const bindTaskButtonsListeners = () => {
    const toggleButtons = document.querySelectorAll(".task__button--toggle");
    const removeButtons = document.querySelectorAll(".task__button--remove");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = Number(button.dataset.id);
        toggleTask(taskId);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = Number(button.dataset.id);
        removeTask(taskId);
      });
    });
  };

  const renderTasks = () => {
    const tasksList = document.querySelector(".tasks__list");

    tasksList.innerHTML = tasks
      .map(
        (task) => `
        <li class="task__element">
          <button class="task__button task__button--toggle" data-id="${
            task.id
          }">${task.done ? "✅" : "🔲"}</button>
          <span class="task__text ${task.done ? "task__text--done" : ""}">${
          task.name
        }</span>
          <button class="task__button task__button--remove" data-id="${
            task.id
          }">❌</button>
        </li>
        `
      )
      .join("");

    bindTaskButtonsListeners();
  };

  const renderButtons = () => {};

  const bindListeners = () => {
    bindFormButtonListener();
  };

  const render = () => {
    renderTasks();
    bindListeners();
  };

  const init = () => {
    render();
  };

  init();
}
