import { MAPPING_PRODUCT_STATUS_WITH_ACTION, PRODUCT_STATUS } from '@/services/products/constants';
import { RestOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Button, Dropdown, Form, Input, MenuProps, Modal, Radio, Typography } from 'antd';
import { filter } from 'lodash';
import React, { useState } from 'react';

type Props = {
  handleDelete: (a: string | number) => any;
  handlePatchStatus: (a: any) => any;
  product?: API.Product;
  id?: any;
};

const ConfirmText = ({ keyContent }: { keyContent: string; children?: React.ReactNode }) => (
  <Typography.Text>
    Bạn có chắc chắn{' '}
    <Typography.Text strong type="danger">
      {keyContent}
    </Typography.Text>
    sản phẩm này?
  </Typography.Text>
);

const ProductStatusDropdown: React.FC<Props> = ({
  handleDelete,
  handlePatchStatus,
  product,
  id,
}: Props) => {
  const { staff, admin } = useAccess();
  const isAdmin = staff || admin;
  const [form] = Form.useForm();
  const rejectionReason = Form.useWatch('rejectionReason', form);
  const [visible, setVisible] = useState(false);

  if (!product) return null;

  const handleMenuClick = (e: any) => {
    switch (e?.key) {
      case 'delete':
        Modal.confirm({
          content: <ConfirmText keyContent="xóa" />,
          onOk: () => {
            if (product && product.id) {
              handleDelete(product?.id);
            }
          },
        });
        break;
      case PRODUCT_STATUS.DRAFT:
      case PRODUCT_STATUS.PENDING:
        Modal.confirm({
          content: <ConfirmText keyContent="gửi duyệt" />,
          onOk: () => {
            handlePatchStatus({ id: product.id, status: PRODUCT_STATUS.PENDING });
          },
        });
        break;
      case PRODUCT_STATUS.APPROVED:
        Modal.confirm({
          content: (
            <ConfirmText keyContent={e.key === PRODUCT_STATUS.APPROVED ? 'DUYỆT' : 'gửi duyệt'} />
          ),
          onOk: () => {
            handlePatchStatus({ id: product.id, status: e.key });
          },
        });
        break;
      case PRODUCT_STATUS.REJECTED:
        setVisible(true);
        break;
    }
  };

  const handleRejectionSubmit = async (values: any) => {
    try {
      console.log("values", values)
      handlePatchStatus({
        id: product.id,
        status: 'REJECTED',
        rejectionReason:
          values.rejectionReason === 'other' ? values.customReason : values.rejectionReason,
      });
      setVisible(false);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const menuProps = {
    items: [
      ...filter(
        MAPPING_PRODUCT_STATUS_WITH_ACTION[product?.status || ''],
        (item) => (item?.isAdmin && isAdmin) || !item?.isAdmin,
      ),
      {
        label: 'Xóa sản phẩm',
        key: 'delete',
        icon: <RestOutlined />,
        danger: true,
      },
    ] as MenuProps['items'],
    onClick: handleMenuClick,
  };

  return (
    <>
      <Dropdown.Button menu={menuProps} href={`/products/${id}`}>
        Xem chi tiết
      </Dropdown.Button>
      <Modal
        title="Từ chối sản phẩm"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleRejectionSubmit}>
          <Form.Item
            name="rejectionReason"
            label="Lý do từ chối:"
            rules={[{ required: true, message: 'Vui lòng chọn lý do!' }]}
          >
            <Radio.Group>
              <Radio value="Giá không phù hợp">Giá không phù hợp</Radio>
              <Radio value="Thông tin không chính xác">Thông tin không chính xác</Radio>
              <Radio value="Vi phạm tiêu chuẩn cộng đồng">Vi phạm tiêu chuẩn cộng đồng</Radio>
              <Radio value="other">Khác</Radio>
            </Radio.Group>
          </Form.Item>
          {rejectionReason === 'other' && (
            <Form.Item
              name="customReason"
              label="Nhập lý do khác:"
              rules={[{ required: true, message: 'Nhập lý do của bạn!' }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              htmlType="submit"
              key="submit"
              type="primary"
              danger
              onClick={handleRejectionSubmit}
            >
              Từ chối
            </Button>
            <Button key="back" onClick={() => setVisible(false)} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductStatusDropdown;
