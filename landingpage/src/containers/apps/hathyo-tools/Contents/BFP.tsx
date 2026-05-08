import React from "react";

function BodyFatContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH TỶ LỆ MỠ CƠ THỂ (BODY FAT %) ONLINE
        </h5>
      </div>
      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Tỷ lệ mỡ cơ thể (Body Fat Percentage) là chỉ số thể hiện phần trăm trọng
        lượng cơ thể là mỡ. Đây là một công cụ quan trọng để đánh giá thành phần
        cơ thể, sức khỏe tổng thể và hiệu suất thể chất. Không giống như BMI,
        chỉ số này giúp xác định chính xác hơn mức độ tích trữ mỡ, từ đó hỗ trợ
        cá nhân điều chỉnh chế độ ăn uống và tập luyện hợp lý.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. Vai trò của tỷ lệ mỡ cơ thể:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc theo dõi tỷ lệ mỡ cơ thể giúp đánh giá sức khỏe tim mạch, nguy cơ
          mắc bệnh chuyển hóa, và tình trạng thể chất. Một người có trọng lượng
          bình thường nhưng tỷ lệ mỡ cao vẫn có thể gặp các vấn đề sức khỏe
          nghiêm trọng. Do đó, đây là chỉ số cần thiết trong các chương trình
          cải thiện vóc dáng và thể lực.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các yếu tố ảnh hưởng đến tỷ lệ mỡ cơ thể:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Tỷ lệ mỡ chịu ảnh hưởng bởi nhiều yếu tố, bao gồm:
          <ul className="list-disc ml-5 mt-3">
            <li>Tuổi tác: Người lớn tuổi có xu hướng tích mỡ nhiều hơn.</li>
            <li>Giới tính: Nữ thường có tỷ lệ mỡ cao hơn nam.</li>
            <li>Di truyền: Quyết định một phần cách cơ thể tích trữ mỡ.</li>
            <li>Chế độ ăn uống và mức độ vận động.</li>
            <li>Hormone và tình trạng sức khỏe tổng thể.</li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính tỷ lệ mỡ cơ thể:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify mb-3">
          Có nhiều phương pháp để ước tính tỷ lệ mỡ cơ thể, phổ biến nhất là
          công thức tính dựa vào các thông số cơ bản:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              <strong>Nam giới:</strong> Dựa trên chiều cao, cân nặng, độ tuổi
              và chu vi eo.
            </li>
            <li>
              <strong>Nữ giới:</strong> Dựa trên chiều cao, cân nặng, độ tuổi,
              chu vi eo và hông.
            </li>
          </ul>
          <div className="mt-3">
            Một số thiết bị hoặc phương pháp đo hiện đại như điện trở sinh học
            (BIA), DXA hay kẹp đo mỡ cũng được dùng để xác định tỷ lệ mỡ với độ
            chính xác cao hơn.
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Mức đánh giá tỷ lệ mỡ cơ thể:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              <strong>Nam:</strong> 6–24% (khuyến nghị: 10–20%)
            </li>
            <li>
              <strong>Nữ:</strong> 14–31% (khuyến nghị: 18–28%)
            </li>
          </ul>
          <div className="mt-3">
            Tỷ lệ quá thấp có thể gây mất cơ, rối loạn hormone; trong khi tỷ lệ
            quá cao làm tăng nguy cơ tim mạch, tiểu đường và các bệnh lý chuyển
            hóa.
          </div>
        </div>
      </div>
    </main>
  );
}

export default BodyFatContent;
