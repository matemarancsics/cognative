const homeScreen = document.getElementById("home");
const introScreen = document.getElementById("intro");
const startButton = document.getElementById("start");
const video = document.getElementById("video");
const openMenu = document.getElementById("open-menu");
const skip = document.getElementById("skip");

startButton.addEventListener("click", start);

function start() {
  homeScreen.style.display = "none";
  introScreen.style.display = "";
  video.play();
}

$("#video").on("ended", function () {
  console.log("ended");
  openMenu.style.display = "";
  skip.style.display = "none";
});

//MODAL
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  video.pause();
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  video.play();
}
