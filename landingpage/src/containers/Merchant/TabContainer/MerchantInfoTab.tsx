"use client";
import Clock from "@/components/Icons/Clock";
// import { Metadata } from "next";
import { MerchantResponse } from "@/types";
import dayjs from "dayjs";

type Props = {
  data: MerchantResponse;
};

const Item = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) => (
  <div className="flex flex-row p-3">
    <div className="w-[50%] max-w-[300px] flex flex-row items-center">
      <div className="mr-2">{icon}</div>
      <div className="text-xs text-Grayiron/500">{title}</div>
    </div>
    <div className="w-[50%] xl:max-w-[calc(100%-332px)] text-xs text-Grayiron/700 font-normal">
      {value}
    </div>
  </div>
);

export default function MerchantInfoTab({ data }: Props) {
  return (
    <div className="bg-white p-6 mt-8">
      {/* <div className="flex flex-row px-8">
        <div className="flex flex-col justify-center items-center mr-10">
          <div className="text-lg text-Grayiron/700">Tỉ lệ hủy</div>
          <div className="text-xl text-Moss/500">0%</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg text-Grayiron/700">Tỉ lệ đổi trả</div>
          <div className="text-xl text-Moss/500">0%</div>
        </div>
      </div> */}
      {/* <hr className="my-6" /> */}
      <div className="xl:ml-8">
        <Item
          title="Thành viên từ năm"
          value={dayjs(data?.createdAt).format("YYYY")}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
        <Item
          title="Sản phẩm"
          value={data?.numOfFollowers?.toString()}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
        <Item
          title="Mô tả cửa hàng"
          value={data?.description ?? data?.storeName}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
        <Item
          title="Đánh giá"
          value={data?.responseRate?.toString()}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
        <Item
          title="Người theo dõi"
          value={data?.numOfFollowers?.toString()}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
        <Item
          title="Phản hồi chat"
          value={`${data?.percentResponseChat ?? 0}%`}
          icon={<Clock className="w-[24px] h-[24px]" />}
        />
      </div>
    </div>
  );
}
