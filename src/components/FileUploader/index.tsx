import { uploadFileUsingPost } from '@/services/backend/fileController';
import { InboxOutlined } from '@ant-design/icons';
import '@umijs/max';
import { message, UploadFile, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react';

interface Props {
  biz: string;
  onChange?: (fileList: UploadFile[]) => void;
  value?: UploadFile[];
  description?: string;
}

const FileUploader: React.FC<Props> = (props) => {
  const { value, onChange, biz, description } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    fileList: value,
    disabled: loading,
    onChange: ({ fileList }) => {
      onChange?.(fileList);
    },
    customRequest: async (fileObj: any) => {
      setLoading(true);
      try {
        const res = await uploadFileUsingPost(
          {
            biz,
          },
          {},
          fileObj.file,
        );
        fileObj.onSuccess(res.data);
      } catch (e: any) {
        message.error('上传失败，' + e.message);
        fileObj.onError(e);
      }
      setLoading(false);
    },
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件上传</p>
      <p className="ant-upload-hint">{description}</p>
    </Dragger>
  );
};

export default FileUploader;
