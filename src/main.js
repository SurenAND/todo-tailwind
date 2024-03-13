// persian date picker
jalaliDatepicker.startWatch();

let tasks = [];

// open or close modals
function closeModal(item) {
  item.classList.add("invisible");
}
function openModal(item) {
  item.classList.remove("invisible");
}

// addModal
const addBtn = document.getElementById("add");
const modalBox = document.getElementById("modal-box");

// close add modal
modalBox.addEventListener("click", (e) => {
  e.target.dataset.close ? closeModal(modalBox) : null;
});
// close with cancel btn
const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", () => closeModal(modalBox));

// open add modal
addBtn.addEventListener("click", () => {
  openModal(modalBox);
});

// addModal form
const addForm = document.getElementById("form");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addToData(e.target);
  closeModal(modalBox);
});

function addToData(target) {
  // get data
  const task = target.querySelector('input[name="task-name"]');
  const priority = target.querySelector('input[name="priority"]:checked');
  const status = target.querySelector('input[name="status"]:checked');
  const deadline = target.querySelector('input[name="deadline"]');
  const desc = target.querySelector('textarea[name="description"]');
  const newTask = {
    id: Date.now(),
    taskName: task.value,
    taskPriority: priority.value,
    taskStatus: status.value,
    taskDeadline: deadline.value,
    taskDescription: desc.value,
  };
  const isNotEmpty = getFromLocalStorage();
  if (isNotEmpty) {
    tasks = getFromLocalStorage();
  }
  tasks.push(newTask);
  addToLocalStorage(tasks);
}

function addToLocalStorage(tasks) {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  renderTasks();
}

function getFromLocalStorage() {
  return localStorage.getItem("Tasks")
    ? JSON.parse(localStorage.getItem("Tasks"))
    : "";
}

renderTasks();

