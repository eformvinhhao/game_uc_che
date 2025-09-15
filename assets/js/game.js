const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const diem_tongText = document.getElementById("diem_tong");
const so_cau_saiText = document.getElementById("so_cau_sai");
const thoi_gian_su_dungText = document.getElementById("thoi_gian_su_dung");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let diem_tong = 0;
let so_cau_sai = 0;
let diem_tru_so_cau_sai = 0;
let thoi_gian_su_dung = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "TDS của still là bao nhiêu?",
    "choice1": "375",
    "choice2": "700",
    "choice3": "1900",
    "choice4": "80",
    "answer": 1
  },
  {
    "question": "TDS của pet gas là bao nhiêu?",
    "choice1": "375",
    "choice2": "700",
    "choice3": "1900",
    "choice4": "80",
    "answer": 3
  },
  {
    "question": "TDS của vivant là bao nhiêu?",
    "choice1": "375",
    "choice2": "700",
    "choice3": "1900",
    "choice4": "80",
    "answer": 4
  },
  {
    "question": "Brix của final syrup Lemona là bao nhiêu?",
    "choice1": "375",
    "choice2": "700",
    "choice3": "1900",
    "choice4": "80",
    "answer": 4
  },
  {
    "question": "Brix của final syrup Wake up 247 là bao nhiêu?",
    "choice1": "375",
    "choice2": "700",
    "choice3": "1900",
    "choice4": "80",
    "answer": 4
  },
  {
    "question": "Vĩnh Hảo đang được chứng nhận GCN nào về hệ thống quản lý ATVSTP",
    "choice1": "BRC",
    "choice2": "FSSC",
    "choice3": "ISO 22000",
    "choice4": "ISO 14000",
    "answer": 2
  }
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 4;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  diem_tong = 100;
  availableQuesions = [...questions];
  getNewQuestion();
  // Timer
  setInterval(function () {
    thoi_gian_su_dung --;
    diem_tong --;
    diem_tongText.innerText = diem_tong;
    thoi_gian_su_dungText.innerText = thoi_gian_su_dung;
    so_cau_saiText.innerText = so_cau_sai;
    if (diem_tong === 0 || so_cau_sai === 1) {
      localStorage.setItem("diem_tong", diem_tong);
      localStorage.setItem("so_cau_sai", so_cau_sai);
      localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung)

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("diem_tong", diem_tong);
    localStorage.setItem("so_cau_sai", so_cau_sai);
    localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung)

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  diem_tong -= num;
  diem_tongText.innerText = diem_tong;
  thoi_gian_su_dungText.innerText = thoi_gian_su_dung;
  so_cau_sai++;
  diem_tru_so_cau_sai = diem_tru_so_cau_sai + 10;
  so_cau_saiText.innerText = so_cau_sai;
};


startGame();
