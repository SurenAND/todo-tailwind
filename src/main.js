// persian date picker
jalaliDatepicker.startWatch();
// let date = document.querySelector("input");
// date.addEventListener("change", () => {
//   alert(date.value);
// });

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
  addToData(e);
  closeModal(modalBox);
});
