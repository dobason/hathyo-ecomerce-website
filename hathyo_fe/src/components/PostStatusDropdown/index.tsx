import { MAPPING_POST_STATUS_WITH_ACTION, POST_STATUS } from '@/services/posts/constants';
import { DownOutlined, RestOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { Button, Dropdown, MenuProps, Modal, Space, Typography } from 'antd';
import { filter } from 'lodash';
import React from 'react';

type Props = {
  handleDelete: (a: string) => any;
  handlePatchStatus: (a: any) => any;
  post?: API.Post;
  children?: React.ReactNode;
};
const ConfirmText = ({ keyContent }: { keyContent: string }) => (
  <Typography.Text>
    Bạn có chắc chắn{' '}
    <Typography.Text strong type="danger">
      {keyContent}
    </Typography.Text>{' '}
    bài viết này?
  </Typography.Text>
);

const PostStatusDropdown: React.FC<Props> = ({
  handleDelete,
  handlePatchStatus,
  post,
  children,
}: Props) => {
  const { staff, admin } = useAccess();

  const isAdmin = staff || admin;

  if (!post) return null;

  const handleMenuClick = (e: any) => {
    switch (e?.key) {
      case 'delete':
        Modal.confirm({
          content: <ConfirmText keyContent="xóa" />,
          onOk: () => {
            handleDelete(post?.id);
          },
        });

        break;
      case POST_STATUS.PENDING:
        Modal.confirm({
          content: <ConfirmText keyContent="gửi duyệt" />,
          onOk: () => {
            handlePatchStatus({ id: post.id, status: POST_STATUS.PENDING });
          },
        });
        break;
      case POST_STATUS.APPROVED:
        Modal.confirm({
          content: <ConfirmText keyContent="DUYỆT" />,
          onOk: () => {
            handlePatchStatus({ id: post.id, status: POST_STATUS.APPROVED });
          },
        });
        break;
      case POST_STATUS.REJECTED:
        Modal.confirm({
          content: <ConfirmText keyContent="TỪ CHỐI" />,
          onOk: () => {
            handlePatchStatus({ id: post.id, status: POST_STATUS.REJECTED });
          },
        });
        break;
      case POST_STATUS.PUBLIC:
        Modal.confirm({
          content: <ConfirmText keyContent="PUBLIC" />,
          onOk: () => {
            handlePatchStatus({ id: post.id, status: POST_STATUS.PUBLIC });
          },
        });
        break;
      default:
        break;
    }
  };

  const menuProps = {
    items: [
      ...filter(
        MAPPING_POST_STATUS_WITH_ACTION[post.visibility],
        (item) => (item?.isAdmin && isAdmin) || !item?.isAdmin,
      ),
      {
        label: 'Xóa bài viết',
        key: 'delete',
        icon: <RestOutlined />,
        danger: true,
      },
    ] as MenuProps['items'],
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      {children ?? (
        <Button type="link" style={{ width: 150 }} size="large">
          <Space>
            Tác vụ
            <DownOutlined />
          </Space>
        </Button>
      )}
    </Dropdown>
  );
};

export default PostStatusDropdown;
