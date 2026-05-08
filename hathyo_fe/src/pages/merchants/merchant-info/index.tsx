import { getCurrentStepCompleted } from '@/utils/func';
import { Button, Divider, Form, Spin } from 'antd';
import React from 'react';

import MerchantSteps from '@/components/MerchantSteps';
import MerchantTag from '@/components/MerchantTag';

import IdentityInfo from '../components/OnboardSteps/IdentityInfo';
import ShopInfo from '../components/OnboardSteps/ShopInfo';
import TaxInfo from '../components/OnboardSteps/TaxInfo';
import Completed from '../components/OnboardSteps/Completed';

import { useDetail } from '../detail/hook';

const MerchantInfo: React.FC = () => {
  const { loading, form, merchantDetail, onFinish, current, setCurrent } = useDetail();

  const logo = merchantDetail?.logo;
  const identityImageBack = merchantDetail?.identityImageBack;
  const identityImageFront = merchantDetail?.identityImageFront;
  const businessLicense = merchantDetail?.businessLicense;
  const merchantStatus = merchantDetail?.merchantStatus;

  const CurrentStep = () => {
    switch (current) {
      case 0:
        return <ShopInfo logo={logo} />;
      case 1:
        return <TaxInfo businessLicense={businessLicense} form={form} />;
      case 2:
        return (
          <IdentityInfo
            identityImageFront={identityImageFront}
            identityImageBack={identityImageBack}
          />
        );
      case 3:
        return <Completed />;
      default:
        return <ShopInfo logo={logo} />;
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      await onFinish(values);
      setCurrent(current + 1);
    } catch (err) {
      console.log('Validation failed:', err);
    }
  };

  return (
    <div className="bg-gray-50">
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish} className="relative pb-24">
          <div className="bg-white rounded-xl shadow-md p-4 max-w-screen-lg mx-auto">
            <MerchantSteps
              stepCompleted={getCurrentStepCompleted(merchantDetail)}
              setCurrent={setCurrent}
              current={current}
            />
            <Divider />
            <CurrentStep />
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200">
            <div className="max-w-screen-lg mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Trạng thái tài khoản: <MerchantTag status={merchantStatus} />
              </div>
              {current < 3 && (
                <Button size="large" type="primary" onClick={handleNext}>
                  {current === 2 ? 'Hoàn tất' : 'Kế tiếp'}
                </Button>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default MerchantInfo;
