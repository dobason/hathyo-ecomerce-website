import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store";
import {
  sendPhoneVerificationOtp,
  changePhone,
  fetchUserInfo,
} from "@/store/userSlice";

interface ChangePhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPhone: string) => void;
}

const ChangePhoneModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ChangePhoneModalProps) => {
  const dispatch = useAppDispatch();
  const [newPhone, setNewPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!newPhone) {
      toast.error("Vui lòng nhập số điện thoại mới");
      return;
    }

    // Validate phone number format (Vietnamese phone number)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(newPhone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending OTP for phone:", newPhone);

      const result = await dispatch(
        sendPhoneVerificationOtp(newPhone)
      ).unwrap();
      console.log("Send OTP success:", result);
      setIsOtpSent(true);
      toast.success("Đã gửi mã OTP, vui lòng kiểm tra điện thoại của bạn");
    } catch (error: any) {
      console.error("Send OTP failed:", error);
      toast.error(error || "Lỗi gửi mã OTP. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Vui lòng nhập mã OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Mã OTP phải có 6 chữ số");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Verifying OTP:", { newPhone, otp });

      const result = await dispatch(
        changePhone({
          newPhone: newPhone,
          otp,
        })
      ).unwrap();

      console.log("Verify OTP success:", result);

      await dispatch(fetchUserInfo());

      onSuccess(newPhone);
      handleClose();
    } catch (error: any) {
      console.error("Verify OTP failed:", error);

      if (error.includes && error.includes("400")) {
        toast.error("Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.");
      } else if (error.includes && error.includes("401")) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else {
        toast.error(error || "OTP không hợp lệ hoặc đã hết hạn");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewPhone("");
    setOtp("");
    setIsOtpSent(false);
    setIsLoading(false);
    onClose();
  };

  const handleResendOtp = async () => {
    setOtp("");
    await handleSendOtp();
  };

  return (
    <Modal
      title="Thay đổi số điện thoại"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose={true}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại mới
          </label>
          <Input
            placeholder="Nhập số điện thoại mới (VD: 0987654321)"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            disabled={isOtpSent || isLoading}
            maxLength={11}
          />
        </div>

        {!isOtpSent ? (
          <Button
            type="primary"
            block
            onClick={handleSendOtp}
            loading={isLoading}
            disabled={!newPhone}
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
                placeholder="Nhập mã OTP (6 chữ số)"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="primary"
                onClick={handleVerify}
                loading={isLoading}
                disabled={!otp || otp.length !== 6}
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
              Mã OTP đã được gửi đến số {newPhone}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ChangePhoneModal;
