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
let so_cau_saiText = 0;
let diem_tru_so_cau_sai = 0;
let thoi_gian_su_dung = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions =[
  {
    "question": "Nước sau làm mềm là nước có đặc điểm nào sau đây?",
    "choice1": "Nhiều canxi và magie",
    "choice2": "Không có độ pH",
    "choice3": "Độ cứng thấp",
    "choice4": "Nhiều chất rắn lơ lửng",
    "answer": "Độ cứng thấp"
  },
  {
    "question": "Ion bicarbonate (HCO₃⁻) là thành phần chính trong nước khoáng Vĩnh Hảo, vai trò của ion này là gì?",
    "choice1": "Tăng độ pH đột ngột",
    "choice2": "Giảm độ pH đột ngột",
    "choice3": "Làm tăng độ cứng",
    "choice4": "Duy trì tính đệm (buffer) của nước",
    "answer": "Duy trì tính đệm (buffer) của nước"
  },
  {
    "question": "Ion bicarbonate (HCO₃⁻) trong nước khoáng Vĩnh Hảo có thể làm tăng tính chất nào sau đây?",
    "choice1": "Tính kiềm nhẹ",
    "choice2": "Tính axit nhẹ",
    "choice3": "Tính kiềm mạnh",
    "choice4": "Tính axit mạnh",
    "answer": "Tính kiềm nhẹ"
  },
  {
    "question": "Sau quá trình làm mềm, chỉ tiêu nào sau đây sẽ giảm?",
    "choice1": "Hàm lượng nitrate",
    "choice2": "Hàm lượng canxi",
    "choice3": "Hàm lượng flo",
    "choice4": "Cả 3 câu trên đều đúng",
    "answer": "Hàm lượng canxi"
  },
  {
    "question": "Quá trình lọc than để loại bỏ chất nào dưới đây?",
    "choice1": "Chlorine dư",
    "choice2": "Flo dư",
    "choice3": "Nitrate dư",
    "choice4": "Canxi dư",
    "answer": "Chlorine dư"
  },
  {
    "question": "Removing torque là gì?",
    "choice1": "Lực cần thiết để vặn nắp chai vào chai",
    "choice2": "Lực cần thiết để mở nắp chai ra khỏi chai",
    "choice3": "Lực tác động lên thân chai khi vận chuyển",
    "choice4": "Lực đo được khi kiểm tra áp suất trong chai",
    "answer": "Lực cần thiết để mở nắp chai ra khỏi chai"
  },
  {
    "question": "Application torque là gì?",
    "choice1": "Lực vặn nắp để đóng chặt nắp lên chai",
    "choice2": "Lực mở nắp khi sử dụng sản phẩm",
    "choice3": "Lực tác động lên đáy chai khi đóng gói",
    "choice4": "Lực kiểm tra độ bền của nắp",
    "answer": "Lực vặn nắp để đóng chặt nắp lên chai"
  },
  {
    "question": "Nếu lực mở nắp quá cao, điều gì có thể xảy ra?",
    "choice1": "Nắp dễ bung ra trong quá trình vận chuyển",
    "choice2": "Người tiêu dùng gặp khó khăn khi mở nắp",
    "choice3": "Sản phẩm nhanh bị hỏng do mất kín",
    "choice4": "Nắp chai bị biến dạng ngay khi đóng",
    "answer": "Người tiêu dùng gặp khó khăn khi mở nắp"
  },
  {
    "question": "Nếu lực mở nắp quá thấp, điều gì có thể xảy ra?",
    "choice1": "Nắp dễ bị xì, bung",
    "choice2": "Người tiêu dùng gặp khó khăn khi mở nắp",
    "choice3": "Chai bị nứt do áp lực trong chai tăng",
    "choice4": "Sản phẩm có mùi vị ngon hơn",
    "answer": "Nắp dễ bị xì, bung"
  },
  {
    "question": "Đối với chỉ tiêu Top Load, chai rỗng thường được kiểm tra bằng cách nào?",
    "choice1": "Đặt tải trọng từ trên xuống tăng dần cho đến khi chai bị biến dạng",
    "choice2": "Lắc sản phẩm liên tục",
    "choice3": "Đóng mở nắp nhiều lần",
    "choice4": "Thả tự do từ độ cao 1 mét",
    "answer": "Đặt tải trọng từ trên xuống tăng dần cho đến khi chai bị biến dạng"
  },
  {
    "question": "Nếu chai có chỉ số Top Load thấp, điều gì có thể xảy ra trong quá trình vận chuyển?",
    "choice1": "Sản phẩm sẽ dễ bị biến dạng hoặc vỡ dưới trọng lượng chồng lên",
    "choice2": "Sản phẩm có thể mở nắp dễ dàng hơn",
    "choice3": "Sản phẩm không bị ảnh hưởng gì khi vận chuyển",
    "choice4": "Sản phẩm giữ được gas tốt hơn",
    "answer": "Sản phẩm sẽ dễ bị biến dạng hoặc vỡ dưới trọng lượng chồng lên"
  },
  {
    "question": "Tại sao chỉ số Top Load quan trọng trong sản xuất chai PET?",
    "choice1": "Để xác định độ bền màu sắc của sản phẩm",
    "choice2": "Để đảm bảo sản phẩm chịu được tải trọng khi xếp chồng và vận chuyển",
    "choice3": "Để kiểm tra khả năng chống thấm nước",
    "choice4": "Để đo độ kín khí của nắp chai",
    "answer": "Để đảm bảo sản phẩm chịu được tải trọng khi xếp chồng và vận chuyển"
  },
  {
    "question": "Mục đích chính của Ship Test là gì?",
    "choice1": "Đánh giá khả năng tái chế của bao bì",
    "choice2": "Đo mức độ carbon phát thải trong quá trình giao hàng",
    "choice3": "Mô phỏng điều kiện vận chuyển để đánh giá độ bền và tính ổn định của sản phẩm",
    "choice4": "Kiểm tra màu sắc sản phẩm sau khi đóng gói",
    "answer": "Mô phỏng điều kiện vận chuyển để đánh giá độ bền và tính ổn định của sản phẩm"
  },
  {
    "question": "Ship Test thường bao gồm những yếu tố mô phỏng nào sau đây?",
    "choice1": "Rung động khi xe chạy",
    "choice2": "Va đập hoặc rơi rớt sản phẩm",
    "choice3": "Thay đổi nhiệt độ và độ ẩm",
    "choice4": "Tất cả đều đúng",
    "answer": "Tất cả đều đúng"
  },
  {
    "question": "Nếu sản phẩm không đạt Ship Test, điều gì có thể xảy ra?",
    "choice1": "Bao bì không thể tái sử dụng",
    "choice2": "Sản phẩm có thể bị hỏng, rò rỉ hoặc biến dạng khi đến tay khách hàng",
    "choice3": "Thời gian giao hàng bị chậm",
    "choice4": "Giảm mức độ carbon phát thải trong quá trình giao hàng",
    "answer": "Sản phẩm có thể bị hỏng, rò rỉ hoặc biến dạng khi đến tay khách hàng"
  },
  {
    "question": "Yếu tố nào không ảnh hưởng trực tiếp đến chất lượng sản phẩm trong suốt thời gian bảo quản?",
    "choice1": "Nhiệt độ bảo quản",
    "choice2": "Độ kín của bao bì",
    "choice3": "Vận tốc máy đóng nắp",
    "choice4": "Ánh sáng nơi trưng bày",
    "answer": "Vận tốc máy đóng nắp"
  },
  {
    "question": "Tại sao cần theo dõi cảm quan (màu sắc, mùi, vị) trong suốt thời hạn sử dụng ?",
    "choice1": "Vì đó là yêu cầu của kế toán",
    "choice2": "Vì cảm quan phản ánh chính xác chất lượng sản phẩm từ góc độ người tiêu dùng",
    "choice3": "Vì cảm quan dễ đo hơn vi sinh",
    "choice4": "Vì cảm quan ảnh hưởng đến thời gian giao hàng",
    "answer": "Vì cảm quan phản ánh chính xác chất lượng sản phẩm từ góc độ người tiêu dùng"
  },
  {
    "question": "Biến đổi nào sau đây bắt buộc không được phép vi phạm trong suốt thời gian shelf life của sản phẩm?",
    "choice1": "Bao bì phai màu nhẹ",
    "choice2": "Vi sinh vật tăng sinh vượt quy định",
    "choice3": "Nhãn hơi hở mí",
    "choice4": "Chai mềm do mất gas dần",
    "answer": "Vi sinh vật tăng sinh vượt quy định"
  },
  {
    "question": "Nhiệt độ bảo quản có ảnh hưởng đến shelf life của sản phẩm không?",
    "choice1": "Không ảnh hưởng nếu sản phẩm đã đóng kín",
    "choice2": "Có ảnh hưởng, nhiệt độ cao có thể làm giảm shelf life",
    "choice3": "Không ảnh hưởng nếu sản phẩm bảo quản trong thùng carton",
    "choice4": "Chỉ ảnh hưởng đến bao bì, không ảnh hưởng đến chất lượng bên trong",
    "answer": "Có ảnh hưởng, nhiệt độ cao có thể làm giảm shelf life"
  },
  {
    "question": "\"\"Shelf life\"\" của sản phẩm là gì?",
    "choice1": "Thời gian sản phẩm được lưu kho trước khi giao hàng",
    "choice2": "Thời gian vận chuyển sản phẩm từ nhà máy đến đại lý",
    "choice3": "Khoảng thời gian sản phẩm giữ được chất lượng tiêu chuẩn trong điều kiện bảo quản quy định",
    "choice4": "Thời gian sản phẩm có mặt trên kệ siêu thị",
    "answer": "Khoảng thời gian sản phẩm giữ được chất lượng tiêu chuẩn trong điều kiện bảo quản quy định"
  },
  {
    "question": "Drop test là gì?",
    "choice1": "Kiểm tra khả năng sản phẩm chịu được áp suất bên trong",
    "choice2": "Kiểm tra phản ứng sản phẩm với thay đổi nhiệt độ",
    "choice3": "Kiểm tra độ bền của sản phẩm/bao bì khi bị rơi từ độ cao nhất định",
    "choice4": "Kiểm tra tốc độ lão hóa của sản phẩm",
    "answer": "Kiểm tra độ bền của sản phẩm/bao bì khi bị rơi từ độ cao nhất định"
  },
  {
    "question": "Tiêu chí nào để đánh giá chỉ tiêu Drop test không đạt?",
    "choice1": "Bao bì bị rách, móp, vỡ",
    "choice2": "Mực in phai màu",
    "choice3": "Chai bị đổi màu",
    "choice4": "Cả 3 câu trên đều đúng",
    "answer": "Bao bì bị rách, móp, vỡ"
  },
  {
    "question": "Drop test thường được thực hiện trên điều kiện nào?",
    "choice1": "Chai/lon rỗng chưa đóng nắp",
    "choice2": "Sản phẩm đã hoàn thiện và đóng gói như thực tế sử dụng",
    "choice3": "Bao bì phẳng chưa tạo hình",
    "choice4": "Thiết bị máy móc",
    "answer": "Sản phẩm đã hoàn thiện và đóng gói như thực tế sử dụng"
  },
  {
    "question": "Drop test nên được thực hiện ở đâu?",
    "choice1": "Nơi có nhiệt độ âm sâu để tăng áp lực",
    "choice2": "Môi trường thực tế như sàn gạch, bê tông hoặc bề mặt chuẩn theo tiêu chuẩn",
    "choice3": "Trong bồn nước để mô phỏng rơi chìm",
    "choice4": "Trong phòng tối để dễ quan sát",
    "answer": "Môi trường thực tế như sàn gạch, bê tông hoặc bề mặt chuẩn theo tiêu chuẩn"
  },
  {
    "question": "Chỉ tiêu SST còn gọi là gì?",
    "choice1": "Độ ngọt",
    "choice2": "Lực đóng nắp",
    "choice3": "Độ kín nắp",
    "choice4": "Lực mở nắp",
    "answer": "Độ kín nắp"
  },
  {
    "question": "Tiêu chuẩn SST của sản phẩm không gas là bao nhiêu?",
    "choice1": "Không xì ở 50 psi, không bung ở 100 psi",
    "choice2": "Không xì, không bung ở cả 50 và 100 psi",
    "choice3": "Xì ở 50 psi nhưng không bung ở 100 psi",
    "choice4": "Không xì ở 100 psi, không bung ở 150 psi",
    "answer": "Không xì ở 50 psi, không bung ở 100 psi"
  },
  {
    "question": "Tiêu chuẩn SST của sản phẩm có gas là bao nhiêu?",
    "choice1": "Không xì ở 50 psi, không bung ở 100 psi",
    "choice2": "Không xì, không bung ở cả 100 và 150 psi",
    "choice3": "Xì ở 50 psi nhưng không bung ở 100 psi",
    "choice4": "Không xì ở 100 psi, không bung ở 150 psi",
    "answer": "Không xì ở 100 psi, không bung ở 150 psi"
  },
  {
    "question": "Tiêu chuẩn nhãn lệch mí là bao nhiêu?",
    "choice1": ">1 mm",
    "choice2": ">1.5 mm",
    "choice3": ">2 mm",
    "choice4": ">2.5 mm",
    "answer": ">2 mm"
  },
  {
    "question": "HACCP là gì?",
    "choice1": "Một hệ thống kiểm tra chất lượng sản phẩm sau khi sản xuất",
    "choice2": "Một quy trình kiểm tra cảm quan thực phẩm",
    "choice3": "Hệ thống phân tích mối nguy và kiểm soát điểm tới hạn trong sản xuất thực phẩm",
    "choice4": "Một tiêu chuẩn về đóng gói và bảo quản thực phẩm",
    "answer": "Hệ thống phân tích mối nguy và kiểm soát điểm tới hạn trong sản xuất thực phẩm"
  },
  {
    "question": "CCP là gì?",
    "choice1": "Quy trình kiểm tra cảm quan nguyên liệu đầu vào",
    "choice2": "Điểm kiểm soát tới hạn trong quá trình sản xuất nhằm loại bỏ hoặc giảm mối nguy đến mức chấp nhận được",
    "choice3": "Kế hoạch dự phòng khi có sự cố xảy ra trong sản xuất",
    "choice4": "Hệ thống quản lý chất lượng dựa trên tiêu chuẩn ISO 9001",
    "answer": "Điểm kiểm soát tới hạn trong quá trình sản xuất nhằm loại bỏ hoặc giảm mối nguy đến mức chấp nhận được"
  },
  {
    "question": "OPRP là gì?",
    "choice1": "Quy trình vận hành thường ngày trong doanh nghiệp",
    "choice2": "Biện pháp kiểm soát mối nguy không đáng kể trong hệ thống ISO 9001",
    "choice3": "Biện pháp kiểm soát mối nguy quan trọng nhưng không được phân loại là CCP, thuộc chương trình tiên quyết vận hành",
    "choice4": "Quy trình kiểm nghiệm vi sinh vật trong thực phẩm",
    "answer": "Biện pháp kiểm soát mối nguy quan trọng nhưng không được phân loại là CCP, thuộc chương trình tiên quyết vận hành"
  },
  {
    "question": "Mối nguy đáng kể trong hệ thống HACCP là gì?",
    "choice1": "Mối nguy có khả năng xảy ra và/hoặc gây hậu quả nghiêm trọng đến an toàn thực phẩm, cần được kiểm soát bằng biện pháp cụ thể",
    "choice2": "Mối nguy có thể xảy ra nhưng không ảnh hưởng đến chất lượng sản phẩm",
    "choice3": "Mối nguy có thể được kiểm soát hoàn toàn bởi chương trình tiên quyết (PRP), không cần phân tích thêm",
    "choice4": "Mối nguy có liên quan đến yếu tố cảm quan hoặc thẩm mỹ của sản phẩm nhưng không ảnh hưởng đến sức khỏe",
    "answer": "Mối nguy có khả năng xảy ra và/hoặc gây hậu quả nghiêm trọng đến an toàn thực phẩm, cần được kiểm soát bằng biện pháp cụ thể"
  },
  {
    "question": "Vi sinh vật nào sau đây không nằm trong danh mục vi sinh vật cần kiểm soát trong nước uống theo QCVN?",
    "choice1": "Acid lactic bacteria",
    "choice2": "Pseudomonas aeruginosa",
    "choice3": "Escherichia coli",
    "choice4": "Coliform tổng số",
    "answer": "Acid lactic bacteria"
  },
  {
    "question": "Phát biểu nào sau đây về Pseudomonas aeruginosa trong nước uống là đúng theo QCVN 6-1: 2010/BYT?",
    "choice1": "Đây là vi khuẩn cơ hội, bắt buộc không được phát hiện trong mẫu nước uống đóng chai",
    "choice2": "Vi khuẩn này được cho phép tồn tại với số lượng giới hạn trong nước uống đóng chai",
    "choice3": "Pseudomonas aeruginosa chỉ gây hại trong nước sinh hoạt, không cần kiểm soát trong nước uống",
    "choice4": "Chỉ kiểm tra Pseudomonas aeruginosa khi có dấu hiệu ô nhiễm nguồn nước",
    "answer": "Đây là vi khuẩn cơ hội, bắt buộc không được phát hiện trong mẫu nước uống đóng chai"
  },
  {
    "question": "Việc kiểm soát Pseudomonas aeruginosa trong nước uống đóng chai quan trọng vì lý do nào?",
    "choice1": "Pseudomonas aeruginosa giúp làm sạch các tạp chất trong nước",
    "choice2": "Đây là vi khuẩn thường xuất hiện trong nước sinh hoạt, không ảnh hưởng nước đóng chai",
    "choice3": "Vi khuẩn này không tồn tại lâu trong môi trường nước",
    "choice4": "Vi khuẩn này gây bệnh cho mọi đối tượng, đặc biệt nguy hiểm cho người có hệ miễn dịch yếu",
    "answer": "Vi khuẩn này gây bệnh cho mọi đối tượng, đặc biệt nguy hiểm cho người có hệ miễn dịch yếu"
  },
  {
    "question": "Một cơ sở sản xuất muốn áp dụng HACCP nhưng không thực hiện đầy đủ các chương trình tiên quyết (PRP). Điều này có thể dẫn đến hậu quả gì?",
    "choice1": "Không ảnh hưởng vì PRP không quan trọng trong HACCP",
    "choice2": "Dễ xảy ra mối nguy không kiểm soát được ngay từ đầu, làm giảm hiệu quả hệ thống HACCP",
    "choice3": "HACCP vẫn hoạt động bình thường mà không cần PRP",
    "choice4": "PRP chỉ ảnh hưởng đến chất lượng, không ảnh hưởng an toàn thực phẩm",
    "answer": "Dễ xảy ra mối nguy không kiểm soát được ngay từ đầu, làm giảm hiệu quả hệ thống HACCP"
  },
  {
    "question": "Tại sao việc xác định mối nguy đáng kể là bước đầu tiên và quan trọng nhất trong hệ thống HACCP?",
    "choice1": "Vì nó giúp tiết kiệm chi phí sản xuất",
    "choice2": "Vì chỉ có mối nguy đáng kể mới ảnh hưởng trực tiếp đến an toàn thực phẩm và cần kiểm soát cụ thể",
    "choice3": "Vì tất cả mối nguy đều giống nhau nên cần phải xác định rõ để phân loại",
    "choice4": "Vì mối nguy đáng kể là những mối nguy đã được loại bỏ hoàn toàn",
    "answer": "Vì chỉ có mối nguy đáng kể mới ảnh hưởng trực tiếp đến an toàn thực phẩm và cần kiểm soát cụ thể"
  },
  {
    "question": "Nếu một CCP bị thất bại, theo HACCP bạn sẽ thực hiện bước tiếp theo nào?",
    "choice1": "Tiếp tục sản xuất bình thường vì thất bại chỉ xảy ra tạm thời",
    "choice2": "Dừng quá trình sản xuất và xử lý sản phẩm có khả năng bị mất an toàn",
    "choice3": "Bỏ qua và tăng cường kiểm tra cảm quan sản phẩm sau khi hoàn thành",
    "choice4": "Ghi nhận và báo cáo sự cố nhưng không cần hành động ngay",
    "answer": "Dừng quá trình sản xuất và xử lý sản phẩm có khả năng bị mất an toàn"
  },
  {
    "question": "Phát biểu nào sau đây mô tả đúng nhất về CIP và COP?",
    "choice1": "CIP là phương pháp vệ sinh bằng tay, còn COP là vệ sinh tự động toàn bộ hệ thống.",
    "choice2": "CIP (Cleaning in Place) là vệ sinh tại chỗ mà không cần tháo rời thiết bị, còn COP (Cleaning out of Place) là vệ sinh bằng cách tháo rời thiết bị và làm sạch riêng biệt.",
    "choice3": "CIP và COP đều là quy trình kiểm tra sản phẩm cuối cùng.",
    "choice4": "CIP và COP là hai phương pháp kiểm định chất lượng nước đầu vào trong sản xuất.",
    "answer": "CIP (Cleaning in Place) là vệ sinh tại chỗ mà không cần tháo rời thiết bị, còn COP (Cleaning out of Place) là vệ sinh bằng cách tháo rời thiết bị và làm sạch riêng biệt."
  },
  {
    "question": "Trong sản xuất thực phẩm, phương pháp vệ sinh nào sau đây thường được áp dụng cho đường ống, bồn chứa và hệ thống khép kín, không cần tháo rời thiết bị?",
    "choice1": "CIP – Vệ sinh tại chỗ",
    "choice2": "COP – Vệ sinh ngoài thiết bị",
    "choice3": "GMP – Thực hành sản xuất tốt",
    "choice4": "GHP – Thực hành vệ sinh tốt",
    "answer": "CIP – Vệ sinh tại chỗ"
  },
  {
    "question": "Bước nào sau đây không thuộc trong quy trình CIP line 1 (chỉ sản xuất nước khoáng 375)",
    "choice1": "Divoflow",
    "choice2": "Chlorine",
    "choice3": "Acid citric",
    "choice4": "Nước RO 20",
    "answer": "Divoflow"
  },
  {
    "question": "Khi quy trình CIP có sử dụng hóa chất nào sau đây thì cần phải đo chỉ tiêu \"\"Hợp chất hữu cơ\"\"?",
    "choice1": "Divoflow",
    "choice2": "Nước RO 20",
    "choice3": "Acid  hydrochloric ",
    "choice4": "Acid citric",
    "answer": "Acid citric"
  },
  {
    "question": "Trước khi sản xuất, các chỉ tiêu chất lượng nào bắt buộc phải đo bất kể sử dụng quy trình CIP nào?",
    "choice1": "Trạng thái (cặn/không cặn), màu, mùi, vị",
    "choice2": "Hợp chất hữu cơ",
    "choice3": "Chlorine dư",
    "choice4": "Tất cả đều đúng",
    "answer": "Trạng thái (cặn/không cặn), màu, mùi, vị"
  },
  {
    "question": "Sau quá trình CIP, chỉ tiêu Hợp chất hữu cơ vượt tiêu chuẩn trong nước tráng cuối, điều này thể hiện hóa chất nào chưa được xả sạch?",
    "choice1": "Acid citric",
    "choice2": "Chlorine",
    "choice3": "Divoflow",
    "choice4": "Cyclodextrin",
    "answer": "Acid citric"
  },
  {
    "question": "Hóa chất nào đang được sử dụng để xông phòng?",
    "choice1": "Formol",
    "choice2": "Chlorine",
    "choice3": "Divoflow",
    "choice4": "Oxonia",
    "answer": "Oxonia"
  },
  {
    "question": "Chỉ tiêu nào bị out khi nấu dư đường?",
    "choice1": "Out min brix",
    "choice2": "Out min thể tích",
    "choice3": "Out min acid",
    "choice4": "Out max acid",
    "answer": "Out min acid"
  },
  {
    "question": "Chỉ tiêu nào bị out khi nấu thiếu đường?",
    "choice1": "Out max brix",
    "choice2": "Out max thể tích",
    "choice3": "Out min acid",
    "choice4": "Out max acid",
    "answer": "Out max acid"
  },
  {
    "question": "Chỉ tiêu nào bị out khi nấu dư acid?",
    "choice1": "Brix",
    "choice2": "Thể tích",
    "choice3": "Cảm quan",
    "choice4": "Tất cả đều đúng",
    "answer": "Cảm quan"
  },
  {
    "question": "Chỉ tiêu nào bị out khi nấu thiếu acid?",
    "choice1": "Cảm quan",
    "choice2": "Thể tích",
    "choice3": "Brix",
    "choice4": "Tất cả đều đúng",
    "answer": "Cảm quan"
  },
  {
    "question": "Nước dùng để nấu đường Wake up 247?",
    "choice1": "TDS 375",
    "choice2": "TDS 1900",
    "choice3": "TDS 20",
    "choice4": "TDS 80",
    "answer": "TDS 20"
  },
  {
    "question": "Nước dùng để nấu đường Lemona?",
    "choice1": "TDS 1900",
    "choice2": "TDS 20",
    "choice3": "TDS 375",
    "choice4": "TDS 80",
    "answer": "TDS 1900"
  },
  {
    "question": "Nhiệt độ nước nấu đường Wake up 247?",
    "choice1": "30",
    "choice2": "70",
    "choice3": "100",
    "choice4": "50",
    "answer": "30"
  },
  {
    "question": "Vị của sản phẩm Wake up 247 được mô tả ra sao?",
    "choice1": "Đắng gắt, chua gắt",
    "choice2": "Vừa, có vị chua nhẹ",
    "choice3": "Ngọt vừa, có vị đắng của cà phê, không có vị lạ",
    "choice4": "Mặn nhẹ",
    "answer": "Ngọt vừa, có vị đắng của cà phê, không có vị lạ"
  },
  {
    "question": "Khi nấu Lemona, vận hành A quên đẩy nước tráng acid làm lượng acid hồi về tank đang nấu sodium benzoate, hiện tượng nào sau đây xảy ra?",
    "choice1": "Sủi bọt khí",
    "choice2": "Cháy nổ",
    "choice3": "Tạo kết tủa",
    "choice4": "Không có hiện tượng",
    "answer": "Tạo kết tủa"
  },
  {
    "question": "Nhiệt độ đo gas của sản phẩm CSD dạng chai là bao nhiêu?",
    "choice1": "2 - 6oC",
    "choice2": "18 - 22oC",
    "choice3": "Nhiệt độ hòa gas",
    "choice4": "Nhiệt độ chiết",
    "answer": "2 - 6oC"
  },
  {
    "question": "Nhiệt độ đo gas của sản phẩm CSD dạng lon là bao nhiêu?",
    "choice1": "2 - 6oC",
    "choice2": "18 - 22oC",
    "choice3": "Nhiệt độ hòa gas",
    "choice4": "Nhiệt độ chiết",
    "answer": "18 - 22oC"
  },
  {
    "question": "Trộn trực tiếp các loại phụ gia nào sau đây trong nước không gây hiện tượng sủi bọt?",
    "choice1": "Acid citric và sodium bicarbonate",
    "choice2": "Taurine và sodium bicarbonate",
    "choice3": "Acid citric và nước TDS 1900",
    "choice4": "Acid citric và sodium citrate",
    "answer": "Acid citric và sodium citrate"
  },
  {
    "question": "Một nhà máy trong năm 2024 nhận được 4 trường hợp khiếu nại từ khách hàng, với tổng số sản phẩm bị khiếu nại là 10 chai. Biết sản lượng sản xuất của nhà máy trong năm 2024 là 1 triệu chai. Hãy tính chỉ số PQCR (Product quality complaint rate) của nhà máy? Biết PQCR là tỷ lệ sản phẩm bị khiếu nại trên 1 tỷ sản phẩm sản xuất được",
    "choice1": "10000",
    "choice2": "1000",
    "choice3": "100",
    "choice4": "10",
    "answer": "10000"
  },
  {
    "question": "Một nhà máy sản xuất 10 triệu chai trong năm 2024. Chỉ số PQCR (tỷ lệ sản phẩm bị khiếu nại trên 1 tỷ sản phẩm sản xuất) của nhà máy là 100. Hỏi trong năm 2024, tổng số sản phẩm bị khiếu nại của nhà máy là bao nhiêu chai?",
    "choice1": "10000",
    "choice2": "1000",
    "choice3": "10",
    "choice4": "1",
    "answer": "1"
  },
  {
    "question": "Một nhà máy sản xuất 2 loại sản phẩm A và B với tổng sản lượng 12 triệu chai trong năm 2024. Chỉ số PQCR của loại A là 4, của loại B là 6 (trên 1 tỷ sản phẩm). Tổng số sản phẩm bị khiếu nại của cả hai loại là 56 chai. Sản lượng năm 2024 của sản phẩm A và B là bao nhiêu (đơn vị: triệu chai)?",
    "choice1": "A: 8, B: 4",
    "choice2": "A: 7, B: 5",
    "choice3": "A: 6, B: 6",
    "choice4": "A: 9, B: 3",
    "answer": "A: 8, B: 4"
  },
  {
    "question": "Trong quá trình giải quyết khiếu nại khách hàng, phát biểu nào sau đây sai?",
    "choice1": "Cần xem xét kỹ nguyên nhân để xác định trách nhiệm và xử lý phù hợp.",
    "choice2": "Tất cả khiếu nại đều là lỗi của nhà máy, khách hàng không bao giờ sai.",
    "choice3": "Việc lắng nghe khách hàng giúp cải thiện chất lượng sản phẩm và dịch vụ.",
    "choice4": "Giải quyết khiếu nại kịp thời giúp nâng cao sự hài lòng và uy tín của doanh nghiệp.",
    "answer": "Tất cả khiếu nại đều là lỗi của nhà máy, khách hàng không bao giờ sai."
  },
  {
    "question": "Khi xử lý khiếu nại, bạn phát hiện lỗi do đối tác cung cấp nguyên liệu gây ra. Bạn sẽ làm gì?",
    "choice1": "Chỉ thông báo cho khách hàng và không làm gì thêm.",
    "choice2": "Thông báo cho bộ phận mua hàng và quản lý đối tác để phối hợp xử lý và cải tiến, đồng thời thông báo với khách hàng về tiến độ xử lý.",
    "choice3": "Đổ lỗi cho khách hàng sử dụng sai sản phẩm.",
    "choice4": "Giấu lỗi để tránh ảnh hưởng tới danh tiếng công ty.",
    "answer": "Thông báo cho bộ phận mua hàng và quản lý đối tác để phối hợp xử lý và cải tiến, đồng thời thông báo với khách hàng về tiến độ xử lý."
  },
  {
    "question": "Phát biểu nào sau đây về DPMO là sai?",
    "choice1": "DPMO được tính dựa trên số loại lỗi chia cho tổng số sản phẩm sản xuất.",
    "choice2": "DPMO càng thấp thì quy trình càng có chất lượng cao.",
    "choice3": "DPMO là số lượng lỗi trên mỗi triệu cơ hội xảy ra trong quy trình sản xuất.",
    "choice4": "DPMO giúp đo lường mức độ lỗi để đánh giá và cải tiến quy trình.",
    "answer": "DPMO được tính dựa trên số loại lỗi chia cho tổng số sản phẩm sản xuất."
  },
  {
    "question": "Phát biểu nào sau đây về Sigma Level là sai?",
    "choice1": "Sigma Level thể hiện mức độ hiệu quả của một quy trình sản xuất dựa trên số lượng lỗi xảy ra.",
    "choice2": "Sigma Level càng cao, tỷ lệ sản phẩm lỗi càng thấp và chất lượng càng tốt.",
    "choice3": "Sigma Level là một con số cố định, không thay đổi theo hiệu suất quy trình.",
    "choice4": "Sigma Level giúp doanh nghiệp đánh giá và cải tiến chất lượng sản phẩm.",
    "answer": "Sigma Level là một con số cố định, không thay đổi theo hiệu suất quy trình."
  },
  {
    "question": "Mối liên hệ chính giữa DPMO (Defects Per Million Opportunities - Số lỗi trên một triệu cơ hội) và Sigma Level là gì?",
    "choice1": "DPMO càng cao thì Sigma Level càng cao, cho thấy quy trình hoạt động hiệu quả hơn.",
    "choice2": "DPMO và Sigma Level là hai khái niệm riêng biệt, không liên quan đến nhau.",
    "choice3": "DPMO chỉ dùng để đo lường chất lượng trong phòng thí nghiệm, không áp dụng cho sản xuất thực tế.",
    "choice4": "Khi số lỗi trên mỗi triệu cơ hội giảm xuống, Sigma Level sẽ tăng lên, cho thấy chất lượng quy trình được cải thiện.",
    "answer": "Khi số lỗi trên mỗi triệu cơ hội giảm xuống, Sigma Level sẽ tăng lên, cho thấy chất lượng quy trình được cải thiện."
  },
  {
    "question": "Phát biểu nào sau đây đúng nhất về ý nghĩa của hai chỉ số Cp và Cpk trong quản lý chất lượng?",
    "choice1": "Cp và Cpk dùng để đo độ cứng của sản phẩm trong quá trình kiểm tra vật lý.",
    "choice2": "Cp và Cpk là hai chỉ số dùng để đánh giá khả năng tài chính của doanh nghiệp.",
    "choice3": "Cp và Cpk phản ánh mức độ đáp ứng của quá trình sản xuất so với yêu cầu kỹ thuật; trong đó, Cpk xét đến cả độ lệch tâm của quá trình.",
    "choice4": "Cp và Cpk là các đơn vị đo lường khối lượng của nguyên liệu đầu vào.",
    "answer": "Cp và Cpk phản ánh mức độ đáp ứng của quá trình sản xuất so với yêu cầu kỹ thuật; trong đó, Cpk xét đến cả độ lệch tâm của quá trình."
  },
  {
    "question": "Nhân viên A đo thể tích của 5 chai sản phẩm Wake-up 247 (mL) là: 330.2 mL, 330.5 mL, 330.3 mL, 330.4 mL, 330.6 mL. Trung bình (mean) thể tích là bao nhiêu?",
    "choice1": "330.25",
    "choice2": "330.3",
    "choice3": "330.35",
    "choice4": "330.4",
    "answer": "330.4"
  },
  {
    "question": "Nhân viên A đo thể tích của 5 chai sản phẩm Wake-up 247 (mL) là: 330.1, 330.3, 330.2, 330.4, 330.5. Trung vị (median) thể tích là bao nhiêu?",
    "choice1": "330.25",
    "choice2": "330.3",
    "choice3": "330.35",
    "choice4": "330.4",
    "answer": "330.3"
  },
  {
    "question": "Nếu dữ liệu đo lường sản phẩm có độ lệch chuẩn (standard deviation) càng nhỏ, việc này cho thấy điều gì?",
    "choice1": "Sản phẩm có nhiều lỗi hơn",
    "choice2": "Dữ liệu bị phân tán rộng",
    "choice3": "Sản phẩm có tính ổn định cao",
    "choice4": "Trung bình bị sai lệch",
    "answer": "Sản phẩm có tính ổn định cao"
  },
  {
    "question": "Bộ kết quả nào sau đây có độ lệch chuẩn nhỏ nhất?",
    "choice1": "9.8, 10.0, 10.2, 10.4, 10.6",
    "choice2": "10.0, 10.0, 10.0, 10.0, 10.0",
    "choice3": "8.5, 9.5, 10.5, 11.5, 12.5",
    "choice4": "9.0, 10.0, 11.0, 12.0, 13.0",
    "answer": "10.0, 10.0, 10.0, 10.0, 10.0"
  },
  {
    "question": "Chỉ số nào sau đây đánh giá độ phân tán dữ liệu?",
    "choice1": "Độ lệch chuẩn",
    "choice2": "Trung vị",
    "choice3": "Mode (Giá trị xuất hiện nhiều nhất)",
    "choice4": "Trung bình",
    "answer": "Độ lệch chuẩn"
  },
  {
    "question": "Khi sử dụng biểu đồ kiểm soát (Control Chart), nếu một điểm nằm ngoài giới hạn ±3σ, điều đó có nghĩa là gì?",
    "choice1": "Quá trình vẫn ổn định",
    "choice2": "Có lỗi do con người",
    "choice3": "Có khả năng quá trình không còn kiểm soát",
    "choice4": "Đó là sản phẩm tốt",
    "answer": "Có khả năng quá trình không còn kiểm soát"
  },
  {
    "question": "Đặc điểm nào dưới đây là của trung vị (median)?",
    "choice1": "Là giá trị chính giữa sau khi sắp xếp dữ liệu",
    "choice2": "Luôn bằng trung bình nếu phân bố khác chuẩn",
    "choice3": "Bị ảnh hưởng mạnh bởi các giá trị ngoại lệ",
    "choice4": "Luôn là giá trị phổ biến nhất",
    "answer": "Là giá trị chính giữa sau khi sắp xếp dữ liệu"
  },
  {
    "question": "Giá trị xuất hiện thường xuyên nhất trong bộ dữ liệu được gọi là gì?",
    "choice1": "Yếu vị (Mode)",
    "choice2": "Trung vị (Median)",
    "choice3": "Trung bình (Mean)",
    "choice4": "Độ lệch chuẩn (Standard deviation)",
    "answer": "Yếu vị (Mode)"
  },
  {
    "question": "Trong kiểm soát chất lượng, dữ liệu phân bố càng gần trung bình thì điều gì xảy ra?",
    "choice1": "Độ lệch chuẩn càng lớn",
    "choice2": "Sự ổn định càng cao",
    "choice3": "Sự biến động càng cao",
    "choice4": "Phân bố càng lệch",
    "answer": "Sự ổn định càng cao"
  },
  {
    "question": "Đặc điểm nào sau đây là của phân bố chuẩn (normal distribution)?",
    "choice1": "Bị lệch về bên phải",
    "choice2": "Bị lệch về bên trái",
    "choice3": "Đối xứng quanh trung bình",
    "choice4": "Không có trung vị",
    "answer": "Đối xứng quanh trung bình"
  },
  {
    "question": "Một thiết bị sản xuất ra sản phẩm có độ lệch chuẩn tăng dần, việc này cho thấy điều gì?",
    "choice1": "Chất lượng trở nên đồng đều hơn",
    "choice2": "Sản phẩm chất lượng hơn",
    "choice3": "Dữ liệu phân tán rộng hơn",
    "choice4": "Dữ liệu phân tán hẹp hơn",
    "answer": "Dữ liệu phân tán rộng hơn"
  },
  {
    "question": "Theo Luật Western trong SPC, bao nhiêu điểm liên tiếp nằm cùng phía trung bình là dấu hiệu bất thường?",
    "choice1": "4 điểm",
    "choice2": "6 điểm",
    "choice3": "7 điểm",
    "choice4": "10 điểm",
    "answer": "7 điểm"
  },
  {
    "question": "Điểm nào sau đây không phải là dấu hiệu phổ biến của một nguyên nhân đặc biệt trong biểu đồ kiểm soát?",
    "choice1": "Một điểm nằm ngoài giới hạn kiểm soát",
    "choice2": "7 điểm liên tiếp đi lên hoặc đi xuống",
    "choice3": "6 điểm dao động quanh trung bình",
    "choice4": "2 trong 3 điểm nằm gần giới hạn kiểm soát",
    "answer": "6 điểm dao động quanh trung bình"
  },
  {
    "question": "Mục tiêu chính của việc áp dụng các luật SPC (như Western Rules) là gì?",
    "choice1": "Xác định sản phẩm lỗi để loại bỏ",
    "choice2": "Kiểm tra mẫu ngẫu nhiên",
    "choice3": "Phát hiện nguyên nhân đặc biệt trước khi quá trình vượt ngoài kiểm soát",
    "choice4": "Tối đa hóa sản lượng sản xuất",
    "answer": "Phát hiện nguyên nhân đặc biệt trước khi quá trình vượt ngoài kiểm soát"
  },
  {
    "question": "Điều gì xảy ra nếu một điểm nằm ngay trên giới hạn kiểm soát trên (UCL)?",
    "choice1": "Điểm đó không được tính là bất thường vì chưa vượt giới hạn",
    "choice2": "Điểm đó chắc chắn là lỗi sản phẩm",
    "choice3": "Điểm đó nên được xem xét vì sát giới hạn có thể là dấu hiệu sớm của mất kiểm soát",
    "choice4": "Điểm đó cho thấy quá trình đang hoạt động tốt hơn bình thường",
    "answer": "Điểm đó nên được xem xét vì sát giới hạn có thể là dấu hiệu sớm của mất kiểm soát"
  },
  {
    "question": "Giới hạn kiểm soát (UCL và LCL) thường được thiết lập ở mức nào?",
    "choice1": "±1 sigma",
    "choice2": "±2 sigma",
    "choice3": "±3 sigma",
    "choice4": "±6 sigma",
    "answer": "±3 sigma"
  },
  {
    "question": "Tại sao việc phát hiện các điểm bất thường trong biểu đồ kiểm soát lại quan trọng?",
    "choice1": "Giúp cải tiến chất lượng tài chính",
    "choice2": "Giúp phát hiện sớm nguyên nhân đặc biệt ảnh hưởng đến quá trình",
    "choice3": "Giúp đo tốc độ sản xuất",
    "choice4": "Giúp kiểm tra hiệu suất của máy móc hàng ngày",
    "answer": "Giúp phát hiện sớm nguyên nhân đặc biệt ảnh hưởng đến quá trình"
  },
  {
    "question": "Một biểu đồ kiểm soát có nhiều điểm dao động lên xuống đột ngột giữa giới hạn trên và dưới. Điều này có thể chỉ ra điều gì?",
    "choice1": "Quá trình ổn định",
    "choice2": "Hệ thống đo lường quá chính xác",
    "choice3": "Có biến động quá mức",
    "choice4": "Trung bình bị dịch chuyển",
    "answer": "Có biến động quá mức"
  },
  {
    "question": "Luật SPC quy định \"\"7 điểm liên tiếp cùng phía trung bình\"\" là dấu hiệu lệch quá trình. Vậy nếu có 6 điểm bên trên trung bình và 1 điểm cuối ở chính giữa trung bình, thì:",
    "choice1": "Không tính là vi phạm luật vì chưa đủ 7 điểm",
    "choice2": "Có thể xem là dấu hiệu lệch vì điểm giữa trung bình vẫn nằm cùng phía",
    "choice3": "Là vi phạm luật vì điểm giữa trung bình vẫn thuộc bên trên",
    "choice4": "Không rõ, cần thêm dữ liệu",
    "answer": "Không tính là vi phạm luật vì chưa đủ 7 điểm"
  },
  {
    "question": "Giới hạn kiểm soát (Control Limits) khác với giới hạn kỹ thuật (Specification Limits) ở điểm nào?",
    "choice1": "Control limits do khách hàng đặt ra, Specification limits do QA quy định",
    "choice2": "Control limits dựa trên thống kê quá trình, Specification limits dựa trên yêu cầu kỹ thuật",
    "choice3": "Không có sự khác biệt thực sự, chỉ khác tên gọi",
    "choice4": "Control limits là rộng hơn Specification limits",
    "answer": "Control limits dựa trên thống kê quá trình, Specification limits dựa trên yêu cầu kỹ thuật"
  },
  {
    "question": "Giới hạn kiểm soát được tính dựa trên:",
    "choice1": "Yêu cầu khách hàng",
    "choice2": "Dữ liệu thống kê từ quá trình thực tế",
    "choice3": "Tiêu chuẩn ISO",
    "choice4": "Giới hạn thiết kế sản phẩm",
    "answer": "Dữ liệu thống kê từ quá trình thực tế"
  },
  {
    "question": "Lý do chính khiến biểu đồ kiểm soát cần có các luật kiểm soát là gì?",
    "choice1": "Để tính toán trung bình quá trình",
    "choice2": "Để xác định nguyên nhân phổ biến",
    "choice3": "Để phát hiện nguyên nhân đặc biệt càng sớm càng tốt",
    "choice4": "Để đảm bảo tuân thủ yêu cầu của QA",
    "answer": "Để phát hiện nguyên nhân đặc biệt càng sớm càng tốt"
  },
  {
    "question": "Khi một quá trình luôn nằm trong giới hạn kiểm soát nhưng sản phẩm vẫn lỗi, điều gì có thể xảy ra?",
    "choice1": "Biểu đồ kiểm soát sai",
    "choice2": "Giới hạn kiểm soát quá hẹp",
    "choice3": "Giới hạn kiểm soát khác với giới hạn kỹ thuật – quá trình không đủ năng lực",
    "choice4": "Thiết bị sản xuất hỏng",
    "answer": "Giới hạn kiểm soát khác với giới hạn kỹ thuật – quá trình không đủ năng lực"
  },
  {
    "question": "Độ rộng giữa UCL và LCL phụ thuộc chủ yếu vào:",
    "choice1": "Số mẫu",
    "choice2": "Biến thiên của quá trình",
    "choice3": "Mong muốn của khách hàng",
    "choice4": "Mức sigma thiết lập",
    "answer": "Biến thiên của quá trình"
  },
  {
    "question": "Nếu dữ liệu không phân phối chuẩn, áp dụng ±3 sigma cho giới hạn kiểm soát có thể:",
    "choice1": "Không ảnh hưởng",
    "choice2": "Làm giảm độ nhạy phát hiện sai lệch",
    "choice3": "Làm biểu đồ đẹp hơn",
    "choice4": "Tăng độ chính xác của trung bình",
    "answer": "Làm giảm độ nhạy phát hiện sai lệch"
  },
  {
    "question": "Một điểm vượt giới hạn kiểm soát nhưng nằm trong giới hạn kỹ thuật có nghĩa là:",
    "choice1": "Sản phẩm đạt yêu cầu",
    "choice2": "Quá trình mất kiểm soát, dù sản phẩm có thể đạt",
    "choice3": "Không vấn đề gì",
    "choice4": "Máy móc hoạt động tốt hơn kỳ vọng",
    "answer": "Quá trình mất kiểm soát, dù sản phẩm có thể đạt"
  },
  {
    "question": "Cát ODM 2F dùng để làm gì trong hệ thống nước TDS 1900?",
    "choice1": "Hấp phụ Clorine trong nước",
    "choice2": "Loại bỏ vi sinh",
    "choice3": "Khử flo",
    "choice4": "Khử sắt",
    "answer": "Khử sắt"
  },
  {
    "question": "Flo trong nước nguồn 1900 được loại bỏ qua hệ thống nào?",
    "choice1": "Màng RO",
    "choice2": "Lọc than",
    "choice3": "Lọc cát",
    "choice4": "Làm mềm",
    "answer": "Màng RO"
  },
  {
    "question": "TDS nước 80 cao?",
    "choice1": "Giảm tỉ lệ phối nước 1900",
    "choice2": "Giảm tỉ lệ phối nước TDS 20",
    "choice3": "Giảm độ cứng nước",
    "choice4": "Giảm lưu lượng nước",
    "answer": "Giảm tỉ lệ phối nước 1900"
  },
  {
    "question": "Điều gì xảy ra khi hạt nhựa trao đổi ion đã bão hòa mà không được tái sinh kịp thời?",
    "choice1": "pH nước giảm",
    "choice2": "Độ cứng nước sau làm mềm tăng",
    "choice3": "HCO3- sau làm mềm tăng",
    "choice4": "Độ cứng sau làm mềm giảm",
    "answer": "Độ cứng nước sau làm mềm tăng"
  },
  {
    "question": "Cơ chế hoạt động của lọc than?",
    "choice1": "Quá trình trao đổi ion",
    "choice2": "Quá trình hấp thụ",
    "choice3": "Quá trình hấp phụ",
    "choice4": "Quá trình lắng",
    "answer": "Quá trình hấp phụ"
  },
  {
    "question": "Khi than hoạt tính nước TDS 250 bão hòa, nước sau lọc than sẽ ?",
    "choice1": "Độ cứng nước cao",
    "choice2": "Nước lẫn bụi than",
    "choice3": "Nhiễm vi sinh",
    "choice4": "Nước có nồng độ clorine cao",
    "answer": "Nước có nồng độ clorine cao"
  },
  {
    "question": "Clorine tráng chai sử dụng loại nước nào?",
    "choice1": "TDS 250",
    "choice2": "TDS 220",
    "choice3": "TDS 375",
    "choice4": "TDS 20",
    "answer": "TDS 20"
  },
  {
    "question": "Khi bị ngộ độc thực phẩm, thì nơi có người ngộ độc thực phẩm báo cho cơ quan nào?",
    "choice1": "Cơ sở y tế gần nhất",
    "choice2": "Hội tiêu chuẩn và bảo vệ quyền lợi người tiêu dùng.",
    "choice3": "Chi cục Quản lý thị trường.",
    "choice4": "Chi cục an toàn thực phẩm.",
    "answer": "Cơ sở y tế gần nhất"
  }
];

