const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressText_Time = document.getElementById("progressText_Time");
const thoi_gian_su_dungText = document.getElementById("thoi_gian_su_dung");
const so_cau_dungText = document.getElementById("so_cau_dungText");
const progressBarFull = document.getElementById("progressBarFull");
const progressBarFull_Time = document.getElementById("progressBarFull_Time");
let currentQuestion = {};
let acceptingAnswers = false;
let so_cau_dung = 0 ;
let so_cau_sai = 0;
let diem_tru_so_cau_sai = 0;
let thoi_gian_su_dung = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "Một nhà máy trong năm 2024 nhận được 4 trường hợp khiếu nại từ khách hàng, với tổng số sản phẩm bị khiếu nại là 10 chai. Biết sản lượng sản xuất của nhà máy trong năm 2024 là 1 triệu chai. Hãy tính chỉ số PQCR (Product quality complaint rate) của nhà máy? Biết PQCR là tỷ lệ sản phẩm bị khiếu nại trên 1 tỷ sản phẩm sản xuất được",
    "choice1": "10000",
    "choice2": "1000",
    "choice3": "100",
    "choice4": "10",
    "answer": 1
  },
  {
    "question": "Một nhà máy sản xuất 10 triệu chai trong năm 2024. Chỉ số PQCR (tỷ lệ sản phẩm bị khiếu nại trên 1 tỷ sản phẩm sản xuất) của nhà máy là 100. Hỏi trong năm 2024, tổng số sản phẩm bị khiếu nại của nhà máy là bao nhiêu chai?",
    "choice1": "10000",
    "choice2": "1000",
    "choice3": "10",
    "choice4": "1",
    "answer": 4
  },
  {
    "question": "Một nhà máy sản xuất 2 loại sản phẩm A và B với tổng sản lượng 12 triệu chai trong năm 2024. Chỉ số PQCR của loại A là 4, của loại B là 6 (trên 1 tỷ sản phẩm). Tổng số sản phẩm bị khiếu nại của cả hai loại là 56 chai. Sản lượng năm 2024 của sản phẩm A và B là bao nhiêu (đơn vị: triệu chai)?",
    "choice1": "A: 8, B: 4",
    "choice2": "A: 7, B: 5",
    "choice3": "A: 6, B: 6",
    "choice4": "A: 9, B: 3",
    "answer": 1
  },
  {
    "question": "Trong quá trình giải quyết khiếu nại khách hàng, phát biểu nào sau đây sai?",
    "choice1": "Cần xem xét kỹ nguyên nhân để xác định trách nhiệm và xử lý phù hợp.",
    "choice2": "Tất cả khiếu nại đều là lỗi của nhà máy, khách hàng không bao giờ sai.",
    "choice3": "Việc lắng nghe khách hàng giúp cải thiện chất lượng sản phẩm và dịch vụ.",
    "choice4": "Giải quyết khiếu nại kịp thời giúp nâng cao sự hài lòng và uy tín của doanh nghiệp.",
    "answer": 2
  },
  {
    "question": "Khi xử lý khiếu nại, bạn phát hiện lỗi do đối tác cung cấp nguyên liệu gây ra. Bạn sẽ làm gì?",
    "choice1": "Chỉ thông báo cho khách hàng và không làm gì thêm.",
    "choice2": "Thông báo cho bộ phận mua hàng và quản lý đối tác để phối hợp xử lý và cải tiến, đồng thời thông báo với khách hàng về tiến độ xử lý.",
    "choice3": "Đổ lỗi cho khách hàng sử dụng sai sản phẩm.",
    "choice4": "Giấu lỗi để tránh ảnh hưởng tới danh tiếng công ty.",
    "answer": 2
  },
  {
    "question": "Phát biểu nào sau đây về DPMO là sai?",
    "choice1": "DPMO được tính dựa trên số loại lỗi chia cho tổng số sản phẩm sản xuất.",
    "choice2": "DPMO càng thấp thì quy trình càng có chất lượng cao.",
    "choice3": "DPMO là số lượng lỗi trên mỗi triệu cơ hội xảy ra trong quy trình sản xuất.",
    "choice4": "DPMO giúp đo lường mức độ lỗi để đánh giá và cải tiến quy trình.",
    "answer": 1
  },
  {
    "question": "Phát biểu nào sau đây về Sigma Level là sai?",
    "choice1": "Sigma Level thể hiện mức độ hiệu quả của một quy trình sản xuất dựa trên số lượng lỗi xảy ra.",
    "choice2": "Sigma Level càng cao, tỷ lệ sản phẩm lỗi càng thấp và chất lượng càng tốt.",
    "choice3": "Sigma Level là một con số cố định, không thay đổi theo hiệu suất quy trình.",
    "choice4": "Sigma Level giúp doanh nghiệp đánh giá và cải tiến chất lượng sản phẩm.",
    "answer": 3
  },
  {
    "question": "Mối liên hệ chính giữa DPMO (Defects Per Million Opportunities - Số lỗi trên một triệu cơ hội) và Sigma Level là gì?",
    "choice1": "DPMO càng cao thì Sigma Level càng cao, cho thấy quy trình hoạt động hiệu quả hơn.",
    "choice2": "DPMO và Sigma Level là hai khái niệm riêng biệt, không liên quan đến nhau.",
    "choice3": "DPMO chỉ dùng để đo lường chất lượng trong phòng thí nghiệm, không áp dụng cho sản xuất thực tế.",
    "choice4": "Khi số lỗi trên mỗi triệu cơ hội giảm xuống, Sigma Level sẽ tăng lên, cho thấy chất lượng quy trình được cải thiện.",
    "answer": 4
  },
  {
    "question": "Phát biểu nào sau đây đúng nhất về ý nghĩa của hai chỉ số Cp và Cpk trong quản lý chất lượng?",
    "choice1": "Cp và Cpk dùng để đo độ cứng của sản phẩm trong quá trình kiểm tra vật lý.",
    "choice2": "Cp và Cpk là hai chỉ số dùng để đánh giá khả năng tài chính của doanh nghiệp.",
    "choice3": "Cp và Cpk phản ánh mức độ đáp ứng của quá trình sản xuất so với yêu cầu kỹ thuật; trong đó, Cpk xét đến cả độ lệch tâm của quá trình.",
    "choice4": "Cp và Cpk là các đơn vị đo lường khối lượng của nguyên liệu đầu vào.",
    "answer": 3
  },
  {
    "question": "Nhân viên A đo thể tích của 5 chai sản phẩm Wake-up 247 (mL) là: 330.2 mL, 330.5 mL, 330.3 mL, 330.4 mL, 330.6 mL. Trung bình (mean) thể tích là bao nhiêu?",
    "choice1": "330.25",
    "choice2": "330.3",
    "choice3": "330.35",
    "choice4": "330.4",
    "answer": 4
  },
  {
    "question": "Nhân viên A đo thể tích của 5 chai sản phẩm Wake-up 247 (mL) là: 330.1, 330.3, 330.2, 330.4, 330.5. Trung vị (median) thể tích là bao nhiêu?",
    "choice1": "330.25",
    "choice2": "330.3",
    "choice3": "330.35",
    "choice4": "330.4",
    "answer": 2
  },
  {
    "question": "Nếu dữ liệu đo lường sản phẩm có độ lệch chuẩn (standard deviation) càng nhỏ, việc này cho thấy điều gì?",
    "choice1": "Sản phẩm có nhiều lỗi hơn",
    "choice2": "Dữ liệu bị phân tán rộng",
    "choice3": "Sản phẩm có tính ổn định cao",
    "choice4": "Trung bình bị sai lệch",
    "answer": 3
  },
  {
    "question": "Bộ kết quả nào sau đây có độ lệch chuẩn nhỏ nhất?",
    "choice1": "9.8, 10.0, 10.2, 10.4, 10.6",
    "choice2": "10.0, 10.0, 10.0, 10.0, 10.0",
    "choice3": "8.5, 9.5, 10.5, 11.5, 12.5",
    "choice4": "9.0, 10.0, 11.0, 12.0, 13.0",
    "answer": 2
  },
  {
    "question": "Chỉ số nào sau đây đánh giá độ phân tán dữ liệu?",
    "choice1": "Độ lệch chuẩn",
    "choice2": "Trung vị",
    "choice3": "Mode (Giá trị xuất hiện nhiều nhất)",
    "choice4": "Trung bình",
    "answer": 1
  },
  {
    "question": "Khi sử dụng biểu đồ kiểm soát (Control Chart), nếu một điểm nằm ngoài giới hạn ±3σ, điều đó có nghĩa là gì?",
    "choice1": "Quá trình vẫn ổn định",
    "choice2": "Có lỗi do con người",
    "choice3": "Có khả năng quá trình không còn kiểm soát",
    "choice4": "Đó là sản phẩm tốt",
    "answer": 3
  },
  {
    "question": "Đặc điểm nào dưới đây là của trung vị (median)?",
    "choice1": "Là giá trị chính giữa sau khi sắp xếp dữ liệu",
    "choice2": "Luôn bằng trung bình nếu phân bố khác chuẩn",
    "choice3": "Bị ảnh hưởng mạnh bởi các giá trị ngoại lệ",
    "choice4": "Luôn là giá trị phổ biến nhất",
    "answer": 1
  },
  {
    "question": "Giá trị xuất hiện thường xuyên nhất trong bộ dữ liệu được gọi là gì?",
    "choice1": "Yếu vị (Mode)",
    "choice2": "Trung vị (Median)",
    "choice3": "Trung bình (Mean)",
    "choice4": "Độ lệch chuẩn (Standard deviation)",
    "answer": 1
  },
  {
    "question": "Trong kiểm soát chất lượng, dữ liệu phân bố càng gần trung bình thì điều gì xảy ra?",
    "choice1": "Độ lệch chuẩn càng lớn",
    "choice2": "Sự ổn định càng cao",
    "choice3": "Sự biến động càng cao",
    "choice4": "Phân bố càng lệch",
    "answer": 2
  },
  {
    "question": "Đặc điểm nào sau đây là của phân bố chuẩn (normal distribution)?",
    "choice1": "Bị lệch về bên phải",
    "choice2": "Bị lệch về bên trái",
    "choice3": "Đối xứng quanh trung bình",
    "choice4": "Không có trung vị",
    "answer": 3
  },
  {
    "question": "Một thiết bị sản xuất ra sản phẩm có độ lệch chuẩn tăng dần, việc này cho thấy điều gì?",
    "choice1": "Chất lượng trở nên đồng đều hơn",
    "choice2": "Sản phẩm chất lượng hơn",
    "choice3": "Dữ liệu phân tán rộng hơn",
    "choice4": "Dữ liệu phân tán hẹp hơn",
    "answer": 3
  },
  {
    "question": "Nước sau làm mềm là nước có đặc điểm nào sau đây?",
    "choice1": "Nhiều canxi và magie",
    "choice2": "Không có độ pH",
    "choice3": "Độ cứng thấp",
    "choice4": "Nhiều chất rắn lơ lửng",
    "answer": 3
  },
  {
    "question": "Ion bicarbonate (HCO₃⁻) là thành phần chính trong nước khoáng Vĩnh Hảo, vai trò của ion này là gì?",
    "choice1": "Tăng độ pH đột ngột",
    "choice2": "Giảm độ pH đột ngột",
    "choice3": "Làm tăng độ cứng",
    "choice4": "Duy trì tính đệm (buffer) của nước",
    "answer": 4
  },
  {
    "question": "Ion bicarbonate (HCO₃⁻) trong nước khoáng Vĩnh Hảo có thể làm tăng tính chất nào sau đây?",
    "choice1": "Tính kiềm nhẹ",
    "choice2": "Tính axit nhẹ",
    "choice3": "Tính kiềm mạnh",
    "choice4": "Tính axit mạnh",
    "answer": 1
  },
  {
    "question": "Sau quá trình làm mềm, chỉ tiêu nào sau đây sẽ giảm?",
    "choice1": "Hàm lượng nitrate",
    "choice2": "Hàm lượng canxi",
    "choice3": "Hàm lượng flo",
    "choice4": "Cả 3 câu trên đều đúng",
    "answer": 2
  },
  {
    "question": "Quá trình lọc than để loại bỏ chất nào dưới đây?",
    "choice1": "Chlorine dư",
    "choice2": "Flo dư",
    "choice3": "Nitrate dư",
    "choice4": "Canxi dư",
    "answer": 1
  },
  {
    "question": "Removing torque là gì?",
    "choice1": "Lực cần thiết để vặn nắp chai vào chai",
    "choice2": "Lực cần thiết để mở nắp chai ra khỏi chai",
    "choice3": "Lực tác động lên thân chai khi vận chuyển",
    "choice4": "Lực đo được khi kiểm tra áp suất trong chai",
    "answer": 2
  },
  {
    "question": "Application torque là gì?",
    "choice1": "Lực vặn nắp để đóng chặt nắp lên chai",
    "choice2": "Lực mở nắp khi sử dụng sản phẩm",
    "choice3": "Lực tác động lên đáy chai khi đóng gói",
    "choice4": "Lực kiểm tra độ bền của nắp",
    "answer": 1
  },
  {
    "question": "Nếu lực mở nắp quá cao, điều gì có thể xảy ra?",
    "choice1": "Nắp dễ bung ra trong quá trình vận chuyển",
    "choice2": "Người tiêu dùng gặp khó khăn khi mở nắp",
    "choice3": "Sản phẩm nhanh bị hỏng do mất kín",
    "choice4": "Nắp chai bị biến dạng ngay khi đóng",
    "answer": 2
  },
  {
    "question": "Nếu lực mở nắp quá thấp, điều gì có thể xảy ra?",
    "choice1": "Nắp dễ bị xì, bung",
    "choice2": "Người tiêu dùng gặp khó khăn khi mở nắp",
    "choice3": "Chai bị nứt do áp lực trong chai tăng",
    "choice4": "Sản phẩm có mùi vị ngon hơn",
    "answer": 2
  },
  {
    "question": "Đối với chỉ tiêu Top Load, chai rỗng thường được kiểm tra bằng cách nào?",
    "choice1": "Đặt tải trọng từ trên xuống tăng dần cho đến khi chai bị biến dạng",
    "choice2": "Lắc sản phẩm liên tục",
    "choice3": "Đóng mở nắp nhiều lần",
    "choice4": "Thả tự do từ độ cao 1 mét",
    "answer": 1
  },
  {
    "question": "Nếu chai có chỉ số Top Load thấp, điều gì có thể xảy ra trong quá trình vận chuyển?",
    "choice1": "Sản phẩm sẽ dễ bị biến dạng hoặc vỡ dưới trọng lượng chồng lên",
    "choice2": "Sản phẩm có thể mở nắp dễ dàng hơn",
    "choice3": "Sản phẩm không bị ảnh hưởng gì khi vận chuyển",
    "choice4": "Sản phẩm giữ được gas tốt hơn",
    "answer": 1
  },
  {
    "question": "Tại sao chỉ số Top Load quan trọng trong sản xuất chai PET?",
    "choice1": "Để xác định độ bền màu sắc của sản phẩm",
    "choice2": "Để đảm bảo sản phẩm chịu được tải trọng khi xếp chồng và vận chuyển",
    "choice3": "Để kiểm tra khả năng chống thấm nước",
    "choice4": "Để đo độ kín khí của nắp chai",
    "answer": 2
  },
  {
    "question": "Mục đích chính của Ship Test là gì?",
    "choice1": "Đánh giá khả năng tái chế của bao bì",
    "choice2": "Đo mức độ carbon phát thải trong quá trình giao hàng",
    "choice3": "Mô phỏng điều kiện vận chuyển để đánh giá độ bền và tính ổn định của sản phẩm",
    "choice4": "Kiểm tra màu sắc sản phẩm sau khi đóng gói",
    "answer": 3
  },
  {
    "question": "Ship Test thường bao gồm những yếu tố mô phỏng nào sau đây?",
    "choice1": "Rung động khi xe chạy",
    "choice2": "Va đập hoặc rơi rớt sản phẩm",
    "choice3": "Thay đổi nhiệt độ và độ ẩm",
    "choice4": "Tất cả đều đúng",
    "answer": 4
  },
  {
    "question": "Nếu sản phẩm không đạt Ship Test, điều gì có thể xảy ra?",
    "choice1": "Bao bì không thể tái sử dụng",
    "choice2": "Sản phẩm có thể bị hỏng, rò rỉ hoặc biến dạng khi đến tay khách hàng",
    "choice3": "Thời gian giao hàng bị chậm",
    "choice4": "Giảm mức độ carbon phát thải trong quá trình giao hàng",
    "answer": 2
  },
  {
    "question": "Yếu tố nào không ảnh hưởng trực tiếp đến chất lượng sản phẩm trong suốt thời gian bảo quản?",
    "choice1": "Nhiệt độ bảo quản",
    "choice2": "Độ kín của bao bì",
    "choice3": "Vận tốc máy đóng nắp",
    "choice4": "Ánh sáng nơi trưng bày",
    "answer": 3
  },
  {
    "question": "Tại sao cần theo dõi cảm quan (màu sắc, mùi, vị) trong suốt thời hạn sử dụng ?",
    "choice1": "Vì đó là yêu cầu của kế toán",
    "choice2": "Vì cảm quan phản ánh chính xác chất lượng sản phẩm từ góc độ người tiêu dùng",
    "choice3": "Vì cảm quan dễ đo hơn vi sinh",
    "choice4": "Vì cảm quan ảnh hưởng đến thời gian giao hàng",
    "answer": 2
  },
  {
    "question": "Biến đổi nào sau đây bắt buộc không được phép vi phạm trong suốt thời gian shelf life của sản phẩm?",
    "choice1": "Bao bì phai màu nhẹ",
    "choice2": "Vi sinh vật tăng sinh vượt quy định",
    "choice3": "Nhãn hơi hở mí",
    "choice4": "Chai mềm do mất gas dần",
    "answer": 2
  },
  {
    "question": "Nhiệt độ bảo quản có ảnh hưởng đến shelf life của sản phẩm không?",
    "choice1": "Không ảnh hưởng nếu sản phẩm đã đóng kín",
    "choice2": "Có ảnh hưởng, nhiệt độ cao có thể làm giảm shelf life",
    "choice3": "Không ảnh hưởng nếu sản phẩm bảo quản trong thùng carton",
    "choice4": "Chỉ ảnh hưởng đến bao bì, không ảnh hưởng đến chất lượng bên trong",
    "answer": 2
  }
];

