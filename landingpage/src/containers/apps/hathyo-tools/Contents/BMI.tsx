import React, { useState } from "react";
import Image from "next/image";

function BMIContent() {
  return (
    <main>
      <div className="my-5 text-center">
        <h5 className="heading-5 text-Moss/700">
          ĐO CHỈ SỐ CÂN NẶNG - CHIỀU CAO (BMI) ONLINE
        </h5>
      </div>
      <div className="my-10 body-sm-medium text-Grayiron/600 mt-3 text-justify">
        BMI không phải là một phép đo trực tiếp của lượng mỡ trong cơ thể, tuy
        nhiên, các nghiên cứu đã chỉ ra rằng BMI có mối liên hệ tương quan với
        việc đo trực tiếp lượng mỡ. Đây là một phương pháp tiết kiệm và dễ thực
        hiện để đánh giá tình trạng sức khỏe của cá nhân.
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 mb-10">
        <div className="col-span-1 m-auto">
          <Image
            className="object-cover"
            alt="main banner"
            src="/calculator-pana.png"
            width={1280}
            height={1280}
          />
        </div>
        <div className="xl:col-span-3 flex flex-col">
          <div className="body-semibold  text-Moss/600 mb-3">
            1. Ứng dụng của BMI:
          </div>
          <div className="body-sm-medium text-gray-600 text-justify">
            BMI được áp dụng như một công cụ đơn giản để xác định trọng lượng lý
            tưởng cho người trưởng thành. Tuy nhiên, nó không đủ để chẩn đoán
            các vấn đề về cân nặng. Ví dụ, một chỉ số BMI cao không nhất thiết
            là dấu hiệu của nguy cơ sức khỏe; để đánh giá rủi ro, các bác sĩ cần
            thêm thông tin như độ dày của nếp da, thói quen ăn uống, mức độ hoạt
            động thể chất, tiền sử bệnh tật trong gia đình và các phương pháp
            kiểm tra sức khỏe khác.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 mb-10">
        <div className="col-span-2 xl:col-span-3 m-auto">
          <div className="body-semibold  text-Moss/600 mb-3">
            2. Vai trò của CDC trong việc sử dụng BMI để đo lường thừa cân và
            béo phì:
          </div>
          <div className="body-sm-medium text-gray-600 text-justify">
            Cơ quan kiểm soát bệnh tật Hoa Kỳ - CDC sử dụng BMI làm tiêu chí
            chính để đánh giá thừa cân và béo phì trong dân số. Việc tính toán
            chỉ số BMI không chỉ đơn giản mà còn tiết kiệm, chỉ yêu cầu đo lường
            chiều cao và cân nặng. Sử dụng BMI cho phép so sánh tình trạng cân
            nặng của một cá nhân với dân số tổng thể. Công thức BMI được tính
            bằng Kilogram và mét (xem phần dưới đây để biết cách tính toán).
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Image
            className="object-cover"
            alt="main banner"
            src="/height-meter-pana.png"
            width={1280}
            height={1280}
          />
        </div>
      </div>
      <div className="mb-10 flex-flex-col">
        <div className="body-semibold  text-Moss/600 mb-5">
          3. Cách tính và đánh giá chỉ số BMI như thế nào?
        </div>
        <div className="w-full mb-5">
          <Image
            className="object-cover w-full h-auto"
            alt="main banner"
            src="/bmi-review.png"
            width={1280}
            height={1280}
          />
        </div>
        <div className="body-semibold  text-Moss/600 mb-3">
          Cách đánh giá chỉ số BMI
        </div>
        <div className="body-sm-medium text-gray-600 text-justify mb-3">
          Đối với người lớn từ 20 tuổi trở lên, Sử dụng bảng phân loại chuẩn cho
          cả nam và nữ để đánh giá chỉ số BMI.
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="body-sm-medium text-gray-600 text-justify">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                <strong>BMI &#60; 16</strong>: Gầy độ III
              </li>
              <li className="text-justify pb-3">
                <strong>6 ≤ BMI &#60;17</strong>: Gầy độ II
              </li>
              <li className="text-justify pb-3">
                <strong>17 ≤ BMI &#60;18.5</strong>: Gầy độ I
              </li>
              <li className="text-justify pb-3">
                <strong>18.5 ≤ BMI &#60;25</strong>: Bình thường
              </li>
            </ol>
          </div>
          <div className="body-sm-medium text-gray-600 text-justify">
            <ol className="list-disc ml-5">
              <li className="text-justify pb-3">
                <strong>25 ≤ BMI &#60;30</strong>: Thừa cân
              </li>
              <li className="text-justify pb-3">
                <strong>30 ≤ BMI 35</strong>: Béo phì độ I
              </li>
              <li className="text-justify pb-3">
                <strong>35 ≤ BMI &#60;40</strong>: Béo phì độ II
              </li>
              <li className="text-justify pb-3">
                <strong>BMI &#62;40</strong>: Béo phì độ III
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BMIContent;
