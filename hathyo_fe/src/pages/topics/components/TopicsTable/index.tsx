import { usePermissionTopic } from '@/services/topics/permission';
import { topicTransformsTree } from '@/utils/func';
import { Card, Col, Row, Spin, Tree } from 'antd';
import React from 'react';
import { useTopicsTable } from './hooks';

const TopicsTable: React.FC = () => {
  const { loading, data, onChangeTitle, onDelete } = useTopicsTable();

  const { permissionCrudTopic } = usePermissionTopic();

  return (
    <div className="relative">
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card className="shadow-sm rounded-xl">
              <div className="overflow-x-auto">
                <Tree
                  showLine
                  autoExpandParent
                  treeData={topicTransformsTree(
                    data?.topics as API.Topic[],
                    0,
                    onChangeTitle,
                    onDelete,
                    permissionCrudTopic,
                  )}
                  className="bg-white rounded-lg"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default TopicsTable;
