"use client";
import React from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

function UserModal({
  children,
  onClose,
  visible,
}: {
  children: any;
  onClose: any;
  visible: boolean;
}) {
  const containerRef = useOutsideClick(onClose);

  if (!visible) return null;

  return (
    <div className="relative z-50 text-Grayiron/600">
      <div className="fixed inset-0 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div className="absolute top-24 right-10 w-[250px] transform overflow-hidden bg-white text-left shadow-2xl rounded-xl transition-all">
            <div className="bg-white py-6" ref={containerRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
