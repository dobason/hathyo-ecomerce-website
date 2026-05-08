import React from "react";

function LeanBodyMassContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH KHỐI LƯỢNG CƠ THỂ KHÔNG MỠ (LEAN BODY MASS - LBM)
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Lean Body Mass (LBM) là khối lượng cơ thể không bao gồm mỡ – tức là toàn
        bộ phần cơ, xương, nước, các cơ quan nội tạng và mô liên kết. Đây là chỉ
        số quan trọng để đánh giá thành phần cơ thể và hiệu quả của chế độ dinh
        dưỡng – luyện tập. Việc nắm được LBM giúp bạn xác định chính xác nhu cầu
        dinh dưỡng và mục tiêu thể hình phù hợp.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Lean Body Mass dùng để làm gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          LBM giúp bạn phân biệt được khối lượng cơ thể lành mạnh so với phần mỡ
          tích trữ. Việc theo dõi chỉ số này:
          <ul className="list-disc ml-5 mt-3">
            <li>
              Hỗ trợ thiết lập chế độ ăn và luyện tập tối ưu hóa tăng cơ – giảm
              mỡ.
            </li>
            <li>
              Giúp điều chỉnh calo hợp lý hơn so với chỉ dựa trên trọng lượng
              tổng thể.
            </li>
            <li>
              Phản ánh sự thay đổi thực sự về thành phần cơ thể khi giảm cân
              hoặc tập luyện.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các yếu tố ảnh hưởng đến LBM:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          LBM chịu ảnh hưởng bởi nhiều yếu tố như:
          <ul className="list-disc ml-5 mt-3">
            <li>Giới tính (nam thường có tỷ lệ cơ cao hơn nữ)</li>
            <li>Tuổi (giảm dần theo độ tuổi do mất cơ tự nhiên)</li>
            <li>Chế độ tập luyện và dinh dưỡng</li>
            <li>Cơ địa và tỷ lệ trao đổi chất</li>
          </ul>
          Việc duy trì hoặc tăng LBM là một trong những yếu tố then chốt của sức
          khỏe chuyển hóa và vóc dáng bền vững.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính LBM:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Một số công thức ước tính LBM phổ biến dựa trên giới tính, cân nặng và
          chiều cao. Ví dụ:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>Nam:</strong> LBM = (0.407 × cân nặng kg) + (0.267 × chiều
              cao cm) – 19.2
            </li>
            <li>
              <strong>Nữ:</strong> LBM = (0.252 × cân nặng kg) + (0.473 × chiều
              cao cm) – 48.3
            </li>
          </ul>
          Ngoài ra, các thiết bị đo thành phần cơ thể (như InBody, DXA...) có
          thể đưa ra con số chính xác hơn dựa trên phân tích sinh học.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Lưu ý khi sử dụng chỉ số LBM:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              LBM không thể hiện rõ sự phân bố cơ bắp – chỉ là ước tính tổng
              thể.
            </li>
            <li>
              Khi giảm cân, mục tiêu nên là giảm mỡ nhưng giữ hoặc tăng LBM.
            </li>
            <li>
              Kết hợp theo dõi LBM cùng với tỷ lệ mỡ cơ thể (Body Fat %) sẽ mang
              lại bức tranh toàn diện hơn.
            </li>
          </ul>
          Việc hiểu rõ LBM sẽ giúp bạn đi đúng hướng trong hành trình thay đổi
          vóc dáng, duy trì sức khỏe và tối ưu hiệu suất thể chất.
        </div>
      </div>
    </main>
  );
}

export default LeanBodyMassContent;
