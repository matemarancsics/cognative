const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const avatarImg = document.getElementById("avatar-img");
const nameInput = document.getElementById("name-input");
const activate = document.getElementById("activate");
const nextBtn = document.getElementById("modal-next");
const homeScreen = document.getElementById("home");
const gameScreen = document.getElementById("game");

/**************** 
      AVATARS
******************/

var avatar1 = "../img/player_1.png";
var avatar2 = "../img/player_2.png";

let currAvatar, currName;
currAvatar = avatar1;

leftArrow.addEventListener("click", pickAvatarLeft);
rightArrow.addEventListener("click", pickAvatarRight);
activate.addEventListener("click", () => {
  if (nameInput.value == "") {
    alert("Kérlek töltsd ki a név mezőt!");
  } else {
    save();
    openModal(document.getElementById("modal"));
  }
});
nextBtn.addEventListener("click", () => {
  homeScreen.style.display = "none";
  gameScreen.style.display = "";
  game();
});

function pickAvatarRight() {
  $("#avatar-img").attr("src", "../img/player_2.png");
  rightArrow.disabled = true;
  leftArrow.disabled = false;
  currAvatar = avatar2;
}

function pickAvatarLeft() {
  $("#avatar-img").attr("src", "../img/player_1.png");
  leftArrow.disabled = true;
  rightArrow.disabled = false;
  currAvatar = avatar1;
}

function save() {
  currName = nameInput.value;
  console.log(currName);
  console.log(currAvatar);
}

/************* 
      MODAL
***************/

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
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

