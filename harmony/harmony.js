const screenHome = document.getElementById("screen-home");
const screenGame = document.getElementById("screen-game");
const screenInfo = document.getElementById("screen-info");
const nextButton = document.getElementById("next-btn");
const quitButton = document.getElementById("cancel");
const infoButton = document.getElementById("info");
const playButton = document.getElementById("play");
const loopButton = document.getElementById("loop");
const quitInfoButton = document.getElementById("cancel-info");

nextButton.addEventListener("click", start);
quitButton.addEventListener("click", quit);
infoButton.addEventListener("click", info);
quitInfoButton.addEventListener("click", quitInfo);
playButton.addEventListener("click", () => {
  if (counter == 9) {
    document.getElementById("light-win").style.display = "block";
    document.getElementById("fade-win").style.display = "block";
  } else {
    playAudio(counter);
  }
  if (counter % 3 == 0) {
    document.getElementById("second-ctn").style.visibility = "hidden";
    document.getElementById("first-ctn").style.visibility = "";
    document.getElementById("first-ctn").style.borderColor = "orange";
    document.getElementById("second-ctn").style.borderColor = "";
  }
  if (counter % 3 == 1) {
    document.getElementById("first-ctn").style.visibility = "hidden";
    document.getElementById("second-ctn").style.visibility = "";
    document.getElementById("second-ctn").style.borderColor = "orange";
    document.getElementById("first-ctn").style.borderColor = "";
  }
  if (counter % 3 == 2) {
    document.getElementById("first-ctn").style.visibility = "";
    document.getElementById("second-ctn").style.visibility = "";
    document.getElementById("first-ctn").style.borderColor = "orange";
    document.getElementById("second-ctn").style.borderColor = "orange";
  }
  playButton.style.visibility = "hidden";
  $("#loop-img").attr("src", "./img/loop.png");
  counter++;
});
loopButton.addEventListener("click", () => {
  playAudio(counter - 1);
  clicks = 0;
  prevClick = 0;
  answerCount = 0;
});

function start() {
  screenHome.style.display = "none";
  screenGame.style.display = "";
  $("#player-1").attr("src", currAvatar1);
  $("#player-2").attr("src", currAvatar2);
  $("#loop-img").attr("src", "./img/unloop.png");
}

function quit() {
  screenHome.style.display = "";
  screenGame.style.display = "none";
  $("#img-active-1").attr("src", "./img/active.png");
  $("#img-active-2").attr("src", "./img/active.png");
  counter = 0;
  clicks = 0;
  prevClick = 0;
  answerCount = 0;
  teamCount = 0;
  soundCount = 0;
  playButton.style.visibility = "";
  isPlayed = false;
  document.getElementById("first-ctn").style.visibility = "";
  document.getElementById("second-ctn").style.visibility = "";
  document.getElementById("first-ctn").style.borderColor = "black";
  document.getElementById("second-ctn").style.borderColor = "black";
}

function quitInfo() {
  screenHome.style.display = "";
  screenInfo.style.display = "none";
}

function info() {
  screenHome.style.display = "none";
  screenInfo.style.display = "";
}

/**************** 
      AVATARS
******************/

const leftArrow1 = document.getElementById("left-1");
const rightArrow1 = document.getElementById("right-1");
const leftArrow2 = document.getElementById("left-2");
const rightArrow2 = document.getElementById("right-2");
const avatarImg1 = document.getElementById("avatar-img-1");
const avatarImg2 = document.getElementById("avatar-img-2");

var avatar1 = "./img/player_1.png";
var avatar2 = "./img/player_2.png";

let currAvatar1, currAvatar2;
currAvatar1 = avatar1;
currAvatar2 = avatar1;

leftArrow1.addEventListener("click", pickAvatar1Left);
rightArrow1.addEventListener("click", pickAvatar1Right);
leftArrow2.addEventListener("click", pickAvatar2Left);
rightArrow2.addEventListener("click", pickAvatar2Right);

