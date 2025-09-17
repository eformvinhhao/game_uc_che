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
    "question": "Vĩnh Hảo đang được chứng nhận GCN nào về hệ thống quản lý ATVSTP",
    "choice1": "BRC",
    "choice2": "FSSC 22000",
    "choice3": "ISO 22000",
    "choice4": "ISO 14000",
    "answer": 2
  },
  {
    "question": "Hệ thống làm mềm được tái sinh bằng?",
    "choice1": "Nước muối",
    "choice2": "NaOH",
    "choice3": "Clorine",
    "choice4": "Nước nóng",
    "answer": 1
  },
  {
    "question": "Hoàn nguyên than sử dụng phương pháp nào?",
    "choice1": "Nước muối",
    "choice2": "NaOH",
    "choice3": "Clorine",
    "choice4": "Nước nóng",
    "answer": 4
  },
  {
    "question": "Ozone được sử dụng cho loại nước nào?",
    "choice1": "220",
    "choice2": "20",
    "choice3": "375",
    "choice4": "1900",
    "answer": 3
  },
  {
    "question": "Lực torque còn được gọi là chỉ tiêu nào dưới đây?",
    "choice1": "Lực đóng nắp",
    "choice2": "Độ kín",
    "choice3": "Lực mở nắp",
    "choice4": "Độ xì",
    "answer": 3
  },
  {
    "question": "Chỉ tiêu SST còn gọi là gì?",
    "choice1": "Độ ngọt",
    "choice2": "Lực đóng nắp",
    "choice3": "Độ kín nắp",
    "choice4": "Lực mở nắp",
    "answer": 3
  },
  {
    "question": "Tiêu chuẩn SST của sản phẩm không gas là bao nhiêu?",
    "choice1": "Không xì ở 50 psi, không bung ở 100 psi",
    "choice2": "Không xì, không bung ở cả 50 và 100 psi",
    "choice3": "Xì ở 50 psi nhưng không bung ở 100 psi",
    "choice4": "Không xì ở 100 psi, không bung ở 150 psi",
    "answer": 1
  },
  {
    "question": "Tiêu chuẩn SST của sản phẩm có gas là bao nhiêu?",
    "choice1": "Không xì ở 50 psi, không bung ở 100 psi",
    "choice2": "Không xì, không bung ở cả 100 và 150 psi",
    "choice3": "Xì ở 50 psi nhưng không bung ở 100 psi",
    "choice4": "Không xì ở 100 psi, không bung ở 150 psi",
    "answer": 4
  },
  {
    "question": "Chỉ tiêu AA còn gọi là gì?",
    "choice1": "Góc mở nắp",
    "choice2": "Góc dập nắp",
    "choice3": "Góc đóng nắp",
    "choice4": "Cả 3 đều sai",
    "answer": 4
  },
  {
    "question": "Khi tăng thải RO, điều nào sau đây sẽ xảy ra?",
    "choice1": "TDS thành phẩm tăng",
    "choice2": "TDS thành phẩm giảm",
    "choice3": "TDS thành phẩm không đổi",
    "choice4": "Nghẹt màng, dừng hoạt động",
    "answer": 2
  },
  {
    "question": "Khi tăng tỷ lệ nhánh by-pass ở RO 375, điều nào sau đây sẽ xảy ra?",
    "choice1": "Nitrate tăng, Flo tăng",
    "choice2": "Nitrate giảm, Flo giảm",
    "choice3": "Nitrate giảm, Flo tăng",
    "choice4": "Nitrate tăng, Flo giảm",
    "answer": 3
  },
  {
    "question": "Trong thiết kế, bố trí khu vực sản xuất, chế biến của nhà máy quy định màu sắc cho từng vùng sạch từ cao đến thấp như sau:",
    "choice1": " Đỏ 🡺 Xanh 🡺 Vàng",
    "choice2": "Vàng 🡺 Đỏ 🡺 Xanh",
    "choice3": " Đỏ 🡺 Vàng 🡺 Xanh",
    "choice4": " Xanh 🡺 Đỏ 🡺 Vàng",
    "answer": 3
  },
  {
    "question": "Vùng “Đỏ” được quy định trong tài liệu GHP của Công ty, bao gồm các khu vực sau:",
    "choice1": "Khu chiết rót line 1, line 2,line3, line 4, line 5; và chế biến cũ",
    "choice2": "Khu vực chiết rót line 3; Khu chứa, cân phụ gia chế biến cũ; Khu chứa, cân phụ gia chế biến mới.",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 1
  },
  {
    "question": "Vùng “Vàng” quy định trong tài liệu GHP của Công ty, bao gồm các khu vực sau:",
    "choice1": "Khu chiết rót line 1, line 2, line 4; Khu vực đóng nắp và chế biến cũ",
    "choice2": "Khu vực chiết rót line 3; Khu chứa, cân phụ gia chế biến cũ; Khu chứa, cân phụ gia CB mới.",
    "choice3": " Khu chiết rót line 1, line 2, line 4",
    "choice4": " Khu chứa, cân phụ gia chế biến cũ; Khu chứa, cân phụ gia chế biến mới.",
    "answer": 4
  },
  {
    "question": "Vùng vàng và vùng đỏ quy định trong tài liệu GHP của Công ty, phải sử dụng các bảo hộ lao động sau:",
    "choice1": "Quần áo bảo hộ lao động khu sạch, ủng cao su, giày khu sạch",
    "choice2": " Ủng cao su hoặc giày khu sạch",
    "choice3": " Mũ trùm, khẩu trang sạch; ủng cao su, giày khu sạch",
    "choice4": " Mũ trùm, khẩu trang sạch; quần áo bảo hộ lao động khu sạch, ủng cao su, giày khu sạch",
    "answer": 4
  },
  {
    "question": "Hệ thống chiếu sáng yêu cầu:",
    "choice1": "Bảo đảm cung cấp đủ ánh sáng cho người sản xuất, chế biến nhìn được bình thường.",
    "choice2": "Bóng đèn chiếu sáng phải được che chắn an toàn (hộp hoặc lưới) để tránh vỡ và nếu vỡ sẽ không có mảnh vỡ rơi vào thực phẩm.",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 3
  },
  {
    "question": "Khu vực nhà vệ sinh có quy định sau:",
    "choice1": "Tối thiểu 25 người phải có 01 nhà vệ sinh; Được bố trí ở các vị trí thuận tiện cho tất cả khách hàng và mọi người trong cơ sở sử dụng",
    "choice2": "Bảo đảm cách biệt khu vực chế biến, nhà ăn và có đầy đủ thiết bị bảo đảm vệ sinh, có đủ nước sạch và thiết bị rửa tay sau khi đi vệ sinh",
    "choice3": " Cần có chỉ dẫn “Rửa tay sau khi đi vệ sinh” thoát nước dễ dàng loại bỏ chất thải; hướng gió chính không thổi từ khu vực nhà vệ sinh sang khu vực chế biến, bảo quản",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Yêu cầu về thiết bị, dụng cụ sản xuất, chế biến, là:",
    "choice1": "Có đủ dụng cụ, đồ chứa riêng cho nguyên liệu, đóng gói, vận chuyển thực phẩm",
    "choice2": "Dễ làm vệ sinh, bảo dưỡng, không làm nhiễm bẩn thực phẩm do dầu mỡ bôi trơn, tránh mảnh vụn kim loại.",
    "choice3": "Phương tiện, trang thiết bị của dây chuyền sản xuất, chế biến phải có quy trình vệ sinh, quy trình vận hành",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Chủ cơ sở, người trực tiếp tham gia sản xuất, CB thực phẩm phải đáp ứng đủ điều kiện về:",
    "choice1": "Kiến thức, sức khỏe và thực hành an toàn vệ sinh thực phẩm",
    "choice2": "Kiến thức, sức khỏe và có “Giấy chứng nhận kiến thức về an toàn vệ sinh thực phẩm",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 2
  },
  {
    "question": " Những người tham gia trực tiếp vào sản xuất, chế biến thực phẩm phải thực hiện các yêu cầu sau, để bảo đảm an toàn thực phẩm:",
    "choice1": " Mặc trang phục bảo hộ riêng, mặc tạp dề, đeo khẩu trang, đội mũ che tóc khi sản xuất, chế biến.",
    "choice2": "Giữ móng tay ngắn, sạch sẽ và không đeo đồ trang sức khi tiếp xúc trực tiếp với thực phẩm ăn ngay; Không đeo đồ trang sức, đồng hồ khi sản xuất, chế biến và tiếp xúc trực tiếp với thực phẩm.",
    "choice3": "Không ăn uống, hút thuốc, khạc nhổ trong khu vực sản xuất thực phẩm",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Thực hành chế biến thực phẩm tốt, bảo đảm an toàn thực phẩm, khi sử dụng nguyên liệu, yêu cầu:",
    "choice1": "Có nguồn gốc rõ ràng (tốt nhất là đã được chứng nhận an toàn cho phép sử dụng)",
    "choice2": "Không sử dụng phụ gia thực phẩm, chất hỗ trợ chế biến không được Bộ Y tế cho phép sử dụng và",
    "choice3": " Lưu giữ hồ sơ về nguồn gốc, xuất xứ nguyên liệu thực phẩm và các tài liệu khác về toàn bộ quá trình sản xuất, chế biến thực phẩm.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Thực hành chế biến thực phẩm tốt, bảo đảm an toàn thực phẩm, phải:",
    "choice1": "Thường xuyên vệ sinh dụng cụ, vệ sinh khu vực sản xuất, chế biến, nhà ăn, thu dọn rác thải...",
    "choice2": "Không cho vật nuôi vào khu vực sản xuất, chế biến thực phẩm.",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 3
  },
  {
    "question": "Bàn tay tốt khi rửa tay để bảo đảm sạch sẽ, thì phải:",
    "choice1": "Rửa tay kỹ bằng xà phòng và nước sạch",
    "choice2": "Làm khô tay sau khi rửa bằng khăn giấy dùng một lần, khăn bông sạch hoặc máy thổi khô",
    "choice3": "Không chùi vào quần áo, váy, tạp dề",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Yêu cầu với phương tiện rửa và khử trùng tay, là:",
    "choice1": "Có đầy đủ các thiết bị rửa tay và khử trùng tay ở các vị trí thuận tiện trong khu vực sản xuất, chế biến, nhà ăn cho mọi người trong cơ sở sử dụng.",
    "choice2": "Nơi rửa tay phải cung cấp đầy đủ nước sạch, xà phòng, khăn lau tay sử dụng một lần hay máy sấy khô tay.",
    "choice3": "Số lượng 50 công nhân thì phải có ít nhất 1 bồn rửa tay.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Phòng chống côn trùng, động vật gây hại, yêu cầu:",
    "choice1": "Thiết bị phòng chống côn trùng, động vật gây hại phải được làm bằng vật liệu không gỉ, dễ tháo, hợp vệ sinh, Bảo đảm phòng chống hiệu quả côn trùng và động vật gây hại.",
    "choice2": "Không sử dụng thuốc, động vật để diệt chuột, côn trùng và động vật gây hại trong khu vực sản xuất, chế biến thực phẩm.",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 3
  },
  {
    "question": " Yêu cầu về thiết bị thu gom rác thải, là:",
    "choice1": "Có dụng cụ thu gom, chứa rác thải, chất thải bảo đảm vệ sinh.",
    "choice2": "Thiết bị, dụng cụ thu gom rác thải phải được làm bằng vật liệu ít bị hư hỏng, bảo đảm kín, có nắp đậy, tránh sự xâm nhập của động vật và được vệ sinh thường xuyên.",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 4
  },
  {
    "question": " Yêu cầu về thiết bị, dụng cụ giám sát, đo lường là:",
    "choice1": "Có đủ thiết bị, dụng cụ giám sát, đo lường để đánh giá được các chỉ tiêu chất lượng thực phẩm",
    "choice2": "Thiết bị, dụng cụ giám sát, kiểm soát được độ chính xác.",
    "choice3": "Được bảo dưỡng, định kỳ theo quy định.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Yêu cầu về chất tẩy rửa và sát trùng, là:",
    "choice1": "Các chất dùng để tẩy rửa và sát trùng dụng cụ chứa thực phẩm phải được đựng trong bao bì dễ nhận biết và có hướng dẫn sử dụng phù hợp với đặc điểm kỹ thuật.",
    "choice2": "Các chất tẩy rửa phải để cách biệt với nơi sản xuất, chế biến, bảo quản thực phẩm.",
    "choice3": "Chỉ sử dụng chất tẩy rửa dụng cụ chứa thực phẩm và chất tẩy trùng được Bộ Y tế cho phép.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": " Hành vi nào sau đây là hành vi bị cấm theo quy định của Luật ATTP?",
    "choice1": "Sử dụng nguyên liệu không thuộc loại dùng cho thực phẩm để chế biến thực phẩm",
    "choice2": "Người mắc bệnh truyền nhiễm tham gia sản xuất, kinh doanh thực phẩm.",
    "choice3": "Sản xuất, kinh doanh thực phẩm tại cơ sở không có giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm theo quy định của pháp luật.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Hành vi nào sau đây là hành vi bị cấm theo quy định của Luật ATTP?",
    "choice1": "Chứa đựng thực phẩm trên thiết bị, dụng cụ, vật liệu không bảo đảm vệ sinh; người trực tiếp chế biến thức ăn mà không đội mũ, đeo khẩu trang; không cắt ngắn móng tay; không sử dụng găng tay khi tiếp xúc trực tiếp với thực phẩm chín, thức ăn ngay.",
    "choice2": "Không có đủ dụng cụ chế biến, bảo quản và sử dụng riêng đối với thực phẩm tươi sống, thực phẩm đã qua chế biến.",
    "choice3": "Nơi chế biến, kinh doanh, bảo quản có côn trùng, động vật gây hại xâm nhập.",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": " Trong khi chế biến thực phẩm, người chế biến thực phẩm tại các cơ sở kinh doanh dịch vụ ăn uống không được?",
    "choice1": "Khạc nhổ",
    "choice2": "Ăn kẹo cao su",
    "choice3": "Mang đồng hồ, trang sức",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 4
  },
  {
    "question": "Khi bị ngộ độc thực phẩm, thì nơi có người ngộ độc thực phẩm báo cho cơ quan nào?",
    "choice1": "Cơ sở y tế gần nhất",
    "choice2": "Hội tiêu chuẩn và bảo vệ quyền lợi người tiêu dùng.",
    "choice3": "Chi cục Quản lý thị trường.",
    "choice4": "Chi cục an toàn thực phẩm.",
    "answer": 1
  },
  {
    "question": "Ba điều kiện về vệ sinh an toàn thực phẩm bao gồm",
    "choice1": "Điều kiện về cơ sở; Điều kiện về trang thiết bị, dụng cụ và điều kiện về con người",
    "choice2": "Điều kiện liên quan đến mối nguy về vi sinh; hóa học và vật lý",
    "choice3": "Điều kiện về vệ sinh cá nhân; bảo hộ lao động và không đeo trang sức",
    "choice4": "Tất cả các câu trên đều đúng",
    "answer": 1
  },
  {
    "question": "Về địa điểm và môi trường có yêu cầu",
    "choice1": "Không bị ngập nước, đọng nước.",
    "choice2": "Cách biệt với nguồn ô nhiễm (cống rãnh, rác thải, công trình vệ sinh, …)",
    "choice3": "Cả 2 đều đúng",
    "choice4": "Cả 2 đều sai",
    "answer": 3
  }
];

//CONSTANTS
const INCORRECT_TAX = 100;
const MAX_QUESTIONS = 100;

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
