import React from "react";

function RepetitionMaxContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          TÍNH TOÁN MỨC TẠ TỐI ĐA (REPETITION MAXIMUM - RM)
        </h5>
      </div>

      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        Repetition Maximum (RM) là mức trọng lượng tối đa mà bạn có thể nâng
        được cho một số lần lặp lại cụ thể trong một bài tập nhất định. Trong
        đó, <strong>1RM</strong> (One Repetition Maximum) là mức tạ nặng nhất
        bạn có thể thực hiện được **chính xác một lần** duy nhất. Đây là chỉ số
        quan trọng trong lĩnh vực thể hình, huấn luyện sức mạnh và xây dựng
        chương trình tập luyện cá nhân hóa.
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          1. RM được dùng để làm gì?
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Việc tính toán RM giúp bạn:
          <ul className="list-disc ml-5 mt-3">
            <li>
              Xác định cường độ tập luyện phù hợp với mục tiêu (sức mạnh, tăng
              cơ, sức bền).
            </li>
            <li>Thiết lập mức tạ luyện tập tối ưu theo % của 1RM.</li>
            <li>Đánh giá tiến độ và hiệu quả của quá trình tập luyện.</li>
            <li>Giảm nguy cơ chấn thương do chọn sai mức tạ.</li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          2. Các chỉ số RM phổ biến:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          <ul className="list-disc ml-5">
            <li>
              <strong>1RM:</strong> Mức tạ tối đa nâng được một lần duy nhất.
            </li>
            <li>
              <strong>nRM:</strong> Mức tạ tối đa cho một số lần lặp lại cụ thể
              (ví dụ: 5RM, 10RM...)
            </li>
          </ul>
          Trong thực tế, người tập thường không thử trực tiếp 1RM mà dùng công
          thức ước tính từ số lần lặp lại ở mức tạ thấp hơn.
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          3. Cách tính 1RM:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Có nhiều công thức khác nhau để ước tính 1RM, trong đó công thức phổ
          biến nhất là **Epley**:
          <div className="mt-3">
            <code>1RM = Trọng lượng × (1 + (Số lần lặp lại ÷ 30))</code>
          </div>
          Ví dụ: Nếu bạn nâng được 60kg trong 10 lần, thì ước tính 1RM = 60 × (1
          + 10/30) = 80kg
          <div className="mt-3">
            Các công thức khác như Brzycki, Lombardi, Lander… cũng được sử dụng
            tùy theo mục đích và độ chính xác mong muốn.
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="body-semibold text-Moss/600 mb-3">
          4. Ứng dụng của 1RM trong lập kế hoạch tập luyện:
        </div>
        <div className="body-sm-medium text-gray-600 text-justify">
          Sau khi biết 1RM, bạn có thể xác định mức tạ nên dùng theo phần trăm
          mục tiêu:
          <ul className="list-disc ml-5 mt-3">
            <li>
              <strong>50–60% 1RM:</strong> Tăng sức bền cơ bắp.
            </li>
            <li>
              <strong>65–75% 1RM:</strong> Tăng kích thước cơ (hypertrophy).
            </li>
            <li>
              <strong>80–90% 1RM:</strong> Phát triển sức mạnh.
            </li>
            <li>
              <strong>95–100% 1RM:</strong> Tối đa hóa hiệu suất thi đấu hoặc
              kiểm tra sức mạnh cá nhân.
            </li>
          </ul>
          Việc sử dụng đúng mức tạ giúp bạn đạt kết quả nhanh hơn và an toàn hơn
          trong hành trình tập luyện.
        </div>
      </div>
    </main>
  );
}

export default RepetitionMaxContent;
