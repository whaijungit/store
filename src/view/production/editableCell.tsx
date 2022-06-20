import base64 from '@/services/base64';
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { Button, Form, Input, Upload, Image } from 'antd';

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  type: 'number' | 'text' | 'file';
  required: boolean;
  recrod: Production;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  type,
  recrod,
  required,
  index,
  children,
  ...restProps
}) => {
  const [state, setState] = useState<boolean>(true);
  const [source, setSource] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  React.useEffect(() => {
    if (recrod) {
      setSource(recrod.poster);
    }
  }, []);
  let element = <Input type="text" />;
  if (type === 'file') {
    element = state ? (
      <Image
        width={50}
        height={50}
        preview={state}
        src={source}
        onClick={() => setState(false)}
      ></Image>
    ) : (
      <Upload
        onRemove={() => {
          setFileList([]);
        }}
        fileList={fileList}
        customRequest={async (options) => {
          if (options.file) {
            const dataView = await base64(options.file as File);
            setSource(dataView);
            setState(true);
          }
        }}
      >
        <Button size="small" icon={<EditOutlined />}>
          点击修改图片
        </Button>
      </Upload>
    );
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex === 'poster' ? false : required,
              message: `请输入必填项 ${title}!`,
            },
          ]}
        >
          {element}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
