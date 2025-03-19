"use strict";

{
  let tasks = [
    { id: 1, name: "Take out the trash", done: true },
    { id: 2, name: "Do the laundry", done: false },
    { id: 3, name: "Walk the dog", done: true },
  ];
  let hideDoneTasks = false;

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      tasks = JSON.parse(savedTasks) || tasks;
    } catch (e) {
      tasks = [];
    }
  };

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

  const setAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const hideAllTasksDone = () => {
    hideDoneTasks = !hideDoneTasks;
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

  const formButtonListener = () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", onFormSubmit);
  };

  const hideAllDoneTasksListener = () => {
    const hideButton = document.querySelector(".tasks__button--hide");

    if (hideButton) {
      hideButton.addEventListener("click", hideAllTasksDone);
    }
  };

  const finishAllTasksListener = () => {
    const finishButton = document.querySelector(".tasks__button--finish");

    if (finishButton) {
      finishButton.addEventListener("click", setAllTasksDone);
    }
  };

  const taskButtonsListeners = () => {
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
    const filteredTasks = hideDoneTasks
      ? tasks.filter((task) => !task.done)
      : tasks;

    tasksList.innerHTML = filteredTasks
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
  };

  const renderButtons = () => {
    const tasksButtons = document.querySelector(".tasks__buttons");
    const isOneTasksDone = tasks.some((task) => task.done);
    const isAllTasksDone = tasks.every((task) => task.done);
    const stateButtonHide = isOneTasksDone ? "" : "disabled";
    const stateButtonFinish = isAllTasksDone ? "disabled" : "";
    const toggleHideButtonText = hideDoneTasks
      ? "Show completed"
      : "Hide completed";

    tasks.length > 0
      ? (tasksButtons.innerHTML = `
        <button
          class="tasks__button tasks__button--hide" ${stateButtonHide}>
          ${toggleHideButtonText}
        </button>
        <button
          class="tasks__button tasks__button--finish" ${stateButtonFinish}>
          Finish all
        </button>
      `)
      : (tasksButtons.innerHTML = "");
  };

  const bindListeners = () => {
    formButtonListener();
    taskButtonsListeners();
    hideAllDoneTasksListener();
    finishAllTasksListener();
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindListeners();
    saveTasks();
  };

  const init = () => {
    loadTasks();
    render();
  };

  init();
}
