// Converted Next.js TypeScript version using react-qrcode-logo
"use client";

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import gsap from "gsap";
import Link from "next/link";

interface ContactFormData {
  name: string;
  userType: string;
  otherType?: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  userType: yup.string().required("Vui lòng chọn mục đích liên hệ"),
  otherType: yup.string().when("userType", {
    is: (value: string) => value === "Khác",
    then: (schema) => schema.required("Vui lòng nhập chi tiết mục đích"),
    otherwise: (schema) => schema.optional(),
  }),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  subject: yup.string().required("Vui lòng nhập tiêu đề"),
  message: yup.string().required("Vui lòng nhập nội dung"),
});

const ContactCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLFormElement>(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: yupResolver(schema) });

  const userType = watch("userType");

  useEffect(() => {
    const canvas = document.getElementById(
      "tech-grid"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10,112,63,0.5)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = "rgba(10,112,63,0.1)";
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (contactVisible && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [contactVisible]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setContactVisible(false);
      }
    }
    if (contactVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contactVisible]);

  const downloadCardAsPDF = async () => {
    const cardElement = document.getElementById("business-card");
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`hoang-minh-phung-hathyo-${dayjs().format("YYYYMMDDHHmm")}.pdf`);
  };

  // Export Functions
  async function downloadCardAsImage() {
    await document.fonts.ready;
    const cardElement = document.getElementById("business-card");
    if (!cardElement) return;
    html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `hoang-minh-phung-hathyo-${dayjs().format(
        "YYYYMMDDHHmm"
      )}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  const downloadVCard = () => {
    const vCardData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:Hoàng Minh Phụng
      TITLE:Founder & CEO | Wellness Architect
      TEL:+84908556220
      EMAIL:email@hathyo.com
      ADR:;;82 Phan Đăng Lưu, Phú Nhuận, HCM;Ho Chi Minh;;Vietnam
      URL:https://hathyo.vn
      ORG:HATHYO
      END:VCARD
    `.trim();

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hathyo-contact.vcf";
    link.click();
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, (data as any)[key]);
    }
    formData.append("action", "submitContactForm");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyetL0f1MIif2VbKw05PnT4c0d-ASsFEAoJOGS3sp467W-0ndoDkTszau_AXHqGtcrt/exec",
        {
          method: "POST",
          body: formData,
          headers: { Origin: window.location.origin },
        }
      );
      const result = await res.json();
      if (result.status === "success") {
        toast.success("🎉 Biểu mẫu đã được gửi thành công đến HATHYO!");
        reset();
        setContactVisible(false);
      } else {
        toast.error("❌ Gửi thất bại: " + result.message);
      }
    } catch (err) {
      toast.error("❌ Lỗi gửi dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen container mx-auto font-arial min-h-screen xl:min-h-[60vh] flex flex-col items-center justify-center flex flex-col xl:gap-8 gap-2">
      <div ref={cardRef} className="card business-card" id="business-card">
        <div className="left-section">
          <div className="logo">
            <a href="https://hathyo.com" target="_blank">
              <img src="/images/logo/vertical.png" alt="hathyo-vui-khoe" />
            </a>
          </div>

          <div className="profile-pic">
            <a href="https://hathyo.com/contacts/phung-hoang" target="_blank">
              <img
                src="/images/vcards/phung-hoang.png"
                alt="Phung Hoang"
                className="rounded-lg border-2 border-white shadow-md object-cover aspect-square w-[100px] profile-pic"
              />
            </a>
          </div>
        </div>
        <div className="right-section">
          {/* Right Section */}
          <canvas
            id="tech-grid"
            className="absolute top-0 left-0 w-full h-full z-0"
            width={300}
            height={300}
          />
          <div className="relative z-10">
            <div>
              <h2 className="uppercase">Hoàng Minh Phụng</h2>
              <p className="position font-bold">
                Founder & CEO | Wellness Architect
              </p>
              <p>
                <strong>
                  <i className="bi bi-geo-alt flex-shrink-0 text-orange-500 shrink-0"></i>
                </strong>
                &nbsp;
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/9fsyrQdAEaw3Uot97"
                >
                  82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM
                </a>
              </p>
              <p>
                <strong>
                  <i className="bi bi-phone flex-shrink-0 text-orange-500 shrink-0"></i>
                </strong>
                &nbsp;
                <a target="_blank" href="http://zalo.me/0908556220">
                  (+84) 0908 556 220
                </a>
              </p>
              <p>
                <strong>
                  <i className="bi bi-envelope flex-shrink-0 text-orange-500 shrink-0"></i>
                </strong>
                &nbsp;
                <Link href="mailto:email@hathyo.com">email@hathyo.com</Link>
              </p>
            </div>

            <div className="bottom-section">
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/company/hathyo"
                  target="_blank"
                >
                  <i className="bi bi-linkedin text-white"></i>
                  &nbsp;LinkedIn
                </a>
                <a href="https://facebook.com/hathyo" target="_blank">
                  <i className="bi bi-facebook text-white"></i>&nbsp; Facebook
                </a>
                <a
                  href="/images/vcards/phung-hoang-wechat.jpeg"
                  target="_blank"
                >
                  <i className="fab fa-weixin text-white"></i>&nbsp; WeChat
                </a>
              </div>
              <QRCodeCanvas
                value="https://hathyo.com/contacts/phung-hoang"
                size={100}
                bgColor="#ffffff"
                fgColor="#0a703f"
                level="M"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="export-buttons">
        <button onClick={downloadCardAsPDF}>
          <span>Xuất PDF</span>
        </button>
        <button onClick={downloadCardAsImage}>Xuất ảnh</button>
        <button onClick={downloadVCard}>Xuất vCard</button>
        <button onClick={() => setContactVisible(true)}>Nhắn tin</button>
      </div>

      {/* Modal */}
      {contactVisible && (
        <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50">
          <form
            ref={modalRef}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 md:p-6 rounded-lg w-full max-w-sm md:max-w-md shadow-xl flex flex-col gap-4 relative"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6 bar"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <input
                  {...register("name")}
                  placeholder="Họ và tên"
                  className="w-full border border-gray-300 rounded px-2 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <select
                  {...register("userType")}
                  className="w-full border border-gray-300 rounded px-2 py-2"
                >
                  <option value="">Chọn mục đích liên hệ</option>
                  <option value="Bán hàng">Bán hàng</option>
                  <option value="Mua hàng">Mua hàng</option>
                  <option value="Vận chuyển">Vận chuyển</option>
                  <option value="Thanh toán">Thanh toán</option>
                  <option value="Đổi trả">Đổi trả hàng</option>
                  <option value="Khiếu kiện">Khiếu kiện</option>
                  <option value="Thuế">Thuế</option>
                  <option value="Phí">Phí</option>
                  <option value="Phản ánh TCXH">Phản ánh của TCXH</option>
                  <option value="Hợp tác kinh doanh">Hợp tác kinh doanh</option>
                  <option value="Cộng tác nội dung">Cộng tác nội dung</option>
                  <option value="Sản phẩm, dịch vụ">Sản phẩm, dịch vụ</option>
                  <option value="Tư vấn sức khỏe">Tư vấn sức khỏe</option>
                  <option value="Cơ hội việc làm">Cơ hội việc làm</option>
                  <option value="Góp ý">Góp ý</option>
                  <option value="Other">Khác</option>
                </select>
                {errors.userType && (
                  <p className="text-red-500 text-sm">
                    {errors.userType.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {userType === "Khác" && (
                  <input
                    {...register("otherType")}
                    placeholder="Chi tiết mục đích"
                    className="w-full border border-gray-300 rounded px-2 py-2"
                  />
                )}
                {errors.otherType && (
                  <p className="text-red-500 text-sm">
                    {errors.otherType.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("phone")}
                  placeholder="Số điện thoại"
                  className="w-full border border-gray-300 rounded px-2 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-2 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("subject")}
                  placeholder="Tiêu đề"
                  className="w-full border border-gray-300 rounded px-2 py-2"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <textarea
                  {...register("message")}
                  placeholder="Nội dung"
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  rows={4}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={() => setContactVisible(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              >
                {loading ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
