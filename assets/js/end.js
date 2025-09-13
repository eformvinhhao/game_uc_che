const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const correctScore = document.getElementById("correctScore");
const so_cau_sai = document.getElementById("so_cau_sai");
const diem_tong = document.getElementById("diem_tong");
const thoi_gian_su_dung = document.getElementById("thoi_gian_su_dung");
const diem_tong_luu = localStorage.getItem("diem_tong");
const so_cau_sai_luu = localStorage.getItem("so_cau_sai");

const thoi_gian_su_dung_luu = localStorage.getItem("thoi_gian_su_dung");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

diem_tong.innerText = diem_tong_luu;
so_cau_sai.innerText = so_cau_sai_luu;
thoi_gian_su_dung.innerText = thoi_gian_su_dung_luu;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Save High Score to Local Storage
saveHighScore = e => {
  e.preventDefault();

  const score = {
    diem_tong: diem_tong.innerText,
    name: username.value,
    email: email.value,
    so_cau_sai: so_cau_sai.innerText,
    thoi_gian_su_dung: thoi_gian_su_dung.innerText,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(1000);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("../html/highscores.html");
};
