const homeScreen = document.getElementById("home");
const gameScreen = document.getElementById("game");
const activate = document.getElementById("activate");
const imgViewer = document.getElementById("img-viewer");
const currImg = document.getElementById("img");
const nextBtn = document.getElementById("img-next");
const rangeValue = document.getElementById("rangeValue");

let limit = rangeValue.innerHTML;
var srcArray = [];
let counter;

function rangeSlide(value) {
  rangeValue.innerHTML = value;
  limit = value;
}

activate.addEventListener("click", () => {
  homeScreen.style.display = "none";
  gameScreen.style.display = "";
  counter = 0;
  randomImg(limit);
  imgView();
});

nextBtn.addEventListener("click", imgView);

function randomImg(value) {
  for (let i = 0; i < value; i++) {
    var rand = Math.floor(Math.random() * imgs.length - 1) + 1;
    srcArray.push(imgs[rand]);
  }
}

function imgView() {
  if (counter == srcArray.length - 1) {
    nextBtn.style.backgroundColor = "red";
    nextBtn.innerText = "Vége";
    nextBtn.addEventListener("click", () => {
      window.location.href = "./menu.html";
    });
  }
  $(currImg).attr("src", srcArray[counter]);
  counter++;
}

var imgs = [
  "../img/animals/1.png",
  "../img/animals/2.png",
  "../img/animals/3.png",
  "../img/forest/1.png",
  "../img/forest/2.png",
  "../img/forest/3.png",
  "../img/space/1.png",
  "../img/space/2.png",
  "../img/space/3.png",
  "../img/food/1.png",
  "../img/food/2.png",
  "../img/food/3.png",
];