function pickAvatar1Right() {
  $("#img-active-1").attr("src", "./img/active.png");
  $("#avatar-img-1").attr("src", "./img/player_2.png");
  rightArrow1.disabled = true;
  leftArrow1.disabled = false;
  currAvatar1 = avatar2;
}

function pickAvatar1Left() {
  $("#img-active-1").attr("src", "./img/active.png");
  $("#avatar-img-1").attr("src", "./img/player_1.png");
  leftArrow1.disabled = true;
  rightArrow1.disabled = false;
  currAvatar1 = avatar1;
}

function pickAvatar2Right() {
  $("#img-active-2").attr("src", "./img/active.png");
  $("#avatar-img-2").attr("src", "./img/player_2.png");
  rightArrow2.disabled = true;
  leftArrow2.disabled = false;
  currAvatar2 = avatar2;
}

function pickAvatar2Left() {
  $("#img-active-2").attr("src", "./img/active.png");
  $("#avatar-img-2").attr("src", "./img/player_1.png");
  leftArrow2.disabled = true;
  rightArrow2.disabled = false;
  currAvatar2 = avatar1;
}

/**************** 
      GAME
******************/
var counter = 0;
var teamCount = 0;
var soundCount = 0;
var answerCount = 0;
var prevClick = 0;
var clicks = 0;
var isPlayed = false;

$(".svg").on("click", function (e) {
  console.log($(this).prop("id"));
  if (!isPlayed) return;
  clicks++;
  playSound(teamCount, $(this).prop("id") == "btn-1" ? 0 : 1);
  prevClick == 0 ? (prevClick = e.timeStamp / 1000) : false;
  if (clicks != 1) {
    if (
      e.timeStamp / 1000 - prevClick < answers[soundCount][clicks - 2] + 0.5 &&
      e.timeStamp / 1000 - prevClick > answers[soundCount][clicks - 2] - 0.5
    ) {
      console.log("jó");
      answerCount++;
      if (answerCount == answers[soundCount].length) {
        isPlayed = false;
        soundCount++;
        playButton.style.visibility = "";
        console.log("vége");
        document.getElementById("light").style.display = "block";
        document.getElementById("fade").style.display = "block";
        answerCount = 0;
        clicks = 0;
        if (counter % 3 == 0) {
          teamCount++;
        }
      }
    } else {
      console.log("rossz");
      document.getElementById("light-2").style.display = "block";
      document.getElementById("fade-2").style.display = "block";
      clicks = 0;
      prevClick = 0;
      answerCount = 0;
    }
  }
  prevClick = e.timeStamp / 1000;
});

function playAudio(index) {
  var audio = new Audio();
  audio.volume = 0.3;
  audio.loop = false;
  audio.src = playlist[index];
  audio.play();
  isPlayed = true;
}

function playSound(array, index) {
  var audio = new Audio();
  audio.volume = 0.3;
  audio.loop = false;
  audio.src = sound[array][index];
  audio.play();
}

var playlist = new Array(
  "sounds/1.wav",
  "sounds/2.wav",
  "sounds/3.wav",
  "sounds/4.wav",
  "sounds/5.wav",
  "sounds/6.wav",
  "sounds/7.wav",
  "sounds/8.wav",
  "sounds/9.wav"
);

var answers = [
  [0.84],
  [0.84, 0.84],
  [0.34, 0.1, 0.34, 0.1],
  [0.84, 0.84],
  [0.84, 0.84],
  [0.15, 0.6, 0.15, 0.6, 0.15],
  [0.34, 0.34, 0.34, 0.34],
  [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  [0.0, 0.15, 0.15, 0.0, 0.15, 0.15, 0.0],
];

var sound = new Array(
  ["sounds/sound_1.wav", "sounds/sound_2.wav"],
  ["sounds/sound_4.wav", "sounds/sound_5.wav"],
  ["sounds/sound_7.wav", "sounds/sound_8.wav"]
);
