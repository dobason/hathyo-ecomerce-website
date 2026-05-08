import React from "react";

function CaloriesIntakeContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          ƯỚC TÍNH LƯỢNG CALO CẦN NẠP MỖI NGÀY
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Công cụ tính lượng calo cần nạp mỗi ngày giúp bạn xác định được nhu cầu
        năng lượng cá nhân dựa trên mục tiêu sức khỏe: duy trì cân nặng, giảm
        cân hoặc tăng cân. Dựa vào các yếu tố như tuổi, giới tính, chiều cao,
        cân nặng và mức độ vận động, công cụ sẽ đưa ra khuyến nghị chính xác để
        bạn xây dựng chế độ ăn uống hợp lý và hiệu quả.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Lượng calo nạp mỗi ngày có ý nghĩa gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc hiểu và kiểm soát lượng calo tiêu thụ mỗi ngày là chìa khóa để
          đạt được mục tiêu về cân nặng và sức khỏe tổng thể. Khi bạn:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Nạp ít hơn nhu cầu:</strong> cơ thể sẽ sử dụng mỡ dự trữ →
              giúp giảm cân.
            </li>
            <li>
              <strong>Nạp đúng nhu cầu:</strong> giúp duy trì cân nặng ổn định.
            </li>
            <li>
              <strong>Nạp nhiều hơn nhu cầu:</strong> năng lượng dư thừa sẽ tích
              mỡ → dẫn đến tăng cân.
            </li>
          </ul>
          Đây là một công cụ nền tảng trong kế hoạch ăn kiêng, tập luyện, hoặc
          cải thiện hình thể.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Dựa trên những yếu tố nào?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Lượng calo khuyến nghị mỗi ngày được ước tính dựa trên:
          <ul className="list-disc ml-5 mt-3">
            <li>Tuổi</li>
            <li>Giới tính</li>
            <li>Chiều cao và cân nặng</li>
            <li>Mức độ hoạt động thể chất</li>
            <li>Mục tiêu cá nhân: giảm, giữ hay tăng cân</li>
          </ul>
          Việc cá nhân hóa thông tin giúp bạn nhận được khuyến nghị phù hợp với
          tình trạng cơ thể và lối sống.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách ước tính lượng calo cần nạp:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Lượng calo cần nạp mỗi ngày được tính dựa trên công thức BMR (chuyển
          hóa cơ bản), nhân với hệ số vận động (TDEE). Sau đó, bạn có thể điều
          chỉnh theo mục tiêu:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Giảm cân:</strong> giảm từ 10–20% tổng calo so với TDEE.
            </li>
            <li>
              <strong>Tăng cân:</strong> tăng từ 10–15% tổng calo so với TDEE.
            </li>
            <li>
              <strong>Giữ cân:</strong> giữ mức calo bằng với TDEE.
            </li>
          </ul>
          Đây là phương pháp được áp dụng rộng rãi trong các chương trình huấn
          luyện cá nhân, dinh dưỡng thể hình và giảm cân khoa học.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Gợi ý chia tỷ lệ dinh dưỡng theo mục tiêu:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Ngoài tổng calo, việc phân chia tỷ lệ các nhóm chất dinh dưỡng cũng
          rất quan trọng:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Protein:</strong> 15–30%
            </li>
            <li>
              <strong>Carbohydrate:</strong> 40–55%
            </li>
            <li>
              <strong>Fat:</strong> 20–30%
            </li>
          </ul>
          Tùy thuộc vào mục tiêu (giảm mỡ, tăng cơ hay duy trì), tỷ lệ này có
          thể điều chỉnh để tối ưu hiệu quả.
        </div>
      </div>
    </main>
  );
}

export default CaloriesIntakeContent;