//CONSTANTS
const INCORRECT_TAX = 100;
const MAX_QUESTIONS = questions.length;
console.log(MAX_QUESTIONS)
const thoi_gian_max = 600000;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  // Timer
  setInterval(function () {
    thoi_gian_su_dung ++;
    thoi_gian_su_dungText.innerText = `${thoi_gian_su_dung}/${thoi_gian_max/1000}`;
    
    if (so_cau_sai !== 0 ) {
      localStorage.setItem("so_cau_dung", questionCounter-1);
      localStorage.setItem("so_cau_sai", so_cau_sai);
      localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung);
      window.location.assign("../../assets/html/end.html");
    }
    if (thoi_gian_su_dung*1000 === thoi_gian_max) {
      localStorage.setItem("so_cau_dung", questionCounter-1);
      localStorage.setItem("so_cau_sai", so_cau_sai);
      localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung)
      window.location.assign("../../assets/html/end.html");
      alert("Hết giờ rồi!")
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("so_cau_dung", questionCounter);
    localStorage.setItem("so_cau_sai", so_cau_sai);
    localStorage.setItem("thoi_gian_su_dung", thoi_gian_su_dung)
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

 // Tạo ma trận xáo trộn câu trả lời
 function getRandomArray(arr) {
  const copy = [...arr]; // make a copy to avoid modifying original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index
    [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
  }
  return copy;
}
const original = [1, 2, 3, 4];
const randomArray = getRandomArray(original);
console.log(randomArray); 

  choices[0].innerText = currentQuestion["choice" + randomArray[0]];
  choices[1].innerText = currentQuestion["choice" + randomArray[1]];
  choices[2].innerText = currentQuestion["choice" + randomArray[2]];
  choices[3].innerText = currentQuestion["choice" + randomArray[3]];
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.innerText;
    
    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : "incorrect";

    if (classToApply === "incorrect") {
      setTimeout(() => {
        alert("Sai rồi!")
      }, 50);
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
