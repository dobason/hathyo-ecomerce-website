import { useState } from "react";
import {
  X,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Link,
} from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  author: string;
  imageUrl?: string | null;
}

const ShareModal = ({
  isOpen,
  onClose,
  quote,
  author,
  imageUrl = null,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `"${quote}" - ${author}`;
  const websiteUrl = window.location.origin;
  const currentPageUrl = window.location.href;
  // Sử dụng imageUrl (đường dẫn banner) nếu có, không thì dùng URL trang hiện tại
  const shareUrl = imageUrl || currentPageUrl;

  const handleCopyLink = async () => {
    try {
      const finalUrl = imageUrl || currentPageUrl;
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Không thể sao chép:", err);
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank", "width=600,height=400");
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, "_blank", "width=600,height=400");
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        const subject = "Câu trích dẫn hay từ Hathyo";
        const body = `${shareText}\n\nXem thêm tại: ${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      },
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Chia sẻ</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Quote Preview */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 italic">{quote}</p>
            <p className="text-xs text-gray-500 mt-1">- {author}</p>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`flex items-center gap-2 p-3 rounded-lg text-white transition ${option.color}`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              );
            })}
          </div>

          {/* Copy Link */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              {imageUrl
                ? "Sao chép liên kết hình ảnh"
                : "Hoặc sao chép liên kết"}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 truncate">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  copied
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span className="text-xs">Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="text-xs">Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
