const username = document.getElementById("username");
const email = document.getElementById("email");
const line = document.getElementById("line");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const correctScore = document.getElementById("correctScore");
const so_cau_dung = document.getElementById("so_cau_dung");
const thoi_gian_su_dung = document.getElementById("thoi_gian_su_dung");
const so_cau_dung_luu = localStorage.getItem("so_cau_dung");

const thoi_gian_su_dung_luu = localStorage.getItem("thoi_gian_su_dung");


so_cau_dung.innerText = so_cau_dung_luu;
thoi_gian_su_dung.innerText = thoi_gian_su_dung_luu;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Save High Score to Local Storage
saveHighScore = e => {
  const submissionTime = new Date().toISOString();
  e.preventDefault();
  
  fetch('https://default810604757e7f4ede8d8dbf61f53ca5.28.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d7d70bbb3ab14a008c7778e43d8a145a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LM2xlC3RCxGZSQY3EucnesZZdb6kuG1VL18cC-KRB9k', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'Họ và tên': document.getElementById('username').value,
        'Email cá nhân': document.getElementById('email').value,
        'Thời gian nộp phiếu': submissionTime,
        'Line': document.getElementById("line").value,
        'Thời gian sử dụng': thoi_gian_su_dung_luu,
        'Số câu đúng': so_cau_dung_luu,
    })
}).then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
alert("Đã gửi kết quả thành công");
window.location.assign("../html/highscores.html");
};



