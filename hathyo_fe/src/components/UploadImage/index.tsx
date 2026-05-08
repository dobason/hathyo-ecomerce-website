import { getBase64 } from '@/utils/func';
import { InboxOutlined } from '@ant-design/icons';
import { Form, GetProp, Image, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  thumbnail?: string;
  hintTitle?: string;
  title?: string;
  formName?: string;
  width?: number | string;
  height?: number | string;
  labelCol?: any;
  wrapperCol?: any;
  noStyle?: boolean;
  aspectRatio?: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const UploadImage: React.FC<Props> = ({
  thumbnail,
  width = '100%',
  labelCol,
  wrapperCol,
  noStyle = true,
  title = 'Kéo thả hình vào khung hoặc bấm vào khung để upload banner',
  hintTitle = 'Banner bài viết chỉ có 1 ảnh',
  formName = 'fileUpload',
  aspectRatio = '1/1',
}: Props) => {
  const [file, setFile] = useState<FileType | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange: UploadProps['onChange'] = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setFile(file as FileType);
    setPreviewImage(file.url || (file.preview as string));
  };

  return (
    <>
      <Form.Item
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        name={formName}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        noStyle={noStyle}
        className="w-full"
      >
        <Upload.Dragger
          fileList={file ? [file] : []}
          defaultFileList={file ? [file] : []}
          multiple={false}
          maxCount={1}
          accept="image/*"
          onChange={handleChange}
          name="files"
          showUploadList={false}
          style={{ width, aspectRatio }}
          rootClassName={`max-w-full h-fit`}
        >
          {previewImage || thumbnail ? (
            <Image
              alt="example"
              preview={false}
              style={{ width, aspectRatio, objectFit: "cover" }}
              src={previewImage || thumbnail}
              fallback="https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"
            />
          ) : (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{title}</p>
              <p className="ant-upload-hint">{hintTitle}</p>
            </>
          )}
        </Upload.Dragger>
      </Form.Item>
    </>
  );
};
