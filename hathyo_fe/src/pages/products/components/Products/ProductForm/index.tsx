import { UploadImage } from '@/components/UploadImage';
import SingleUpload from '@/components/UploadImage/SingleUpload';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Collapse,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import React, { Fragment, memo, useEffect } from 'react';

import Editor from '@/components/Editor';
import { SelectCategory } from '@/components/SelectCategory';
import UploadList from '@/components/UploadList';
import { useUpload } from './hook';

type Props = {
  mainImageUrl?: string;
};

interface DetailFormProps {
  form: FormInstance;
}

const DetailInfo: React.FC<React.PropsWithChildren<DetailFormProps>> = ({ form }) => {
  const attributesWatch = Form.useWatch('attributes', form) ?? ([] as API.Attribute[]);
  const variantsWatch = Form.useWatch('variants', form) ?? ([] as API.Variant[]);

  // Function to generate variants (combinations of attributes)
  const generateVariants = (attrs: API.Attribute[]) => {
    if (!attrs || attrs.length === 0) {
      form.setFieldValue('variants', []);
      return;
    }

    const cartesianProduct = (arrays: string[][]): string[][] => {
      if (arrays.length === 0) return [[]];
      return arrays.reduce((acc, array) => acc.flatMap((a) => array.map((b) => [...a, b])), [
        [],
      ] as string[][]);
    };
    const valuesArray = attrs.map((attr) => attr.attributeValues.map((value) => value?.value));
    const combinations = cartesianProduct(valuesArray);
    const generatedVariants = combinations.map((combination, index) => {
      return {
        mainAttributeName: attributesWatch?.[0]?.['name'] || null,
        mainAttributeValue: combination?.[0] || null,
        secondAttributeName: attributesWatch?.[1]?.['name'] || null,
        secondAttributeValue: combination?.[1] || null,
        price: variantsWatch?.[index]?.price || 0,
        anchoPrice: variantsWatch?.[index]?.anchoPrice || 0,
        imageUrl: variantsWatch?.[index]?.imageUrl || '',
        mainAttributeId: variantsWatch?.[index]?.mainAttributeId ?? null,
        mainAttributeValueId: variantsWatch?.[index]?.mainAttributeValueId ?? null,
        secondAttributeId: variantsWatch?.[index]?.secondAttributeId ?? null,
        secondAttributeValueId: variantsWatch?.[index]?.secondAttributeValueId ?? null,
      };
    });
    form.setFieldValue('variants', generatedVariants);
  };

  // Update the variants whenever attributes change
  useEffect(() => {
    generateVariants(attributesWatch);
  }, [attributesWatch, generateVariants]);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        {(!attributesWatch || attributesWatch?.length <= 0) && (
          <Fragment>
            <Col span={24}>
              <Form.Item
                name="anchoPrice"
                label="Giá gốc"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'Nhập giá gốc',
                  },
                ]}
              >
                <InputNumber<number>
                  placeholder="Giá gốc"
                  style={{ width: 150 }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="price"
                label="Giá bán"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'Nhập Giá bán',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error('Nhập giá bán'));
                      }
                      const anchoPrice = getFieldValue('anchoPrice');
                      if (value > anchoPrice) {
                        return Promise.reject(new Error('Giá bán không được lớn hơn giá gốc'));
                      }
                      if (value < anchoPrice * 0.5) {
                        return Promise.reject(new Error('Giá bán không được giảm quá 50% giá gốc'));
                      }
                      return Promise.resolve();
                    }
                  })
                ]}
              >
                <InputNumber<number>
                  placeholder="Giá bán"
                  style={{ width: 150 }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                />
              </Form.Item>
            </Col>
          </Fragment>
        )}
      </Col>

      <Col span={24}>
        <Form.Item noStyle hidden name="variants" />
        <Form.List name="attributes">
          {(fields, { add, remove }) => (
            <Row gutter={[24, 24]}>
              {!attributesWatch ||
                (attributesWatch?.length < 2 && (
                  <Col span={24}>
                    <Form.Item label="Phân loại">
                      <Button
                        type="dashed"
                        onClick={() => add({ id: null, name: '', attributeValues: [] })}
                        icon={<PlusOutlined />}
                      >
                        Thêm nhóm phân loại
                      </Button>
                    </Form.Item>
                  </Col>
                ))}

              <Col span={24}>
                {attributesWatch && attributesWatch?.length > 0 && (
                  <Fragment>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Card
                        key={key}
                        size="small"
                        title={`Phân loại ${index + 1}`}
                        extra={<MinusCircleOutlined onClick={() => remove(name)} />}
                      >
                        <Form.Item name={[name, 'id']} noStyle hidden />
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Tên phân loại"
                          rules={[{ required: true, message: 'Nhập tên phân loại' }]}
                        >
                          <Input
                            placeholder="Tên phân loại"
                            onChange={(e) => {
                              const updatedAttributes = [...attributesWatch];
                              if (!updatedAttributes[index]) {
                                updatedAttributes[index] = {
                                  name: e.target.value,
                                  attributeValues: [],
                                };
                              } else {
                                updatedAttributes[index].name = e.target.value;
                              }
                              form.setFieldValue('attributes', updatedAttributes);
                            }}
                          />
                        </Form.Item>
                        <Form.List name={[name, 'attributeValues']}>
                          {(valueFields, { add: addValue, remove: removeValue }) => (
                            <Fragment>
                              <Flex wrap={'wrap'} gap="small">
                                {valueFields.map(({ key: valueKey, name: valueName }) => (
                                  <Space key={valueKey} align="baseline">
                                    <Form.Item name={[valueName, 'id']} noStyle hidden />
                                    <Form.Item
                                      {...restField}
                                      name={[valueName, 'value']}
                                      rules={[{ required: true, message: 'Nhập giá trị' }]}
                                    >
                                      <Input
                                        placeholder="Giá trị"
                                        onChange={(e) => {
                                          const updatedAttributes = [...attributesWatch];
                                          if (!updatedAttributes[index]) {
                                            updatedAttributes[index] = {
                                              id: index,
                                              name: '',
                                              attributeValues: [],
                                            };
                                          }
                                          if (!updatedAttributes[index].attributeValues) {
                                            updatedAttributes[index].attributeValues = [];
                                          }
                                          updatedAttributes[index].attributeValues[
                                            valueName as number
                                          ] = {
                                            id: null,
                                            value: e.target.value,
                                          };
                                          form.setFieldValue('attributes', updatedAttributes);
                                        }}
                                      />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                      color="red"
                                      onClick={() => {
                                        const updatedAttributes = [...attributesWatch];
                                        updatedAttributes[index].attributeValues.splice(
                                          valueName as number,
                                          1,
                                        );
                                        form.setFieldValue('attributes', updatedAttributes);
                                        removeValue(valueName);
                                      }}
                                    />
                                  </Space>
                                ))}
                                <Button
                                  type="dashed"
                                  onClick={() => addValue({ value: '', id: null })}
                                  icon={<PlusOutlined />}
                                >
                                  Thêm tùy chọn
                                </Button>
                              </Flex>
                            </Fragment>
                          )}
                        </Form.List>
                      </Card>
                    ))}
                    {variantsWatch && variantsWatch.length > 0 && (
                      <Col span={24}>
                        <Typography.Title level={5}>Danh sách phân loại</Typography.Title>
                        <Table dataSource={variantsWatch} pagination={false} rowKey="key">
                          <Table.Column
                            title={attributesWatch?.[0]?.['name']}
                            dataIndex="mainAttributeValue"
                            key="mainAttributeValue"
                          />
                          <Table.Column
                            title={attributesWatch?.[1]?.['name']}
                            dataIndex="secondAttributeValue"
                            key="secondAttributeValue"
                          />
                          <Table.Column
                            title="Giá bán"
                            dataIndex="price"
                            key="price"
                            render={(text, record: API.Variant, index) => {
                              return (
                                <InputNumber<number>
                                  placeholder="Giá bán"
                                  style={{ width: 150 }}
                                  formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                  }
                                  parser={(value) =>
                                    value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                                  }
                                  value={record.price}
                                  onChange={(value) => {
                                    const updatedVariants = [...variantsWatch];
                                    updatedVariants[index].price = value || 0;
                                    form.setFieldValue('variants', updatedVariants);
                                  }}
                                />
                              );
                            }}
                          />
                          <Table.Column
                            title="Giá gốc"
                            dataIndex="anchoPrice"
                            key="anchoPrice"
                            render={(text, record: API.Variant, index) => {
                              return (
                                <InputNumber<number>
                                  placeholder="Giá gốc"
                                  style={{ width: 150 }}
                                  formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                  }
                                  parser={(value) =>
                                    value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                                  }
                                  value={record.anchoPrice}
                                  onChange={(value) => {
                                    const updatedVariants = [...variantsWatch];
                                    updatedVariants[index].anchoPrice = value || 0;
                                    form.setFieldValue('variants', updatedVariants);
                                  }}
                                />
                              );
                            }}
                          />
                          <Table.Column
                            title="Ảnh"
                            dataIndex="imageUrl"
                            key="imageUrl"
                            render={(text, record: API.Variant, index) => (
                              <SingleUpload
                                value={record.imageUrl}
                                onChange={(url) => {
                                  const updatedVariants = [...variantsWatch];
                                  updatedVariants[index].imageUrl = url;
                                  form.setFieldValue('variants', updatedVariants);
                                }}
                              />
                            )}
                          />
                        </Table>
                      </Col>
                    )}
                  </Fragment>
                )}
              </Col>
            </Row>
          )}
        </Form.List>
      </Col>
    </Row>
  );
};

