import { upload } from '@/services/products/api';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, UploadProps, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface UploadFileProps {
  accept?: string;
  onChange?: (url: string | undefined) => void;
  value?: string;
  limit?: number;
}

const UploadFile: React.FC<UploadFileProps> = ({
  accept = 'image/*',
  onChange,
  value,
  limit = 2,
}) => {
  const [image, setImage] = useState<string | undefined>(value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImage(value);
  }, [value]);

  const customRequest = async (options: any) => {
    const { file } = options;
    options.onSuccess(file, options.file); // Simulate successful upload
  };

  const onUploadChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true); // Show uploading status
    }
    if (info.file.status === 'done') {
      try {
        const { originFileObj } = info.file;

        const res = await upload({ file: originFileObj });

        setImage(res?.data?.links?.permalink);
        if (typeof onChange === 'function') {
          onChange(res?.data?.links?.permalink);
        }
      } catch (e) {
        console.error('Error uploading file:', e);
      } finally {
        setUploading(false);
      }
    }
    if (info.file.status === 'error') {
      setUploading(false);
    }
  };

  const beforeUpload = (file: any): boolean => {
    const isValidType = ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);
    const isWithinSizeLimit = file.size / 1024 / 1024 < limit;
    if (!isValidType) {
      message.error('Chỉ hỗ trợ các định dạng file .jpg, .jpeg, .png');
      return false;
    }
    if (!isWithinSizeLimit) {
      message.error(`File không được lớn hơn ${limit}MB!`);
      return false;
    }
    return true;
  };

  return (
    <Upload
      onChange={onUploadChange}
      beforeUpload={beforeUpload}
      showUploadList={false}
      customRequest={customRequest}
      accept={accept}
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
    >
      {image ? (
        <img src={image} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <button style={{ border: 0, background: 'none' }} type="button">
          {uploading ? <LoadingOutlined /> : <UploadOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      )}
    </Upload>
  );
};

export default UploadFile;
