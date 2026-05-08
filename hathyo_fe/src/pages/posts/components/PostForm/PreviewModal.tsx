import { Button, Card, Modal } from 'antd';
import React from 'react';

type Props = {
  onToggle?: () => void;
  visible?: boolean;
  content?: string;
};

export const PreviewModal: React.FC<Props> = ({ onToggle, visible, content }: Props) => {
  return (
    <Modal
      footer={[
        <Button onClick={onToggle} key="close">
          Đóng
        </Button>,
      ]}
      width={800}
      visible={visible}
      onCancel={onToggle}
    >
      <Card>
        <div className="ck ck-content" dangerouslySetInnerHTML={{ __html: content || '' }} />
      </Card>
    </Modal>
  );
};
