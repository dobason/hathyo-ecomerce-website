import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@umijs/max';
import { Col, Image, Row, Table, Tag, Typography } from 'antd';
import { findIndex, map } from 'lodash';
import moment from 'moment';
import React from 'react';

type Props = {
  loading: boolean;
  data: API.Post[];
  onUpdateOrder?: (a: any) => any;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const column = [
  {
    key: 'sort',
  },
  {
    title: 'Thông tin',
    key: 'thumbnail',
    render: (record: API.Post) => (
      <Link to={`/posts/${record?.id}`}>
        <Row wrap={false} gutter={[16, 16]} justify="start" align="middle">
          <Col>
            <Link to={`/posts/${record?.id}`}>
              <Image
                preview={false}
                width={100}
                src={record?.thumbnail}
                fallback="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
              />
            </Link>
          </Col>
          <Col>
            <Row gutter={[8, 4]}>
              <Col span={24}>
                <Typography.Text strong style={{ maxWidth: '100%' }} ellipsis={{ suffix: '' }}>
                  {record?.title}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text strong>Trạng thái: </Typography.Text>
                <Tag color="success">{record?.visibility}</Tag>
              </Col>
            </Row>
          </Col>
        </Row>
      </Link>
    ),
  },

  {
    title: 'Topic',
    key: 'author',
    width: 200,
    render: (record: API.Post) => (
      <Row>
        <Col span={24}>
          <Typography.Text strong>Topics: </Typography.Text>
          <Typography.Text>{record?.topic?.name}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text strong>Tags: </Typography.Text>
          {map(record?.tags, (tag) => (
            <Tag key={tag?.id}>{tag?.name}</Tag>
          ))}
        </Col>
      </Row>
    ),
  },
  {
    title: 'Người tạo',
    key: 'author',
    width: 200,
    render: (record: { author: string; createdAt: string }) => (
      <Row>
        <Col span={24}>
          <b>Người tạo:</b> {record?.author}
        </Col>
        <Col span={24}>
          <b>Ngày tạo:</b> {moment(record?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
        </Col>
      </Row>
    ),
  },
];

const TableRow = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const PostInSeries: React.FC<Props> = ({ loading, data, onUpdateOrder }: Props) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id && onUpdateOrder) {
      const newData = arrayMove(
        data,
        findIndex(data, { id: active.id as string }),
        findIndex(data, { id: over?.id as string }),
      );
      const mapping = map(newData, (item, index) => ({
        postId: item?.id,
        postOrder: index + 1,
      }));
      onUpdateOrder(mapping);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={data?.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          bordered
          components={{
            body: {
              row: TableRow,
            },
          }}
          size='small'
          scroll={{ x: 1200 }}
          rowKey="id"
          loading={loading}
          columns={column}
          dataSource={data}
        />
      </SortableContext>
    </DndContext>
  );
};

export default PostInSeries;
