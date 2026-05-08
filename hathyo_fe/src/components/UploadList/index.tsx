import { upload } from '@/services/products/api';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Image, Spin, Upload, notification } from 'antd';
import { find, isEmpty, map } from 'lodash';
import React, { memo, useLayoutEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadList: React.FC<any> = ({
  value,
  onChange = () => {},
}: {
  value: string[];
  onChange?: (a: unknown) => unknown;
}) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any>([]);

  useLayoutEffect(() => {
    if (!isEmpty(value)) {
      setFileList(value);
    }
  }, [value]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList, file }) => {
    if (file.status === 'removed') {
      setFileList(map(newFileList, 'url'));
      onChange(map(newFileList, 'url'));
      return;
    }

    setLoading(true);
    try {
      const newFile = find(newFileList, (item) => item?.originFileObj) as any;
      if (!newFile) {
        setFileList(newFileList);
        return;
      }
      const response = await upload({ file: newFile?.originFileObj });
      setFileList([...fileList, response?.data?.links?.permalink]);
      onChange([...fileList, response?.data?.links?.permalink]);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra trong quá trình upload' + JSON.stringify(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Spin spinning={loading}>
      <Upload
        listType="picture-card"
        fileList={fileList ? (map(fileList, (item) => ({ url: item })) as any) : null}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
        multiple={false}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Spin>
  );
};

export default memo(UploadList);