const CommonInfo: React.FC<Props> = ({ mainImageUrl }: Props) => (
  <Row gutter={[24, 24]}>
    <Col xs={24} md={8}>
      <UploadImage formName="mainImageUrl" thumbnail={mainImageUrl || ''} />
    </Col>
    <Col xs={24} md={16}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            required={false}
            rules={[
              {
                required: true,
                message: 'Nhập tên sản phẩm',
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="brandName"
            label="Thương hiệu"
            required={false}
            rules={[
              {
                required: true,
                message: 'Nhập tên thương hiệu',
              },
            ]}
          >
            <Input placeholder="Tên thương hiệu" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="unit"
            label="Đơn vị"
            required={false}
            rules={[
              {
                required: true,
                message: 'Nhập đơn vị',
              },
            ]}
          >
            <Input placeholder="Đơn vị" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="placeOfOrigin"
            label="Nguồn gốc"
            required={false}
            rules={[
              {
                required: true,
                message: 'Nhập nguồn gốc',
              },
            ]}
          >
            <Input placeholder="Nguồn gốc" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <SelectCategory formName="shopCategoryId" />
        </Col>
      </Row>
    </Col>
    <Col span={24}>
      <Form.Item
        name="otherImageUrls"
        required={false}
        rules={[
          {
            required: true,
            message: 'Upload ảnh sản phẩm',
          },
        ]}
      >
        <UploadList />
      </Form.Item>
    </Col>
  </Row>
);

const ProductForm: React.FC<any> = (props: any) => {
  const { loading, run } = useUpload();

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Collapse
            defaultActiveKey={['1', '2', '3']}
            items={[
              {
                key: '1',
                label: 'Thông tin chung',
                children: <CommonInfo {...props} />,
              },
              {
                key: '2',
                label: 'Thông tin chi tiết',
                children: <DetailInfo {...props} />,
              },
              {
                key: '3',
                label: 'Nội dung sản phẩm',
                children: (
                  <Spin spinning={loading}>
                    <Row style={{ marginTop: 24 }}>
                      <Col span={24}>
                        <div style={{ marginBottom: 12 }}>
                          <Typography.Text strong>Mô tả ngắn:</Typography.Text>
                        </div>
                        <Form.Item name="shortDescription" required={false} noStyle>
                          <Editor uploadImage={run} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div style={{ marginBottom: 12 }}>
                          <Typography.Text strong>Mô tả sản phẩm:</Typography.Text>
                        </div>
                        <Form.Item name="fullDescription" required={false} noStyle>
                          <Editor uploadImage={run} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Spin>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default memo(ProductForm);
