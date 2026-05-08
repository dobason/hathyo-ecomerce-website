import React from "react";

function IdealWeightContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH TOÁN CÂN NẶNG LÝ TƯỞNG DỰA TRÊN CHIỀU CAO VÀ GIỚI TÍNH
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Cân nặng lý tưởng (Ideal Body Weight - IBW) là mức cân nặng được ước
        tính là tối ưu nhất cho sức khỏe và vóc dáng của một người, dựa trên
        chiều cao, giới tính và đôi khi là độ tuổi. Đây là một chỉ số quan trọng
        trong lĩnh vực dinh dưỡng và thể hình, thường được sử dụng để thiết lập
        mục tiêu cân nặng hợp lý và xây dựng kế hoạch cải thiện thể trạng cá
        nhân.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Cân nặng lý tưởng dùng để làm gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc biết được mức cân nặng lý tưởng giúp bạn:
          <ul className="list-disc ml-5 mt-3">
            <li>
              Đánh giá xem cân nặng hiện tại có hợp lý với chiều cao hay không.
            </li>
            <li>Thiết lập mục tiêu giảm cân hoặc tăng cân phù hợp.</li>
            <li>
              Làm cơ sở cho việc xây dựng chế độ ăn uống và luyện tập cá nhân
              hóa.
            </li>
            <li>Ngăn ngừa các nguy cơ sức khỏe liên quan đến cân nặng.</li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các công thức tính cân nặng lý tưởng phổ biến:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Có nhiều công thức khác nhau để tính IBW, trong đó công thức Devine là
          phổ biến nhất:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Nam giới:</strong> 50kg + 2.3kg cho mỗi inch chiều cao
              vượt quá 5 feet (152.4 cm)
            </li>
            <li>
              <strong>Nữ giới:</strong> 45.5kg + 2.3kg cho mỗi inch chiều cao
              vượt quá 5 feet
            </li>
          </ul>
          Ví dụ: Nam cao 170cm (khoảng 66.9 inches):
          <br />
          <code>50 + (2.3 × (66.9 - 60)) ≈ 65.9 kg</code>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Các yếu tố ảnh hưởng đến cân nặng lý tưởng:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Mặc dù công thức cung cấp mức tham chiếu chuẩn, cân nặng lý tưởng có
          thể thay đổi tùy vào:
          <ul className="list-disc ml-5 mt-3">
            <li>Tỷ lệ cơ và mỡ trong cơ thể</li>
            <li>Mức độ hoạt động thể chất</li>
            <li>Cấu trúc xương</li>
            <li>Tuổi và tình trạng sức khỏe tổng thể</li>
          </ul>
          Vì vậy, kết quả nên được kết hợp với các chỉ số khác như BMI, BMR và
          vòng eo để đánh giá toàn diện hơn.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Lưu ý khi sử dụng chỉ số IBW:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              IBW là chỉ số tham khảo, không nên dùng làm tiêu chuẩn tuyệt đối.
            </li>
            <li>
              Các vận động viên hoặc người có nhiều cơ bắp có thể có cân nặng
              vượt chuẩn nhưng vẫn khỏe mạnh.
            </li>
            <li>
              Chỉ nên áp dụng IBW cho người trưởng thành, không áp dụng cho trẻ
              em hoặc người lớn tuổi yếu sức.
            </li>
          </ul>
          Việc sử dụng cân nặng lý tưởng như một mục tiêu linh hoạt sẽ giúp bạn
          điều chỉnh kế hoạch sức khỏe cá nhân một cách an toàn và hiệu quả.
        </div>
      </div>
    </main>
  );
}

export default IdealWeightContent;
