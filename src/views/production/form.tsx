import React from 'react';
import base64 from '@/services/base64';
import { useForm } from 'antd/lib/form/Form';
import { generateUUID } from '@/services/utils';
import { CustmizerColumnType } from '../common';
import { Button, Col, Form, Input, Row, Space } from 'antd';

interface FormProductionProps {
  /**
   * 表单验证失败的时候触发
   */
  onValidateError?: () => void;
  /**
   * 表单信息完成提交
   */
  onSumit?: (data: Production) => Promise<boolean>;
  /**
   * 表单信息提交失败
   */
  onSubmitCatch?: () => void;
  /**
   * 表单字段
   */
  formFields: CustmizerColumnType<Production>[];
}

const FormProduction: React.FC<FormProductionProps> = ({
  onSumit,
  formFields,
  onSubmitCatch,
  onValidateError,
}) => {
  const [form] = useForm<Production>();
  const [source, setSource] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      values.poster = source;
      values.id = generateUUID();
      if (onSumit) {
        const success = await onSumit(values);
        form.resetFields();
        if (!success) {
          if (onSubmitCatch) {
            onSubmitCatch();
          }
        }
      }
    } catch (err) {
      onValidateError && onValidateError();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form form={form} className="form_container">
      <Row gutter={5}>
        {formFields.map((production, index) => {
          let element: React.ReactNode = <Input></Input>;
          if (production.type === 'file') {
            element = (
              <Input
                accept=".jpg,.png,.gif"
                type="file"
                value={source}
                onChange={async (e) => {
                  if (e.target.files) {
                    const url = await base64(e.target.files[0]);
                    setSource(url);
                  }
                }}
              ></Input>
            );
          } else if (production.type === 'text') {
            element = 'text';
          } else if (production.type === 'number') {
            element = 'number';
          }
          if (production.title === '操作') {
            return null;
          }
          return (
            <Col key={index} span={12}>
              <Form.Item
                label={production.title as string}
                name={production.dataIndex as string}
                rules={[
                  {
                    required: production.required,
                    message: `${production.title}是必填项`,
                  },
                ]}
              >
                {element}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <Form.Item className="btns_row">
        <Space>
          <Button
            className="submit_btn"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={handleClick}
          >
            提交
          </Button>
          <Button type="default" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormProduction;
