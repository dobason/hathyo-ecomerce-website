import React from "react";

function BMRContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH TỶ LỆ TRAO ĐỔI CHẤT CƠ BẢN (BMR) ONLINE
        </h5>
      </div>
      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        BMR (Basal Metabolic Rate) là lượng calo tối thiểu mà cơ thể cần để duy
        trì các chức năng sống cơ bản trong trạng thái nghỉ ngơi hoàn toàn, bao
        gồm hô hấp, tuần hoàn, điều hòa thân nhiệt, hoạt động của não và các cơ
        quan nội tạng. Việc tính BMR là nền tảng quan trọng giúp xây dựng chế độ
        ăn uống và luyện tập phù hợp với nhu cầu năng lượng cá nhân.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Vai trò của BMR trong kiểm soát cân nặng:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Hiểu được chỉ số BMR giúp bạn xác định chính xác lượng calo cần thiết
          mỗi ngày để duy trì cân nặng hiện tại. Khi biết BMR và mức độ hoạt
          động thể chất, bạn có thể tính tổng năng lượng tiêu hao hàng ngày
          (TDEE) và từ đó điều chỉnh lượng calo nạp vào để giảm cân, tăng cân
          hoặc giữ cân.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các yếu tố ảnh hưởng đến BMR:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Nhiều yếu tố có thể ảnh hưởng đến BMR của một người, bao gồm:
          <ul className="list-disc ml-5 mt-3">
            <li>Tuổi tác: BMR giảm dần theo tuổi.</li>
            <li>Giới tính: Nam giới thường có BMR cao hơn nữ giới.</li>
            <li>Khối lượng cơ: Cơ bắp tiêu thụ nhiều năng lượng hơn mỡ.</li>
            <li>
              Di truyền: Yếu tố di truyền ảnh hưởng đến tốc độ trao đổi chất.
            </li>
            <li>Tình trạng sức khỏe và nội tiết tố.</li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính BMR:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify mb-3">
          Một trong những công thức phổ biến để tính BMR là Harris-Benedict:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              <strong>Nam:</strong> BMR = 88.36 + (13.4 × cân nặng kg) + (4.8 ×
              chiều cao cm) - (5.7 × tuổi)
            </li>
            <li>
              <strong>Nữ:</strong> BMR = 447.6 + (9.2 × cân nặng kg) + (3.1 ×
              chiều cao cm) - (4.3 × tuổi)
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Ứng dụng của chỉ số BMR:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          BMR giúp bạn cá nhân hóa kế hoạch dinh dưỡng và tập luyện. Bằng cách
          kết hợp BMR với mức độ vận động hàng ngày, bạn có thể xác định tổng
          nhu cầu năng lượng và đưa ra lựa chọn phù hợp để đạt được mục tiêu sức
          khỏe và hình thể.
        </div>
      </div>
    </main>
  );
}

export default BMRContent;
