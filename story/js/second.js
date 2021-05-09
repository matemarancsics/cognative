/************* 
  DRAG & DROP
***************/
function dragNdrop() {
  const list_items = document.querySelectorAll(".list-item");
  const lists = document.querySelectorAll(".list");
  const touchBox = document.getElementById("picked");

  let draggedItem = null;

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener("dragstart", function () {
      draggedItem = item;
      setTimeout(function () {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", function () {
      setTimeout(function () {
        draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });

    item.addEventListener("click", function () {
      isDraggable = true;
    });

    item.addEventListener(
      "touchmove",
      function (event) {
        if (isDraggable) {
          console.log(event);
          var touch = event.targetTouches[0];
          draggedItem = item;

          // Place element where the finger is
          item.style.position = "absolute";
          item.style.width = "20%";
          item.style.left = touch.pageX - 25 + "px";
          item.style.top = touch.pageY - 25 + "px";
          event.preventDefault();
        } else {
          isDraggable = false;
        }
      },
      false
    );

    item.addEventListener("touchend", function (e) {
      if (draggedItem != null) {
        draggedLeft = parseInt(draggedItem.style.left, 10);
        draggedTop = parseInt(draggedItem.style.top, 10);
        if (
          draggedLeft > touchBox.offsetLeft &&
          draggedTop > touchBox.offsetTop
        ) {
          const picked = draggedItem;
          picked.draggable = false;
          picked.style.display = "block";
          picked.style.position = "";
          picked.style.width = "50%";
          $("#picked").append(picked);
          isDraggable = false;
        }
      }
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });

      list.addEventListener("drop", function (e) {
        if (draggedItem != null) {
          this.append(draggedItem);
          this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
      });
    }
  }
}

dragNdrop();

/************* 
      GAME
***************/
const category = document.getElementById("category");
const subCat = document.getElementById("sub-cat");
const homeScreen = document.getElementById("home");
const gameScreen = document.getElementById("game");
const activate = document.getElementById("activate");
const imgViewer = document.getElementById("img-viewer");
const picked = document.getElementById("picked");
const currImg = document.getElementById("img");
const nextBtn = document.getElementById("img-next");

activate.addEventListener("click", () => {
  homeScreen.style.display = "none";
  gameScreen.style.display = "";
  view();
});

nextBtn.addEventListener("click", () => {
  if (picked.firstChild.src != null) {
    view();
  }
});

function openSubCat(item) {
  while (subCat.firstChild) {
    subCat.removeChild(subCat.lastChild);
  }
  const value = $(item).attr("value");
  imgs[value].img.forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    img.classList.add("list-item");
    img.id = "item";
    img.draggable = true;
    subCat.appendChild(img);
  });
  dragNdrop();
}

function view() {
  if (picked.firstChild == picked.lastChild) {
    nextBtn.style.backgroundColor = "red";
    nextBtn.innerText = "Vége";
    nextBtn.addEventListener("click", () => {
      window.location.href = "./menu.html";
    });
  }
  $(currImg).attr("src", picked.firstChild.src);
  picked.removeChild(picked.firstChild);
}

var imgs = [
  {
    img: [
      "../img/animals/1.png",
      "../img/animals/2.png",
      "../img/animals/3.png",
    ],
  },
  {
    img: ["../img/forest/1.png", "../img/forest/2.png", "../img/forest/3.png"],
  },
  {
    img: ["../img/space/1.png", "../img/space/2.png", "../img/space/3.png"],
  },
  {
    img: ["../img/food/1.png", "../img/food/2.png", "../img/food/3.png"],
  },
];
