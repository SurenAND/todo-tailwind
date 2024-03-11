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

// open add modal
addBtn.addEventListener("click", () => {
  openModal(modalBox);
});
