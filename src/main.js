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

function renderTasks() {
  const tbody = document.getElementById("tbody");
  const tasksFromLS = getFromLocalStorage();
  tasksFromLS.forEach((task) => {
    const row = document.createElement("tr");
    row.id = `${task.id}`;
    row.classList.add("text-center", "border", "h-full", "w-full");

    // taskName column
    const taskNameCol = document.createElement("td");
    taskNameCol.classList.add("border-l-2", "border-b-2", "py-4", "pl-6");
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
      `${handlePriority(task.taskPriority)}`,
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
      `${handleStatus(task.taskStatus)}`,
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
      "px-3",
      "font-bold"
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
    taskActionsCol.append(taskActionsSec);

    // delete
    const deleteTask = document.createElement("button");
    deleteTask.classList.add("bg-red-600", "px-1", "rounded", "text-center");
    deleteTask.id = `${task.id}`;
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/delete.svg";
    deleteIcon.alt = "delete";
    deleteTask.append(deleteIcon);
    taskActionsSec.append(deleteTask);

    // edit
    const editTask = document.createElement("button");
    editTask.classList.add("bg-blue-600", "px-1", "rounded", "text-center");
    editTask.id = `${task.id}`;
    const editIcon = document.createElement("img");
    editIcon.src = "./assets/edit.svg";
    editIcon.alt = "edit";
    editTask.append(editIcon);
    taskActionsSec.append(editTask);
  });
}

function handlePriority(priority) {
  return priority === "Low"
    ? '"border-gray-300", "bg-gray-300", "text-gray-700"'
    : priority === "Medium"
    ? '"border-yellow-500", "bg-yellow-500", "text-gray-700"'
    : '"border-red-600", "bg-red-600", "text-gray-100"';
}

function handleStatus(status) {
  return status === "Todo"
    ? '"border-red-600", "bg-red-600", "text-gray-100"'
    : status === "Doing"
    ? '"border-yellow-500", "bg-yellow-500", "text-gray-700"'
    : '"border-green-800", "bg-green-800", "text-gray-100"';
}
