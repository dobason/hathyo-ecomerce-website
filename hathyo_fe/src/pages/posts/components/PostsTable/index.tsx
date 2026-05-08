"use client";

import PostStatusDropdown from '@/components/PostStatusDropdown';
import { POST_STATUS, POST_STATUS_TAG } from '@/services/posts/constants';
import { useTableUrlParams } from '@/utils/func';
import { EllipsisOutlined } from '@ant-design/icons';
import { Link, history, useAccess } from '@umijs/max';
import {
  Button,
  Card,
  Image,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { map } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Search from './Search';
import { usePostsTable } from './hooks';

interface MobilePostCardProps {
  record: API.Post;
  handleDelete: (id: string) => void;
  handlePatchStatus: (id: string) => void;
  showAddHome: (post: API.Post) => void;
  isAddToHome?: boolean;
}

const MobilePostCard: React.FC<MobilePostCardProps> = ({
  record,
  handleDelete,
  handlePatchStatus,
  showAddHome,
  isAddToHome,
}) => (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
    <div className="flex justify-between items-start gap-3">
      <div className="flex gap-3 w-full">
        <Image
          preview={false}
          width={64}
          height={64}
          className="rounded-md object-cover"
          src={record?.thumbnail}
          fallback="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
        />
        <div className="flex-1">
          <Typography.Paragraph
            strong
            ellipsis={{ rows: 2 }}
            className="mb-1 text-base font-semibold"
          >
            {record?.title}
          </Typography.Paragraph>
          <div className="flex flex-wrap gap-1 text-xs text-orange-500">
            {map(record?.tags, (tag) => (
              <span key={tag?.id}>#{tag?.name}</span>
            ))}
          </div>
          <div className="text-xs mt-1">
            <Tag color="orange">{record?.topic?.name}</Tag>
            <div>{POST_STATUS_TAG[record?.visibility]}</div>
            <div>{moment(record?.createdAt).format('DD-MM-YYYY HH:mm')}</div>
          </div>
        </div>
      </div>
      <PostStatusDropdown
        handleDelete={handleDelete}
        handlePatchStatus={handlePatchStatus}
        post={record}
      >
        <Button icon={<EllipsisOutlined />} type="text" size="small" />
      </PostStatusDropdown>
    </div>
    {isAddToHome && record?.visibility === POST_STATUS.PUBLIC && (
      <div className="flex justify-end mt-3">
        <Switch checked={record?.onHomepage} onChange={() => showAddHome(record)} />
      </div>
    )}
  </div>
);

interface ColumnProps {
  handleDelete: (id: string) => void;
  handlePatchStatus: (id: string) => void;
  showAddHome: (post: API.Post) => void;
  isAddToHome?: boolean;
}

const buildColumns = ({ handleDelete, handlePatchStatus, showAddHome, isAddToHome }: ColumnProps) => [
  {
    title: 'Thông tin',
    key: 'thumbnail',
    width: 400,
    render: (record: API.Post) => (
      <Link to={`/posts-management/posts/${record?.id}`} className="flex gap-4 items-center">
        <Image
          preview={false}
          width={64}
          height={64}
          className="rounded object-cover"
          src={record?.thumbnail}
          fallback="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
        />
        <div>
          <Typography.Paragraph
            strong
            style={{ marginBottom: 4 }}
            ellipsis={{ rows: 2 }}
          >
            {record?.title}
          </Typography.Paragraph>
          <div className="flex flex-wrap gap-2 text-orange-500 text-xs">
            {map(record?.tags, (tag) => (
              <span key={tag?.id}>#{tag?.name}</span>
            ))}
          </div>
        </div>
      </Link>
    ),
  },
  {
    title: 'Trạng thái',
    key: 'status',
    align: 'center' as const,
    render: (record: API.Post) => POST_STATUS_TAG[record?.visibility],
  },
  {
    title: 'Danh mục',
    key: 'topic',
    align: 'center' as const,
    render: (record: API.Post) => <Tag color="orange">{record?.topic?.name}</Tag>,
  },
  {
    title: 'Tác giả',
    key: 'author',
    render: (record: API.Post) => record?.author,
  },
  {
    title: 'Ghim trang chủ',
    key: 'homepage',
    align: 'center' as const,
    render: (record: API.Post) =>
      isAddToHome && record?.visibility === POST_STATUS.PUBLIC && (
        <Switch
          checked={record?.onHomepage}
          onChange={() => showAddHome(record)}
          title="Hiển thị ở trang home"
        />
      ),
  },
  {
    title: 'Ngày đăng',
    key: 'createdAt',
    render: (record: API.Post) => moment(record?.createdAt).format('DD-MM-YYYY HH:mm:ss'),
  },
  {
    title: 'Tác vụ',
    key: 'action',
    fixed: 'right' as const,
    align: 'center' as const,
    render: (record: API.Post) => (
      <PostStatusDropdown
        handleDelete={handleDelete}
        handlePatchStatus={handlePatchStatus}
        post={record}
      />
    ),
  },
];

const PostsTable: React.FC = () => {
  const params = useTableUrlParams();
  const { loading, data, run, handleDelete, handlePatchStatus, showAddHome } = usePostsTable();
  const { staff, admin } = useAccess();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <Search run={run} />
      </Card>

      <Card className="shadow-sm">
        {isMobile ? (
          <div>
            {data?.posts?.map((post) => (
              <MobilePostCard
                key={post.id}
                record={post}
                handleDelete={handleDelete}
                handlePatchStatus={handlePatchStatus}
                showAddHome={showAddHome}
                isAddToHome={staff || admin}
              />
            ))}
          </div>
        ) : (
          <Table
            size="small"
            loading={loading}
            bordered
            columns={buildColumns({
              handleDelete,
              handlePatchStatus,
              showAddHome,
              isAddToHome: staff || admin,
            })}
            pagination={{
              onChange: (page, pageSize) => {
                history.push({ pathname: `/posts-management/posts?page=${page}&size=${pageSize}` });
                run();
              },
              pageSize: params?.size || 10,
              total: data?.totalElements,
            }}
            dataSource={data?.posts || []}
            rowKey="id"
            scroll={{ x: 1200, y: `calc(-358px + 100vh)` }}
          />
        )}
      </Card>
    </div>
  );
};

export default PostsTable;
