import React from "react";

function TDEEContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH TỔNG NĂNG LƯỢNG TIÊU HAO MỖI NGÀY (TDEE)
        </h5>
      </div>
      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        TDEE (Total Daily Energy Expenditure) là tổng lượng calo mà cơ thể bạn
        đốt cháy trong một ngày, bao gồm cả mức trao đổi chất cơ bản (BMR), năng
        lượng tiêu hao qua hoạt động thể chất và tiêu hóa thức ăn. Đây là chỉ số
        quan trọng giúp xác định nhu cầu năng lượng hàng ngày, từ đó thiết lập
        chế độ ăn uống và tập luyện phù hợp với mục tiêu sức khỏe của bạn.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. TDEE dùng để làm gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          TDEE giúp bạn xác định lượng calo cần thiết để duy trì cân nặng hiện
          tại. Dựa trên TDEE:
          <ul className="list-disc ml-5 mt-3">
            <li>Ăn ít hơn TDEE → giảm cân.</li>
            <li>Ăn bằng TDEE → duy trì cân nặng.</li>
            <li>Ăn nhiều hơn TDEE → tăng cân.</li>
          </ul>
          Đây là công cụ cực kỳ hữu ích cho người muốn kiểm soát cân nặng, vận
          động viên cần tối ưu hóa hiệu suất hoặc bất kỳ ai quan tâm đến dinh
          dưỡng cá nhân hóa.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các thành phần cấu thành TDEE:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          TDEE bao gồm ba yếu tố chính:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>BMR (Basal Metabolic Rate):</strong> Năng lượng cần thiết
              để duy trì chức năng sống cơ bản.
            </li>
            <li>
              <strong>NEAT (Non-Exercise Activity Thermogenesis):</strong> Năng
              lượng tiêu hao qua các hoạt động không tập luyện (đi lại, làm
              việc, sinh hoạt).
            </li>
            <li>
              <strong>TEF (Thermic Effect of Food):</strong> Năng lượng tiêu hao
              để tiêu hóa và hấp thụ thức ăn.
            </li>
            <li>
              <strong>EAT (Exercise Activity Thermogenesis):</strong> Năng lượng
              tiêu hao qua hoạt động thể dục thể thao.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính TDEE:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          TDEE được tính bằng cách nhân chỉ số BMR với hệ số hoạt động thể chất
          (Activity Factor), dựa trên mức độ vận động hàng ngày của bạn:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Ít vận động (1.2):</strong> Ít hoặc không tập luyện.
            </li>
            <li>
              <strong>Hoạt động nhẹ (1.375):</strong> Tập nhẹ 1–3 ngày/tuần.
            </li>
            <li>
              <strong>Hoạt động vừa (1.55):</strong> Tập vừa 3–5 ngày/tuần.
            </li>
            <li>
              <strong>Hoạt động nhiều (1.725):</strong> Tập nặng 6–7 ngày/tuần.
            </li>
            <li>
              <strong>Hoạt động rất nhiều (1.9):</strong> Vận động viên hoặc lao
              động thể lực cao.
            </li>
          </ul>
          <div className="mt-3">
            <strong>Công thức:</strong> <br />
            <code className="text-Moss/700">TDEE = BMR × Hệ số hoạt động</code>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Lưu ý khi sử dụng TDEE:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              TDEE chỉ là ước tính, có thể dao động theo thể trạng và sinh lý
              mỗi người.
            </li>
            <li>
              Nên kết hợp theo dõi cân nặng thực tế và điều chỉnh chế độ ăn sau
              vài tuần áp dụng.
            </li>
            <li>Cần tính BMR chính xác trước khi áp dụng công thức TDEE.</li>
          </ul>
          <div className="mt-3">
            Việc hiểu rõ TDEE là bước khởi đầu quan trọng trong hành trình xây
            dựng lối sống lành mạnh, ăn uống khoa học và đạt được mục tiêu thể
            chất bền vững.
          </div>
        </div>
      </div>
    </main>
  );
}

export default TDEEContent;
