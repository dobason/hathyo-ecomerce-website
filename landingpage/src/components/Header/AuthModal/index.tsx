"use client";
// import Button from "@/components/Button";
import Modal from "../../Modal";
import React, { memo, useState } from "react";
import { AUTH_STEP, STEP_TITLE } from "@/constants/auth";
import { get } from "lodash";
import ArrowLeftRounded from "@/components/Icons/ArrowLeftRounded";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import Close from "@/components/Icons/Close";
import EmailActiveCode from "./EmailActiveCode";
import CreatePassword from "./CreatePassword";
import ResetPassword from "./ResetPassword";
import { useAuth } from "@/context/authContext";

type props = {
  setVisible?: any;
  visible: boolean;
};

function AuthModal({ setVisible, visible }: props) {
  const [currentStep, setCurrentStep] = useState(AUTH_STEP.LOGIN);
  const [currentData, setCurrentData] = useState({});
  const { isLoginPopupOpen, toggleLoginPopup } = useAuth();

  const getStepTitle = get(STEP_TITLE, currentStep);

  const onClose = () => {
    setVisible(false);
    toggleLoginPopup();
    setCurrentStep(AUTH_STEP.LOGIN);
    setCurrentData({});
  };

  const getHeader = () => {
    switch (currentStep) {
      case AUTH_STEP.LOGIN:
        return (
          <div className="mb-3 body-semibold  text-Grayiron/600">
            Chào mừng bạn đến với{" "}
            <span className="text-Warning/500">Hathyo</span>
          </div>
        );
      case AUTH_STEP.FORGOT_PASSWORD:
      case AUTH_STEP.REGISTER:
        return (
          <div
            onClick={() => setCurrentStep(AUTH_STEP.LOGIN)}
            className="mb-3 cursor-pointer"
          >
            <ArrowLeftRounded />
          </div>
        );

      default:
        return null;
    }
  };

  const getContent = () => {
    switch (currentStep) {
      case AUTH_STEP.LOGIN:
        return <Login setCurrentStep={setCurrentStep} onClose={onClose} />;
      case AUTH_STEP.FORGOT_PASSWORD:
        return (
          <ForgotPassword
            setCurrentData={setCurrentData}
            setCurrentStep={setCurrentStep}
          />
        );
      case AUTH_STEP.RESET_PASSWORD:
        return (
          <ResetPassword
            currentData={currentData}
            setCurrentData={setCurrentData}
            setCurrentStep={setCurrentStep}
          />
        );
      case AUTH_STEP.REGISTER:
        return (
          <Register
            setCurrentData={setCurrentData}
            setCurrentStep={setCurrentStep}
          />
        );
      case AUTH_STEP.EMAIL_ACTIVE_CODE:
        return (
          <EmailActiveCode
            currentData={currentData}
            setCurrentData={setCurrentData}
            setCurrentStep={setCurrentStep}
          />
        );
      case AUTH_STEP.CREATE_PASSWORD:
        return (
          <CreatePassword
            currentData={currentData}
            setCurrentData={setCurrentData}
            setCurrentStep={setCurrentStep}
          />
        );

      default:
        return null;
    }
  };

  const isModalAuth = [AUTH_STEP.LOGIN, AUTH_STEP.REGISTER];

  return (
    <>
      <Modal
        onClose={() => onClose()}
        header={getHeader()}
        visible={isLoginPopupOpen}
        title={getStepTitle}
        footer={null}
        isAuth={isModalAuth.includes(currentStep)}
      >
        <div
          onClick={() => onClose()}
          className=" absolute xl:top-4 xl:right-4 top-1 right-1 cursor-pointer"
        >
          <Close />
        </div>
        {getContent()}
      </Modal>
    </>
  );
}

export default memo(AuthModal);