function renderTasks() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  const tasksFromLS = getFromLocalStorage();
  if (tasksFromLS) {
    tasksFromLS.forEach((task) => {
      const row = document.createElement("tr");
      row.id = `${task.id}`;
      row.classList.add("text-center", "border", "h-full", "w-full");

      // taskName column
      const taskNameCol = document.createElement("td");
      taskNameCol.classList.add(
        "text-start",
        "border-l-2",
        "border-b-2",
        "py-4",
        "pl-6"
      );
      taskNameCol.innerText = `${task.taskName}`;
      row.append(taskNameCol);

      // taskPriority column
      const taskPriorityCol = document.createElement("td");
      taskPriorityCol.classList.add("border-l-2", "border-b-2");
      const prioritySpan = document.createElement("span");
      prioritySpan.classList.add(
        "select-none",
        "rounded-3xl",
        "border-2",
        `${handlePriorityBorder(task.taskPriority)}`,
        `${handlePriorityBg(task.taskPriority)}`,
        `${handlePriorityText(task.taskPriority)}`,
        "py-1",
        "px-3",
        "font-bold"
      );
      prioritySpan.innerText = `${task.taskPriority}`;
      taskPriorityCol.append(prioritySpan);
      row.append(taskPriorityCol);

      // taskStatus column
      const taskStatusCol = document.createElement("td");
      taskStatusCol.classList.add("border-l-2", "border-b-2");
      const statusSpan = document.createElement("span");
      statusSpan.classList.add(
        "select-none",
        "rounded-3xl",
        "border-2",
        `${handleStatusBorder(task.taskStatus)}`,
        `${handleStatusBg(task.taskStatus)}`,
        `${handleStatusText(task.taskStatus)}`,
        "py-1",
        "px-3",
        "font-bold"
      );
      statusSpan.innerText = `${task.taskStatus}`;
      taskStatusCol.append(statusSpan);
      row.append(taskStatusCol);

      // taskDeadline column
      const taskDeadlineCol = document.createElement("td");
      taskDeadlineCol.classList.add("border-l-2", "border-b-2");
      const deadlineSpan = document.createElement("span");
      deadlineSpan.classList.add(
        "select-none",
        "rounded-3xl",
        "border-2",
        "border-blue-400",
        "py-1",
        "px-3"
      );
      deadlineSpan.innerText = `${task.taskDeadline}`;
      taskDeadlineCol.append(deadlineSpan);
      row.append(taskDeadlineCol);

      // taskActions column
      const taskActionsCol = document.createElement("td");
      taskActionsCol.classList.add("border-l-2", "border-b-2");
      const taskActionsSec = document.createElement("div");
      taskActionsSec.classList.add(
        "flex",
        "flex-col",
        "md:block",
        "items-center",
        "justify-center",
        "p-2",
        "gap-1"
      );

      // delete
      const deleteTask = document.createElement("button");
      deleteTask.classList.add("bg-red-600", "mx-1", "rounded", "text-center");
      deleteTask.id = `${task.id}`;
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "./assets/delete.svg";
      deleteIcon.alt = "delete";
      deleteIcon.classList.add("w-5", "my-1", "mx-2");
      deleteTask.append(deleteIcon);
      taskActionsSec.append(deleteTask);

      // edit
      const editTask = document.createElement("button");
      editTask.classList.add("bg-blue-600", "mx-1", "rounded", "text-center");
      editTask.id = `${task.id}`;
      const editIcon = document.createElement("img");
      editIcon.src = "./assets/edit.svg";
      editIcon.alt = "edit";
      editIcon.classList.add("w-5", "my-1", "mx-2");
      editTask.append(editIcon);
      taskActionsSec.append(editTask);

      // view
      const viewTask = document.createElement("button");
      viewTask.classList.add("bg-gray-500", "mx-1", "rounded", "text-center");
      viewTask.id = `${task.id}`;
      const viewIcon = document.createElement("img");
      viewIcon.src = "./assets/view.svg";
      viewIcon.alt = "view";
      viewIcon.classList.add("w-5", "my-1", "mx-2");
      viewTask.append(viewIcon);
      taskActionsSec.append(viewTask);

      // append taskActionsSec
      taskActionsCol.append(taskActionsSec);
      row.append(taskActionsCol);

      // append new row
      tbody.append(row);

      // delete
      deleteTask.addEventListener("click", (e) => {
        confirmAndDelete(e, row);
      });
    });
  }
}

function handlePriorityBorder(priority) {
  return priority === "Low"
    ? "border-gray-300"
    : priority === "Medium"
    ? "border-yellow-500"
    : "border-red-600";
}
function handlePriorityBg(priority) {
  return priority === "Low"
    ? "bg-gray-300"
    : priority === "Medium"
    ? "bg-yellow-500"
    : "bg-red-600";
}
function handlePriorityText(priority) {
  return priority === "Low"
    ? "text-gray-700"
    : priority === "Medium"
    ? "text-gray-700"
    : "text-gray-100";
}

function handleStatusBorder(status) {
  return status === "Todo"
    ? "border-red-600"
    : status === "Doing"
    ? "border-yellow-500"
    : "border-green-800";
}
function handleStatusBg(status) {
  return status === "Todo"
    ? "bg-red-600"
    : status === "Doing"
    ? "bg-yellow-500"
    : "bg-green-800";
}
function handleStatusText(status) {
  return status === "Todo"
    ? "text-gray-100"
    : status === "Doing"
    ? "text-gray-700"
    : "text-gray-100";
}

function confirmAndDelete(e, selectedRow) {
  e.preventDefault();

  // remove the selected section
  selectedRow.remove();

  // get button id as index of the object that should removed from input array
  const idToDelete = +selectedRow.id;
  const localStorageData = getFromLocalStorage();
  const index = localStorageData.findIndex((item) => item.id === idToDelete);
  localStorageData.splice(index, 1);
  addToLocalStorage(localStorageData);
}
