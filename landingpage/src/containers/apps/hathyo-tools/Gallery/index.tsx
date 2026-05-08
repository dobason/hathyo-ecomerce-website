"use client";
import React from "react";
import ContractFooter from "@/components/ContractFooter";
import ToolCard from "./ToolCards";
import { map } from "lodash";
import { toolInputsConfig } from "../ToolInputsConfig";

const TOOL_LIST = [
  {
    key: "bfp_calculator",
    header: "Body Fat Percentage",
    content:
      "Là một công cụ được sử dụng để tính toán tỷ lệ phần trăm mỡ cơ thể của một người, thể hiện lượng mỡ chiếm bao nhiêu phần trăm trong tổng trọng lượng cơ thể. Đây là một chỉ số quan trọng giúp đánh giá sức khỏe, hiệu suất thể chất và thành phần cơ thể.",
  },
  {
    key: "bmi_calculator",
    header: "Body Mass Index",
    content:
      "Là một công cụ được sử dụng để đánh giá tình trạng cân nặng của một người so với chiều cao, nhằm xác định xem họ có đang ở mức cân nặng bình thường, thiếu cân, thừa cân hay béo phì. Đây là một phương pháp đơn giản, phổ biến và dễ sử dụng trong lĩnh vực sức khỏe cộng đồng.",
  },
  {
    key: "bmr_calculator",
    header: "Basal Metabolic Rate",
    content:
      "Là một công cụ dùng để tính toán lượng năng lượng (calo) mà cơ thể cần để duy trì các chức năng cơ bản của sự sống khi ở trạng thái nghỉ ngơi hoàn toàn. Đây là lượng calo tối thiểu cần thiết để hỗ trợ các hoạt động cơ bản như hô hấp, tuần hoàn, duy trì nhiệt độ cơ thể, và hoạt động của các cơ quan nội tạng.",
  },
  {
    key: "tdee_calculator",
    header: "Total Daily Energy Expenditure",
    content:
      "Là một công cụ được sử dụng để ước tính tổng lượng calo mà cơ thể cần tiêu thụ mỗi ngày để duy trì hoạt động. Đây là một công cụ hữu ích trong việc quản lý cân nặng, xây dựng chế độ dinh dưỡng, hoặc cải thiện hiệu suất thể thao.",
  },
  {
    key: "calories_calculator",
    header: "Calories Consumed Each Day",
    content:
      "Là một công cụ hữu ích để ước tính lượng calo mà một người cần nạp vào hàng ngày để đạt được các mục tiêu sức khỏe, bao gồm duy trì cân nặng, giảm cân, hoặc tăng cân. Công cụ này dựa trên thông tin cá nhân như tuổi, giới tính, cân nặng, chiều cao, và mức độ hoạt động để đưa ra khuyến nghị phù hợp",
  },
  {
    key: "calories_burn_calculator",
    header: "Calories Burn",
    content:
      "Là một công cụ được thiết kế để tính toán lượng calo mà cơ thể tiêu hao trong quá trình thực hiện các hoạt động thể chất hoặc vận động hàng ngày. Công cụ này giúp người dùng hiểu rõ mức độ tiêu hao năng lượng của mình, từ đó hỗ trợ xây dựng kế hoạch tập luyện và dinh dưỡng phù hợp.",
  },
  {
    key: "health_weight_calculator",
    header: "Health Weight",
    content:
      "Là một công cụ được thiết kế để giúp người dùng xác định phạm vi cân nặng khỏe mạnh dựa trên các yếu tố cá nhân như chiều cao, tuổi, giới tính và đôi khi là mức độ hoạt động. Công cụ này hỗ trợ người dùng đánh giá cân nặng hiện tại của mình có nằm trong phạm vi lành mạnh hay không, từ đó xây dựng mục tiêu và kế hoạch cải thiện sức khỏe một cách khoa học.",
  },
  {
    key: "ibw_calculator",
    header: "Ideal Body Weight",
    content:
      "Là một công cụ giúp xác định cân nặng lý tưởng của một người, dựa trên các yếu tố như chiều cao, giới tính và đôi khi độ tuổi. Đây là một chỉ số quan trọng được sử dụng trong các lĩnh vực sức khỏe và thể hình để đánh giá tình trạng cân nặng và hỗ trợ lập kế hoạch dinh dưỡng cũng như tập luyện.",
  },
  {
    key: "lbm_calculator",
    header: "Lean Body Mass",
    content:
      "Là một công cụ giúp tính toán khối lượng cơ thể không mỡ (Lean Body Mass - LBM), tức là phần khối lượng của cơ thể bao gồm cơ, xương, nước và các cơ quan nội tạng, không bao gồm mỡ cơ thể. Đây là một chỉ số quan trọng giúp đánh giá sức khỏe và thành phần cơ thể, hỗ trợ xây dựng kế hoạch tập luyện và dinh dưỡng hiệu quả.",
  },
  {
    key: "pace_calculator",
    header: "Pace",
    content:
      "Là một công cụ giúp người dùng tính toán tốc độ (pace) hoặc thời gian cần thiết để hoàn thành một quãng đường nhất định trong các hoạt động thể thao như chạy bộ, đi bộ, hoặc đạp xe. Công cụ này rất hữu ích cho các vận động viên, người tập luyện thể thao hoặc bất kỳ ai muốn lên kế hoạch và theo dõi tiến trình tập luyện của mình.",
  },
  {
    key: "rm_calculator",
    header: "Repetition Maximum",
    content:
      "Là một công cụ được thiết kế để tính toán Repetition Maximum (RM), tức là mức tạ tối đa mà một người có thể nâng được trong một lần duy nhất (1RM) hoặc mức tạ tối đa cho một số lần lặp lại cụ thể (nRM). Đây là một công cụ hữu ích trong lĩnh vực thể hình, huấn luyện sức mạnh, và các chương trình tập luyện cá nhân hóa.",
  },
];