/************* 
  DRAG & DROP
***************/
function dragNdrop() {
  const list_items = document.querySelectorAll(".list-item");
  const lists = document.querySelectorAll(".list");
  const touchBox = document.getElementById("help-ctn");

  let draggedItem = null;
  let isDraggable = false;

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
          $("#help-ctn").append(picked);
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

/************* 
      GAME
***************/
const imgCtn = document.getElementById("img-ctn");
const imgNext = document.getElementById("img-next");
const imgTitle = document.getElementById("img-title");
const listCtn = document.getElementById("list-ctn");
const helpCtn = document.getElementById("help-ctn");
const questionMark = document.getElementById("help");
const header = document.getElementById("header");

let imgCounter = 0;

imgNext.addEventListener("click", nextImg);
questionMark.addEventListener("click", () => {
  listCtn.style.visibility = "";
  helpCtn.style.visibility = "";
});

function game() {
  if (currAvatar == avatar1) {
    $("#img-ctn").attr("src", player1Img[0]);
  }
  if (currAvatar == avatar2) {
    $("#img-ctn").attr("src", player2Img[0]);
  }
  imgTitle.innerText = titles[0];
  imgNext.style.display = "";
  showHelp(helps);
  dragNdrop();
  imgCounter++;
}

function nextImg() {
  listCtn.style.visibility = "hidden";
  helpCtn.style.visibility = "hidden";
  if (imgCounter == player1Img.length - 1) {
    imgNext.style.display = "none";
    questionMark.style.display = "none";
    if (screen.height > screen.width) {
      imgTitle.style.marginTop = "35%";
    } else {
      imgTitle.style.marginTop = "0%";
      imgTitle.style.marginBottom = "10%";
    }
  }
  if (imgCounter < player1Img.length - 1) {
    showHelp(helps);
    dragNdrop();
  }
  if (currAvatar == avatar1) {
    $("#img-ctn").attr("src", player1Img[imgCounter]);
  }
  if (currAvatar == avatar2) {
    $("#img-ctn").attr("src", player2Img[imgCounter]);
  }
  imgTitle.innerText = titles[imgCounter];
  imgCounter++;
}

function showHelp(list) {
  while (listCtn.firstChild) {
    listCtn.removeChild(listCtn.lastChild);
  }
  while (helpCtn.firstChild) {
    helpCtn.removeChild(helpCtn.lastChild);
  }
  list[imgCounter].help.forEach((item) => {
    const div = document.createElement("div");
    div.innerText = item;
    div.classList.add("list-item");
    div.draggable = true;
    listCtn.appendChild(div);
  });
}

/**************** 
      ASSETS
*****************/

var player1Img = [
  "../img/1_girl/1.png",
  "../img/1_girl/2.png",
  "../img/1_girl/3.png",
  "../img/1_girl/4.png",
  "../img/1_girl/5.png",
  "../img/1_girl/6.png",
];

var player2Img = [
  "../img/1_boy/1.png",
  "../img/1_boy/2.png",
  "../img/1_boy/3.png",
  "../img/1_boy/4.png",
  "../img/1_boy/5.png",
  "../img/1_boy/6.png",
];

var titles = [
  "Hogyan indult a reggelünk?",
  "Amikor elindultunk.",
  "Mi történt útközben?",
  "Az óvodában/iskolában.",
  "Újra otthon.",
  "Itt a vége, fuss el véle, elérkeztünk a mai mese befejezéséhez.Látod, gyermeked is alszik már, és hogy miről álmodik, azt talán már egy másik mese rejti. Holnap pedig mi is egy másik történettel folytatjuk.",
];

var helps = [
  {
    help: [
      "Hol volt, hol nem volt, vol egyszer egy...",
      "Képzeld el, volt egy kisfiú/kislány, aki...",
      "...nagyon izgatottan ébredt, alig várta már, hogy reggel legyen, mert...",
      "Aznap anyukája/apukája ébresztette úgy, hogy bevitt neki...",
      "Azt álmodta, hogy...",
      "Azon gondolkodott, hogy...",
      "Anyukája/apukája azt tervezte aznapra, hogy...",
      "Ez a nap különleges volt, mert...",
      "Az ablakon kinézve látta, hogy...",
      "Sietve, mert aznap elaludt...",
      "A hasára sütött a nap...",
      "Igazi álomszuszék volt...",
    ],
  },
  {
    help: [
      "Alaposan felöltöztek, mert...",
      "Nyári ruha volt rajtuk, mert...",
      "A legcsinosabb ünneplője volt rajta, mert...",
      "Iskolatáskája a hátán nagyon nehéz volt, mert...",
      "Alig várta már az indulást, mert...",
      "Amint kiléptek az ajtón, egyszer csak...",
      "Hirtelen eszükbe jutott, hogy...",
      "Azt tervezték, hogy...",
      "Sietniük kellett, mert...",
      "Az út nagyon... (valamilyennek ígérkezett)",
      "Körülöttük ... (mesélj a tájról, a környékről)",
      "Felettük az ég... (mondj valamit az időjárásról)",
    ],
  },
  {
    help: [
      "Mentek, mendegéltek, egyszer csak...",
      "Megállította őket egy...",
      "Amíg várták a buszt/trolit/villamost...",
      "Szerencséd, hogy öreganyámnak szólítottál, különben...",
      "Elvarázsolta őket...",
      "Észrevették, hogy eltévedtek...",
      "Annyira siettek, hogy...",
      "Addig kellett ott várniuk, amíg...",
      "Vissza kellett menniük, mert...",
      "Út közben arról, beszélgettek...",
      "Nézegette a tájat, mert...",
      "Örült, hogy...",
      "Izgatott volt, mert...",
      "Megálltak, hogy megnézzék...",
      "Megpróbálták megsimogatni, de...",
    ],
  },
  {
    help: [
      "Amint kinyitotta az ajtót...",
      "Amint belépett a terembe, látta, hogy...",
      "Kicsit izgult, mert tudta...",
      "Egész nap azon járt az esze...",
      "Elővette a felszerelését és...",
      "Ebédre aznap...",
      "Levette kedvenc játékát a polcról...",
      "Odament hozzá...",
      "Elvette tőle...",
      "Sírt, mert...",
      "Nagyon örült, hogy...",
      "Nem volt ott, mert...",
      "Hallgattak egy mesét, amiben...",
      "Elmondta a barátjának, hogy...",
      "Kint az udvaron...",
      "Odament az óvó/tanító nénihez...",
      "Odament hozzá az óvó/tanító néni...",
      "Megszidták, mert...",
      "Megdicsérték, hogy...",
      "Büszke volt magára...",
      "Megírták a ...",
      "Kiosztották a ...",
      "Alig várta, hogy...",
      "Amikor kicsengettek...",
    ],
  },
  {
    help: [
      "Amikor hazaért...",
      "Úgy rohant haza, ahogy a lába bírta...",
      "Autóval jöttek érte, mert...",
      "Amikor felszálltak a...",
      "Amikor meglátta anyát/apát az ajtóban...",
      "Már kész volt a házi feladata, ezért...",
      "Amikor együtt leültek vacsorázni...",
      "Végre játszhatott egy kicsit...",
      "Arról beszéltek anyával/apával...",
      "Visszaváltoztatta őt...",
      "Megtalálta végre, ezért...",
      "Hazavitte, hogy...",
      "Alig várta, hogy elmesélhesse...",
      "Nem volt kedve fogat mosni, ezért...",
      "Örült, hogy...",
      "Elmondta, hogy...",
      "Amikor egyszer csak megszólalt a telefon és...",
      "Anya/apa benyitott, hogy ideje lefeküdni...",
      "Még égett a villany, amikor...",
      "Mielőtt elaludt, arra gondolt, hogy...",
      "Várta a másnapot, mert...",
    ],
  },
];