//CONSTANTS
const INCORRECT_TAX = 100;
const MAX_QUESTIONS = 100;
const thoi_gian_max = 600000;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  diem_tong = 100;
  availableQuesions = [...questions];
  getNewQuestion();
  // Timer
  setInterval(function () {
    thoi_gian_su_dung ++;
    thoi_gian_su_dungText.innerText = `${thoi_gian_su_dung}/${thoi_gian_max/1000}`;
    if (so_cau_sai === 1 || thoi_gian_su_dung*1000 === thoi_gian_max) {
      localStorage.setItem("so_cau_dung", questionCounter-1);
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
    localStorage.setItem("so_cau_dung", questionCounter-1);
    localStorage.setItem("so_cau_sai", so_cau_sai);
    localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung)

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  so_cau_dung++;
  so_cau_dungText.innerText = `${questionCounter-1}/${MAX_QUESTIONS}`;
  progressText_Time.innerText = `Thời gian sử dụng`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  progressBarFull_Time.style.width = `${(thoi_gian_su_dung*1000 / thoi_gian_max) * 100}%`;

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
      selectedAnswer == currentQuestion.answer ? 'correct' : "incorrect";

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
  thoi_gian_su_dungText.innerText = thoi_gian_su_dung;
  so_cau_sai++;
  so_cau_saiText.innerText = so_cau_sai;
};


startGame();
