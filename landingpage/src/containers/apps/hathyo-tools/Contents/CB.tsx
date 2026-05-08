import React from "react";

function CaloriesBurnContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH LƯỢNG CALO TIÊU HAO QUA HOẠT ĐỘNG
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Công cụ tính lượng calo tiêu hao giúp bạn ước tính được mức năng lượng
        mà cơ thể sử dụng trong quá trình thực hiện các hoạt động thể chất hoặc
        sinh hoạt hàng ngày. Thông tin này giúp bạn hiểu rõ mức độ đốt cháy năng
        lượng của từng hoạt động, từ đó xây dựng kế hoạch tập luyện và dinh
        dưỡng phù hợp với mục tiêu sức khỏe cá nhân.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Lượng calo tiêu hao là gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Calo tiêu hao (Calories Burned) là số năng lượng mà cơ thể sử dụng để
          thực hiện các hoạt động như đi bộ, chạy bộ, đạp xe, dọn dẹp nhà cửa,
          hoặc thậm chí là ngủ nghỉ. Mỗi hoạt động tiêu tốn năng lượng khác
          nhau, tùy thuộc vào cường độ, thời gian và thể trạng cá nhân.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các yếu tố ảnh hưởng đến lượng calo tiêu hao:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Mỗi người sẽ đốt cháy lượng calo khác nhau cho cùng một hoạt động, phụ
          thuộc vào:
          <ul className="list-disc ml-5 mt-3">
            <li>Trọng lượng cơ thể</li>
            <li>Giới tính</li>
            <li>Tuổi</li>
            <li>Cường độ và thời gian hoạt động</li>
            <li>Tỷ lệ cơ và mỡ trong cơ thể</li>
          </ul>
          Việc cá nhân hóa thông tin đầu vào giúp ước tính lượng calo chính xác
          hơn.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính calo tiêu hao qua hoạt động:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Một trong các phương pháp phổ biến là sử dụng chỉ số MET (Metabolic
          Equivalent of Task). Đây là chỉ số đo mức năng lượng tiêu hao của hoạt
          động so với khi nghỉ ngơi:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Công thức:</strong>{" "}
              <code>
                Calories Burned = MET × Cân nặng (kg) × Thời gian (giờ)
              </code>
            </li>
            <li>
              Ví dụ: Đi bộ nhẹ nhàng (3.5 MET) trong 1 giờ với cân nặng 60kg →
              tiêu hao khoảng 210 calo.
            </li>
          </ul>
          Ngoài ra, một số thiết bị đeo thông minh hoặc ứng dụng thể thao cũng
          áp dụng công thức này để ước tính năng lượng tiêu hao.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Ứng dụng thực tế:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc nắm rõ mức tiêu hao calo của từng hoạt động giúp bạn:
          <ul className="list-disc ml-5 mt-3">
            <li>Xây dựng kế hoạch tập luyện hiệu quả hơn.</li>
            <li>
              Điều chỉnh lượng calo nạp vào để đạt được mục tiêu giảm cân, tăng
              cơ hoặc giữ cân.
            </li>
            <li>
              Hiểu rõ mức độ tiêu hao năng lượng thực tế thay vì ước lượng cảm
              tính.
            </li>
          </ul>
          Đây là công cụ hữu ích cho cả người mới bắt đầu tập luyện và những ai
          đang theo đuổi lối sống khỏe mạnh.
        </div>
      </div>
    </main>
  );
}

export default CaloriesBurnContent;
