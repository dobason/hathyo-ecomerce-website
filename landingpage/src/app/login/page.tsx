"use client";

import LoginForm from "@/components/Header/AuthModal/Login"; // vẫn dùng lại component cũ nếu cần

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <LoginForm /> {/* Đây là nơi bạn nhét form nhập email/password */}
      </div>
    </div>
  );
}
