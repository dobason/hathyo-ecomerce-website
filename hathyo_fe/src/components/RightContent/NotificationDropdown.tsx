import { BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown, List, Avatar, Modal, Button } from 'antd';
import React, { useState } from 'react';

interface NoticeItem {
  id: string;
  title: string;
  description: string;
  datetime: string;
  avatar?: string;
  content: string;
  read?: boolean;
}

const initialNotices: NoticeItem[] = [
  {
    id: '1',
    title: 'Chào mừng bạn đến với hệ thống',
    description: 'Cảm ơn bạn đã tham gia!',
    datetime: 'Vừa xong',
    avatar: '/img/icon.png',
    content:
      'Chào mừng bạn đến với nền tảng của chúng tôi. Chúc bạn có trải nghiệm tuyệt vời!',
    read: false,
  },
  {
    id: '2',
    title: 'Xin chào buổi sáng!',
    description: 'Chúc bạn một ngày làm việc hiệu quả.',
    datetime: '30 phút trước',
    content:
      'Chúc bạn có một ngày mới tràn đầy năng lượng và thành công trong công việc.',
    read: false,
  },
  {
    id: '3',
    title: 'Cập nhật tính năng mới',
    description: 'Khám phá các tính năng hấp dẫn vừa được bổ sung.',
    datetime: '1 giờ trước',
    content:
      'Chúng tôi vừa cập nhật một số tính năng mới giúp bạn quản lý dễ dàng hơn. Vào xem ngay!',
    read: true,
  },
  {
    id: '4',
    title: 'Thông báo nhẹ nhàng',
    description: 'Đừng quên nghỉ ngơi và thư giãn một chút nhé.',
    datetime: '2 giờ trước',
    content:
      'Bạn đã làm việc rất chăm chỉ. Hãy dành chút thời gian nghỉ ngơi nhé!',
    read: false,
  },
];

export const NoticeIcon: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const unreadCount = initialNotices.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleItemClick = (item: NoticeItem) => {
    setSelectedNotice(item);
    setModalVisible(true);
    setVisible(false); // đóng dropdown khi mở modal
    setNotices((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
  };

  const dropdownContent = (
    <div className="w-80 max-h-[400px] overflow-y-auto bg-white shadow-lg rounded p-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-base">Thông báo</span>
        <Button size="small" type="link" onClick={handleMarkAllRead}>
          Đánh dấu tất cả đã xem
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={initialNotices}
        locale={{ emptyText: 'Không có thông báo nào.' }}
        renderItem={(item) => (
          <List.Item
            className={`hover:bg-gray-100 rounded px-2 cursor-pointer ${
              item.read ? 'opacity-70' : 'bg-gray-50'
            }`}
            onClick={() => handleItemClick(item)}
          >
            <List.Item.Meta
              avatar={
                item.avatar ? (
                  <Avatar src={item.avatar} />
                ) : (
                  <Avatar icon={<BellOutlined />} />
                )
              }
              title={
                <div className="flex items-center gap-1 font-medium text-sm">
                  {!item.read && <Badge status="processing" />}
                  {item.title}
                </div>
              }
              description={
                <div className="text-xs text-gray-500">
                  {item.description}
                  <div className="text-[10px] text-gray-400">{item.datetime}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <>
      <Dropdown
        overlay={dropdownContent}
        trigger={['click']}
        placement="bottomRight"
        open={visible}
        onOpenChange={setVisible}
      >
        <div className="cursor-pointer h-full flex items-center justify-center">
          <Badge count={unreadCount} size="small">
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
        </div>
      </Dropdown>

      <Modal
        open={modalVisible}
        title={selectedNotice?.title}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <p>{selectedNotice?.content}</p>
      </Modal>
    </>
  );
};
