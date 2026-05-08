"use client";
import React, { useState, useEffect } from "react";

// TypeScript interfaces
interface FormData {
  contact: string;
  reason: string;
  otherReason: string;
  confirm: boolean;
}

interface ReasonOption {
  value: string;
  vi: string;
  en: string;
}

type Language = "vi" | "en";

const AccountDeletionForm: React.FC = () => {
  // State management
  const [currentLanguage, setCurrentLanguage] = useState<Language>("vi");
  const [formData, setFormData] = useState<FormData>({
    contact: "",
    reason: "",
    otherReason: "",
    confirm: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reason options
  const reasons: ReasonOption[] = [
    {
      value: "privacy_concerns",
      vi: "Quan ngại về quyền riêng tư",
      en: "Privacy concerns",
    },
    { value: "not_using", vi: "Không sử dụng nữa", en: "No longer using" },
    {
      value: "poor_experience",
      vi: "Trải nghiệm không tốt",
      en: "Poor experience",
    },
    {
      value: "found_alternative",
      vi: "Tìm được giải pháp thay thế",
      en: "Found alternative",
    },
    { value: "other", vi: "Lý do khác", en: "Other reason" },
  ];

  // Language content
  const content = {
    vi: {
      title: "Yêu cầu xóa tài khoản",
      subtitle:
        "Chúng tôi rất tiếc khi bạn muốn rời khỏi HATHYO. Vui lòng điền thông tin bên dưới để gửi yêu cầu xóa tài khoản.",
      contactLabel: "Email hoặc Số điện thoại *",
      contactPlaceholder: "Nhập email hoặc số điện thoại của bạn",
      reasonLabel: "Lý do xóa tài khoản *",
      reasonPlaceholder: "Chọn lý do",
      otherReasonLabel: "Vui lòng mô tả chi tiết",
      otherReasonPlaceholder: "Mô tả lý do cụ thể...",
      confirmText:
        "Tôi hiểu rằng việc xóa tài khoản sẽ không thể hoàn tác và tất cả dữ liệu sẽ bị mất vĩnh viễn.",
      submitBtn: "Gửi yêu cầu",
      cancelBtn: "Hủy",
      infoTitle: "Thông tin quan trọng",
      info1: "Yêu cầu sẽ được xử lý trong vòng 7-14 ngày làm việc",
      info2: "Tất cả dữ liệu cá nhân sẽ bị xóa vĩnh viễn",
      info3: "Bạn sẽ nhận được email xác nhận khi hoàn tất",
      loadingText: "Đang gửi yêu cầu...",
      successTitle: "Yêu cầu đã được gửi thành công!",
      successMessage:
        "Chúng tôi sẽ xử lý yêu cầu của bạn trong vòng 7-14 ngày làm việc và gửi email xác nhận.",
      closeBtn: "Đóng",
      footer:
        "© 2025 HATHYO - Cùng Bạn Vui Khỏe Hơn Với Sản Phẩm Chất Lượng & Dịch Vụ Chuyên Nghiệp",
    },
    en: {
      title: "Account Deletion Request",
      subtitle:
        "We're sorry to see you go. Please fill out the information below to submit your account deletion request.",
      contactLabel: "Email or Phone Number *",
      contactPlaceholder: "Enter your email or phone number",
      reasonLabel: "Reason for Account Deletion *",
      reasonPlaceholder: "Select a reason",
      otherReasonLabel: "Please describe in detail",
      otherReasonPlaceholder: "Describe your specific reason...",
      confirmText:
        "I understand that account deletion is irreversible and all data will be permanently lost.",
      submitBtn: "Submit Request",
      cancelBtn: "Cancel",
      infoTitle: "Important Information",
      info1: "Request will be processed within 7-14 business days",
      info2: "All personal data will be permanently deleted",
      info3: "You will receive a confirmation email when completed",
      loadingText: "Sending request...",
      successTitle: "Request sent successfully!",
      successMessage:
        "We will process your request within 7-14 business days and send a confirmation email.",
      closeBtn: "Close",
      footer:
        "© 2025 HATHYO - Together for Better Health with Quality Products & Professional Services",
    },
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateContact = (contact: string): boolean => {
    return validateEmail(contact) || validatePhone(contact);
  };

  // Event handlers
  const handleLanguageSwitch = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { [key: string]: string } = {};

    if (!formData.contact) {
      newErrors.contact =
        currentLanguage === "vi"
          ? "Vui lòng nhập email hoặc số điện thoại"
          : "Please enter email or phone number";
    } else if (!validateContact(formData.contact)) {
      newErrors.contact =
        currentLanguage === "vi"
          ? "Vui lòng nhập email hoặc số điện thoại hợp lệ"
          : "Please enter a valid email or phone number";
    }

    if (!formData.reason) {
      newErrors.reason =
        currentLanguage === "vi"
          ? "Vui lòng chọn lý do"
          : "Please select a reason";
    }

    if (formData.reason === "other" && !formData.otherReason.trim()) {
      newErrors.otherReason =
        currentLanguage === "vi"
          ? "Vui lòng mô tả lý do cụ thể"
          : "Please describe your specific reason";
    }

    if (!formData.confirm) {
      newErrors.confirm =
        currentLanguage === "vi"
          ? "Vui lòng xác nhận hiểu rõ về việc xóa tài khoản"
          : "Please confirm you understand the account deletion";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setIsLoading(true);

    try {
      // Create form data for Google Apps Script
      const submitData = new FormData();
      submitData.append("action", "submitDeleteRequest");
      submitData.append("contact", formData.contact);
      submitData.append("reason", formData.reason);
      submitData.append("language", currentLanguage);
      submitData.append("otherReason", formData.otherReason);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwR6smJeK26EZvu-HXzOlVsF0xLJ8B0y96TnFShTicOrdz_9kyX9LlUQ2yxls_pt5ToOA/exec",
        {
          method: "POST",
          body: submitData,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          contact: "",
          reason: "",
          otherReason: "",
          confirm: false,
        });
      } else {
        alert(
          data.message ||
            (currentLanguage === "vi"
              ? "Có lỗi xảy ra khi gửi yêu cầu"
              : "Error occurred while sending request")
        );
      }
    } catch (error) {
      alert(
        currentLanguage === "vi"
          ? "Lỗi kết nối. Vui lòng thử lại sau."
          : "Connection error. Please try again later."
      );
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const t = content[currentLanguage];

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter'] text-gray-800">
      {/* Container */}
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/images/HathyoV1_Rectangle_Name_Slogan.png"
                alt="HATHYO Logo"
                className="w-18 h-14"
              />
            </div>

            {/* Language Switcher */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageSwitch("vi")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentLanguage === "vi"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => handleLanguageSwitch("en")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentLanguage === "en"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600 leading-relaxed">{t.subtitle}</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Contact Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.contactLabel}
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder={t.contactPlaceholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.reasonLabel}
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white ${
                  errors.reason ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">{t.reasonPlaceholder}</option>
                {reasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason[currentLanguage]}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
              )}
            </div>

            {/* Other Reason Field */}
            {formData.reason === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.otherReasonLabel}
                </label>
                <textarea
                  name="otherReason"
                  value={formData.otherReason}
                  onChange={handleInputChange}
                  placeholder={t.otherReasonPlaceholder}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none ${
                    errors.otherReason ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.otherReason && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.otherReason}
                  </p>
                )}
              </div>
            )}

            {/* Confirmation Checkbox */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="confirm"
                  checked={formData.confirm}
                  onChange={handleInputChange}
                  className={`mt-1 w-5 h-5 rounded border-2 text-green-600 focus:ring-green-500 ${
                    errors.confirm ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {t.confirmText}
                </span>
              </label>
              {errors.confirm && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{t.loadingText}</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{t.cancelBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">
                {t.infoTitle}
              </h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• {t.info1}</li>
                <li>• {t.info2}</li>
                <li>• {t.info3}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-6 text-sm text-gray-500">
          <p>{t.footer}</p>
          <p className="mt-2">
            <a
              href="https://hathyo.com"
              className="text-green-600 hover:text-green-700"
            >
              hathyo.com
            </a>
            {" | "}
            <a
              href="mailto:email@hathyo.com"
              className="text-green-600 hover:text-green-700"
            >
              email@hathyo.com
            </a>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {t.successTitle}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.successMessage}
            </p>
            <button
              onClick={closeModal}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg p-6 text-center">
            <svg
              className="animate-spin w-8 h-8 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-700">{t.loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDeletionForm;
