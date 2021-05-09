const screenMain = document.getElementById("screen-main");
const screenInfo = document.getElementById("screen-info");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const infoButton = document.getElementById("info");
const quitInfoButton = document.getElementById("cancel-info");
const questionContainerElement = document.getElementById("question-container");
const questionContainerElement2 = document.getElementById(
  "question-container-2"
);
const questionElement = document.getElementById("question");
const questionElement2 = document.getElementById("question-2");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButtonsElement2 = document.getElementById("answer-buttons-2");

let shuffledQuestions, currentQuestionIndex, counter, guide;
var arrOfAnswers = [];
var arrOfQuestions = [];

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex += 2;
  counter++;
  $("#audio-fail")[0].pause();
  setNextQuestion();
});
playButton.addEventListener("click", play);
pauseButton.addEventListener("click", pause);
infoButton.addEventListener("click", info);
quitInfoButton.addEventListener("click", quitInfo);

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  counter = 0;
  guide = 0;
  arrOfQuestions = [];
  arrOfAnswers = [];
  questionContainerElement.classList.remove("hide");
  questionContainerElement2.classList.remove("hide");
  $("#audio-fail")[0].pause();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(
    shuffledQuestions[currentQuestionIndex],
    shuffledQuestions[currentQuestionIndex + 1]
  );
}

function showQuestion(question, question2) {
  questionElement.innerText = question.question;
  arrOfQuestions.push(questionElement.innerText);
  questionElement2.innerText = question2.question;
  arrOfQuestions.push(questionElement2.innerText);
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  question2.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement2.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    answerButtonsElement2.removeChild(answerButtonsElement2.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  selectedButton.dataset.correct = true;
  if (selectedButton.dataset.correct) {
    guide++;
    arrOfAnswers.push(selectedButton.innerText);
  }
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  Array.from(answerButtonsElement2.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (counter == 1 && guide % 2 == 0) {
    startButton.innerText = "Újrakezdés";
    startButton.classList.remove("hide");
    console.log(arrOfQuestions);
    console.log(arrOfAnswers);
  } else if (guide % 2 == 0) {
    nextButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
}

function play(e) {
  var rand = Math.floor(Math.random() * src.length);
  $("#audio-fail source").attr("src", src[rand]);
  $("#audio-fail")[0].load();
  $("#audio-fail")[0].play();
}

function pause(e) {
  $("#audio-fail")[0].pause();
}

function info() {
  screenMain.style.display = "none";
  screenInfo.style.display = "";
}

function quitInfo() {
  screenMain.style.display = "";
  screenInfo.style.display = "none";
}

var src = ["audios/1.mp3", "audios/2.mp3", "audios/3.mp3", "audios/4.mp3"];

const questions = [
  {
    question: "Hogy tetszett a történet?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Milyen hangulatú volt a mese?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Milyen érzés volt hallgatni a történetet?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Milyen kedved volt miközben hallgattad a mesét?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Ha veled történne ilyen, hogyan reagálnál?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Milyen volt a kedved a történet elején?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Milyen volt a kedved a történet végén?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
  {
    question: "Mennyire volt tanulságos a történet?",
    answers: [
      { text: "😥", correct: false, value: 1 },
      { text: "🙁", correct: false, value: 2 },
      { text: "😐", correct: false, value: 3 },
      { text: "🙂", correct: false, value: 4 },
      { text: "😀", correct: false, value: 5 },
      { text: "😁", correct: false, value: 6 },
      { text: "😆", correct: false, value: 7 },
    ],
  },
];