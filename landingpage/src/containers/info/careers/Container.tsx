"use client";

import React, { useState } from "react";
import ArrowRightFull from "@/components/Icons/ArrowRightFull";

type Job = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  link: string;
};

const jobs: Job[] = [
  {
    id: "1",
    title: "Nhà Thiết Kế Sản Phẩm",
    description:
      "Chúng tôi đang tìm một nhà thiết kế sản phẩm trung cấp tham gia vào đội ngũ.",
    tags: ["Làm việc từ xa", "Toàn thời gian"],
    category: "Thiết kế",
    link: "https://www.linkedin.com/jobs/product-designer",
  },
  {
    id: "2",
    title: "Quản Lý Kỹ Thuật",
    description:
      "Chúng tôi cần một quản lý kỹ thuật giàu kinh nghiệm để dẫn dắt nhóm phát triển.",
    tags: ["Làm việc từ xa", "Toàn thời gian"],
    category: "Phát triển",
    link: "https://www.linkedin.com/jobs/engineering-manager",
  },
  {
    id: "3",
    title: "Chuyên Viên Hỗ Trợ Khách Hàng",
    description:
      "Tuyển dụng chuyên viên hỗ trợ khách hàng tận tâm và chuyên nghiệp.",
    tags: ["Làm việc từ xa", "Toàn thời gian"],
    category: "Chăm sóc khách hàng",
    link: "https://www.linkedin.com/jobs/customer-support",
  },
  {
    id: "4",
    title: "Chuyên Viên Marketing",
    description:
      "Gia nhập đội ngũ marketing năng động với các chiến dịch sáng tạo.",
    tags: ["Tại văn phòng", "Toàn thời gian"],
    category: "Marketing",
    link: "https://www.linkedin.com/jobs/marketing-specialist",
  },
  {
    id: "5",
    title: "Nhân Viên Vận Hành",
    description: "Tuyển nhân sự đảm nhiệm các hoạt động vận hành hàng ngày.",
    tags: ["Tại văn phòng", "Bán thời gian"],
    category: "Vận hành",
    link: "https://www.linkedin.com/jobs/operations",
  },
  {
    id: "6",
    title: "Kế Toán Tổng Hợp",
    description:
      "Chúng tôi đang cần tuyển một kế toán có kinh nghiệm xử lý sổ sách kế toán.",
    tags: ["Làm việc từ xa", "Toàn thời gian"],
    category: "Tài chính",
    link: "https://www.linkedin.com/jobs/accounting",
  },
];

const filters = [
  "Tất cả",
  "Phát triển",
  "Thiết kế",
  "Marketing",
  "Chăm sóc khách hàng",
  "Vận hành",
  "Tài chính",
];

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filteredJobs =
    activeFilter === "Tất cả"
      ? jobs
      : jobs.filter((job) => job.category === activeFilter);

  return (
    <main className="max-w-4xl container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-block border rounded-full px-4 py-1 text-sm font-medium mb-4">
          Chúng tôi đang tuyển dụng!
        </span>
        <h1 className="text-4xl font-bold mb-4">
          Cùng đồng hành trong sứ mệnh của chúng tôi
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi đang tìm kiếm những con người đam mê để cùng đồng hành. Văn
          hóa phẳng, giao tiếp rõ ràng và tinh thần trách nhiệm là giá trị cốt
          lõi tại đây.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm transition border
              ${
                activeFilter === filter
                  ? "bg-Moss/500 text-white border-Moss/500"
                  : "hover:bg-gray-100"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="border-t">
        {filteredJobs.map((job) => (
          <div key={job.id} className="border-t py-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border px-3 py-1 rounded-full text-sm text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-black flex items-center gap-1 mt-1 hover:underline whitespace-nowrap"
              >
                Ứng tuyển <ArrowRightFull className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
