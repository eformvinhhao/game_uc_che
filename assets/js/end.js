const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const correctScore = document.getElementById("correctScore");
const so_cau_dung = document.getElementById("so_cau_dung");
const thoi_gian_su_dung = document.getElementById("thoi_gian_su_dung");
const so_cau_dung_luu = localStorage.getItem("so_cau_dung");

const thoi_gian_su_dung_luu = localStorage.getItem("thoi_gian_su_dung");


const MAX_HIGH_SCORES = 5;

so_cau_dung.innerText = so_cau_dung_luu;
thoi_gian_su_dung.innerText = thoi_gian_su_dung_luu;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Save High Score to Local Storage
saveHighScore = e => {
  e.preventDefault();

  const score = {
    name: username.value,
    email: email.value,
    so_cau_dung: so_cau_dung.innerText,
    thoi_gian_su_dung: thoi_gian_su_dung.innerText,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(1000);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("../html/highscores.html");
};

