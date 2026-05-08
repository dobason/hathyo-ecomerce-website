import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store";
import { sentOtpEmail, changeEmail } from "@/store/userSlice";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEmail: string) => void;
}

const ChangeEmailModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ChangeEmailModalProps) => {
  const dispatch = useAppDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [key, setKey] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!newEmail) {
      toast.error("Vui lòng nhập email mới");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Email không hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(sentOtpEmail(newEmail)).unwrap();
      setIsOtpSent(true);
      toast.success("Đã gửi mã OTP, vui lòng kiểm tra email của bạn");
    } catch (error: any) {
      toast.error(error || "Lỗi gửi mã OTP. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!key) {
      toast.error("Vui lòng nhập mã xác thực");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(changeEmail({ newEmail, key })).unwrap();
      onSuccess(newEmail);
      handleClose();
    } catch (error: any) {
      toast.error(
        typeof error === "string" ? error : "OTP không hợp lệ hoặc đã hết hạn"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewEmail("");
    setKey("");
    setIsOtpSent(false);
    setIsLoading(false);
    onClose();
  };

  const handleResendOtp = async () => {
    setKey("");
    await handleSendOtp();
  };

  return (
    <Modal
      title="Thay đổi email"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose={true}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email mới
          </label>
          <Input
            placeholder="Nhập email mới"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isOtpSent || isLoading}
          />
        </div>

        {!isOtpSent ? (
          <Button
            type="primary"
            block
            onClick={handleSendOtp}
            loading={isLoading}
            disabled={!newEmail}
          >
            Gửi mã xác thực
          </Button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã xác thực OTP
              </label>
              <Input
                placeholder="Nhập mã xác thực"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="primary"
                onClick={handleVerify}
                loading={isLoading}
                disabled={!key}
                className="flex-1"
              >
                Xác thực
              </Button>
              <Button
                onClick={handleResendOtp}
                loading={isLoading}
                disabled={isLoading}
              >
                Gửi lại
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Mã OTP đã được gửi đến email {newEmail}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
