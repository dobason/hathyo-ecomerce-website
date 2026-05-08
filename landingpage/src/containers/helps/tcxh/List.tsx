"use client";

import { useEffect, useState } from "react";
import { getListFeedback } from "@/services/client/feedback";
import Pagination from "@/components/Pagination";

type FeedbackStatus = "PENDING" | "IN_PROCESS" | "COMPLETED";

type FeedbackItem = {
  id: number;
  name: string;
  feedbackOrigin: "INDIVIDUAL" | "ORGANIZATION";
  email: string;
  phone: string;
  feedbackTitle: string;
  feedbackContent: string;
  status: FeedbackStatus;
};

export default function FeedbackTable() {
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState({} as any);

  const fetchFeedback = async ({ page = 0 }: any) => {
    try {
      const response = await getListFeedback({
        body: { page, size: 10 },
      });
      setData(response as any);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedback({ page: curPage });
  }, [curPage]);

  const renderStatus = (status: FeedbackStatus) => {
    const baseClass =
      "inline-block px-3 py-1 text-xs font-bold rounded-full uppercase";
    switch (status) {
      case "PENDING":
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            CHỜ XỬ LÝ
          </span>
        );
      case "IN_PROCESS":
        return (
          <span className={`${baseClass} bg-blue-100 text-blue-800`}>
            ĐANG XỬ LÝ
          </span>
        );
      case "COMPLETED":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            ĐÃ HOÀN TẤT
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 xl:gap-8 justify-center items-center container mx-auto xl:py-8 py-4">
      <div className="flex justify-center text-center">
        <h3 className="heading-3 text-Moss/700">
          Tiếp nhận phản ánh của Tổ chức xã hội
        </h3>
      </div>
      <div className="mx-auto p-4 w-full">
        <div className="overflow-x-auto ">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Loại</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">SĐT</th>
                <th className="p-2 border">Tiêu đề</th>
                <th className="p-2 border">Nội dung</th>
                <th className="p-2 border">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data?.feedbacks?.map((fb: FeedbackItem) => (
                <tr key={fb.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{fb.name}</td>
                  <td className="p-2 border">
                    {fb.feedbackOrigin === "INDIVIDUAL"
                      ? "Tiếp nhận phản ánh của TCXH"
                      : "Tổ chức"}
                  </td>
                  <td className="p-2 border">{fb.email}</td>
                  <td className="p-2 border">{fb.phone}</td>
                  <td className="p-2 border">{fb.feedbackTitle}</td>
                  <td className="p-2 border line-clamp-3">
                    {fb.feedbackContent}
                  </td>
                  <td className="p-2 border text-center">
                    {renderStatus(fb.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-end">
          <Pagination
            totalPages={data?.totalPages}
            currentPage={data?.currentPage}
            setCurPage={setCurPage}
          />
        </div>
      </div>
    </div>
  );
}
