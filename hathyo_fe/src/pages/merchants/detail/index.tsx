import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Form, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import ActionBar from '@/components/ActionBar';

import { MERCHANT_STATUS } from '@/services/merchants/constants';
import MerchantForm from '../components/MerchantForm';
import { useDetail } from './hook';

const MerchantDetail: React.FC = () => {
  const { loading, form, merchantDetail, onFinish, changeStatus } = useDetail();
  const access = useAccess();
  const navigate = useNavigate();
  const avatar = merchantDetail?.logo;
  const merchantStatus = merchantDetail?.merchantStatus;
  const businessLicense = merchantDetail?.businessLicense;

  return (
    <PageContainer>
      <Spin spinning={Boolean(loading)}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <MerchantForm
            merchantStatus={merchantStatus}
            avatar={avatar}
            form={form}
            businessLicense={businessLicense}
          />
          <ActionBar
            onBack={() => navigate('/merchants')}
            rejectAction={
              access?.merchants_crud
                ? () => changeStatus({ status: MERCHANT_STATUS.REJECTED })
                : undefined
            }
            approveAction={
              access?.merchants_crud
                ? () => changeStatus({ status: MERCHANT_STATUS.APPROVED })
                : undefined
            }
            title=""
          />
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default MerchantDetail;