type Props = {
  setToolSelected: React.Dispatch<
    React.SetStateAction<keyof typeof toolInputsConfig | null>
  >;
};

function ToolsGallery({ setToolSelected }: Props) {
  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h3 className="heading-3 text-Moss/700 text-center">
            Công cụ vui khỏe Hathyo
          </h3>

          <div className="text-Grayiron/600 space-y-4 text-justify text-base">
            <p>
              Chào mừng bạn đến với Công Cụ Vui Khỏe – người bạn đồng hành lý
              tưởng trong hành trình chăm sóc sức khỏe và nâng cao chất lượng
              cuộc sống! 🌟
            </p>
            <p>
              Tại <strong>Công Cụ Vui Khỏe Hathyo</strong>, chúng tôi mang đến
              cho bạn một bộ sưu tập các công cụ tính toán khoa học, tiện lợi và
              dễ sử dụng, được thiết kế để giúp bạn:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Theo dõi và cải thiện sức khỏe</strong>: Từ cân nặng lý
                tưởng, lượng calo tiêu thụ, đến lượng protein và nước uống hàng
                ngày.
              </li>
              <li>
                <strong>Tối ưu hóa việc tập luyện</strong>: Đo lường hiệu quả
                luyện tập với các công cụ như tính lượng calo đốt cháy và tốc độ
                chạy bộ.
              </li>
              <li>
                <strong>Kiểm soát chế độ dinh dưỡng</strong>: Xác định nhu cầu
                dinh dưỡng cá nhân để đạt mục tiêu tăng cơ, giảm cân, hoặc duy
                trì sức khỏe.
              </li>
            </ul>
            <p>
              Dù bạn là người mới bắt đầu chăm sóc sức khỏe hay đã là người yêu
              thích thể thao, Công Cụ Vui Khỏe luôn sẵn sàng hỗ trợ bạn từng
              bước trên hành trình vui mà khỏe của mình.
            </p>
            <p>
              Hãy khám phá ngay các công cụ hữu ích và bắt đầu tạo nên phiên bản
              tốt nhất của bạn hôm nay!
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-6">
            {map(TOOL_LIST, (item) => (
              <ToolCard
                key={item.key}
                header={item.header}
                keyMatch={item.key}
                content={item.content}
                setTool={setToolSelected}
              />
            ))}
          </div>

          <div className="w-full pt-10">
            <ContractFooter />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ToolsGallery;
