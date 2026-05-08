import React from "react";

function HealthWeightContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          XÁC ĐỊNH CÂN NẶNG KHOẺ MẠNH DỰA TRÊN CHỈ SỐ CÁ NHÂN
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Công cụ xác định cân nặng khỏe mạnh giúp người dùng biết được khoảng cân
        nặng phù hợp với chiều cao, độ tuổi, giới tính và đôi khi là mức độ hoạt
        động thể chất. Đây là một chỉ số hữu ích để đánh giá liệu cân nặng hiện
        tại của bạn có đang ở mức lành mạnh hay không, từ đó làm nền tảng xây
        dựng mục tiêu cải thiện sức khỏe và thể trạng.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Thế nào là cân nặng khỏe mạnh?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Cân nặng khỏe mạnh là mức cân nặng tối ưu cho sức khỏe tổng thể, không
          quá thấp để gây thiếu dinh dưỡng, cũng không quá cao gây ra các bệnh
          lý chuyển hóa. Khoảng cân nặng lý tưởng thường dựa trên:
          <ul className="list-disc ml-5 mt-3">
            <li>Chiều cao</li>
            <li>Giới tính</li>
            <li>Tuổi tác</li>
            <li>Tỷ lệ mỡ cơ thể (trong một số trường hợp)</li>
          </ul>
          Việc xác định cân nặng khỏe mạnh không chỉ dựa vào con số tuyệt đối mà
          còn phải đánh giá theo tổng thể thể trạng.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Vì sao cần biết cân nặng khỏe mạnh?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc duy trì cân nặng hợp lý giúp:
          <ul className="list-disc ml-5 mt-3">
            <li>Giảm nguy cơ mắc bệnh tim mạch, tiểu đường, cao huyết áp.</li>
            <li>Cải thiện chức năng xương khớp và giảm đau lưng, đau gối.</li>
            <li>Tăng hiệu suất hoạt động thể chất và tinh thần.</li>
            <li>Cải thiện vóc dáng và sự tự tin trong cuộc sống.</li>
          </ul>
          Đây là yếu tố cốt lõi trong mọi chương trình chăm sóc sức khỏe bền
          vững.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính phạm vi cân nặng lý tưởng:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Một trong những cách phổ biến để xác định phạm vi cân nặng khỏe mạnh
          là dựa trên chỉ số BMI:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Công thức:</strong>{" "}
              <code>
                Khoảng cân nặng = BMI × (Chiều cao m)<sup>2</sup>
              </code>
            </li>
            <li>
              <strong>Ví dụ:</strong> Với chiều cao 1m65 và BMI lý tưởng từ 18.5
              đến 24.9, cân nặng khỏe mạnh sẽ nằm trong khoảng từ 50.3kg đến
              67.7kg.
            </li>
          </ul>
          Ngoài ra, một số công cụ hiện đại còn xét thêm tuổi và giới tính để
          cho kết quả chính xác hơn.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Lưu ý khi đánh giá cân nặng:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              Không nên chỉ dựa vào cân nặng hoặc BMI để đánh giá sức khỏe tổng
              thể.
            </li>
            <li>
              Tỷ lệ mỡ, khối lượng cơ và các chỉ số khác như vòng eo, huyết áp
              cũng cần được theo dõi.
            </li>
            <li>
              Phụ nữ mang thai, người tập luyện thể thao cường độ cao có thể cần
              đánh giá riêng.
            </li>
          </ul>
          Việc đánh giá toàn diện sẽ giúp đưa ra mục tiêu cải thiện sức khỏe hợp
          lý và hiệu quả hơn.
        </div>
      </div>
    </main>
  );
}

export default HealthWeightContent;
