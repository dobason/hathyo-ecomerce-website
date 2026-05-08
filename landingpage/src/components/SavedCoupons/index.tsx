"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getCoupons, removeCouponCollect } from "@/services/client/coupon";
import { FiInfo, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

interface Coupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  condition: string;
  image: string;
  description: string;
}

const PAGE_SIZE = 8;

const SavedCoupons = () => {
  return null;
  // const searchParams = useSearchParams();
  // const merchantId = searchParams.get("merchantId");

  // const [coupons, setCoupons] = useState<Coupon[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  // const [hoveredCouponId, setHoveredCouponId] = useState<string | null>(null);

  // const totalPages = Math.ceil(coupons.length / PAGE_SIZE);
  // const currentCoupons = coupons.slice(
  //   (currentPage - 1) * PAGE_SIZE,
  //   currentPage * PAGE_SIZE
  // );

  // useEffect(() => {
  //   fetchCoupons();
  // }, [merchantId]);

  // const fetchCoupons = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getCoupons({
  //       params: { page: 0, size: 100, type: "HATHYO" },
  //     });

  //     const mapped =
  //       res?.coupons?.map((item: any) => ({
  //         id: item.id,
  //         code: item.code,
  //         title: item.title,
  //         discount: item.discount,
  //         condition: item.condition,
  //         image: item.image,
  //         description: item.description,
  //       })) || [];
  //     setCoupons(mapped);
  //   } catch (error) {
  //     console.error("Failed to fetch saved coupons:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const confirmDelete = async (coupon: Coupon) => {
  //   if (window.confirm("Bạn có chắc muốn xóa mã giảm giá này?")) {
  //     try {
  //       await removeCouponCollect({
  //         params: {
  //           couponId: coupon.id,
  //           code: coupon.code,
  //         },
  //       });
  //       setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
  //       toast.success("Đã xóa mã giảm giá.");
  //     } catch (err) {
  //       toast.error("Xóa mã thất bại.");
  //       console.error(err);
  //     }
  //   }
  //};

  // return (
  //   <div className="rounded-lg bg-white shadow-md max-w-6xl mx-auto py-8 px-4">
  //     <h2 className="text-center text-2xl font-bold mb-6">Coupon của bạn</h2>

  //     {loading ? (
  //       <p className="text-center text-gray-500">Đang tải...</p>
  //     ) : coupons.length === 0 ? (
  //       <div className="flex flex-col items-center justify-center gap-12">
  //         <Image
  //           src={"/empty.svg"}
  //           alt="promo"
  //           height={128}
  //           width={128}
  //           className="mx-auto"
  //         />
  //         <div className="text-md text-gray-600 font-semibold">
  //           Không có coupon đã lưu
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
  //         {currentCoupons.map((coupon) => (
  //           <div
  //             key={coupon.id}
  //             className="relative flex bg-white shadow rounded-lg border border-gray-200"
  //             onMouseEnter={() => setHoveredCouponId(coupon.id)}
  //             onMouseLeave={() => setHoveredCouponId(null)}
  //           >
  //             <div className="bg-orange-500 text-white text-xs font-bold flex flex-col items-center justify-center px-2 w-12 relative">
  //               <div>GIẢM</div>
  //               <div>{coupon.discount}</div>
  //               <div className="absolute top-0 left-0 w-full h-2 rounded-b-full bg-white"></div>
  //               <div className="absolute bottom-0 left-0 w-full h-2 rounded-t-full bg-white"></div>
  //             </div>
  //             <div className="flex-1 p-4">
  //               <div className="flex justify-between items-start">
  //                 <div>
  //                   <h3 className="font-semibold text-sm text-gray-800">
  //                     {coupon.title}
  //                   </h3>
  //                   <p className="text-xs text-gray-500 mt-1">
  //                     {coupon.condition}
  //                   </p>
  //                 </div>
  //                 <div className="flex gap-2">
  //                   <div className="relative">
  //                     <FiInfo className="w-4 h-4 text-gray-400 cursor-pointer" />
  //                     {hoveredCouponId === coupon.id && (
  //                       <div className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 bg-white border rounded shadow p-2 text-xs text-gray-700 w-52">
  //                         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t rotate-45 border-gray-200"></div>
  //                         {coupon.description || "Không có mô tả"}
  //                       </div>
  //                     )}
  //                   </div>
  //                   <button
  //                     className="text-red-500 hover:text-red-700"
  //                     onClick={() => confirmDelete(coupon)}
  //                   >
  //                     <FiTrash2 className="w-4 h-4" />
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {totalPages > 1 && (
  //       <div className="flex justify-center items-center gap-2 mt-6">
  //         <button
  //           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
  //           disabled={currentPage === 1}
  //           className="px-3 py-1 border rounded disabled:opacity-40"
  //         >
  //           Trước
  //         </button>
  //         <span>
  //           {currentPage} / {totalPages}
  //         </span>
  //         <button
  //           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
  //           disabled={currentPage === totalPages}
  //           className="px-3 py-1 border rounded disabled:opacity-40"
  //         >
  //           Sau
  //         </button>
  //       </div>
  //     )}

  //     {selectedCoupon && (
  //       <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  //         <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
  //           <button
  //             className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
  //             onClick={() => setSelectedCoupon(null)}
  //           >
  //             ×
  //           </button>
  //           <h3 className="text-lg font-bold mb-2">{selectedCoupon.title}</h3>
  //           <Image
  //             src={selectedCoupon.image}
  //             alt={selectedCoupon.code}
  //             width={200}
  //             height={200}
  //             className="mx-auto rounded"
  //           />
  //           <p className="mt-4 text-gray-700">{selectedCoupon.description}</p>
  //           <p className="mt-2 text-sm text-gray-500">
  //             Điều kiện: {selectedCoupon.condition}
  //           </p>
  //           <div className="mt-4 text-sm text-gray-600">
  //             Mã: <span className="font-semibold">{selectedCoupon.code}</span>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default SavedCoupons;
