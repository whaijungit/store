import { useState } from 'react'
import Uploader from './Uploader'
import { useForm } from 'antd/lib/form/Form'
import { generateUUID } from '@/common/helper'
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Space } from 'antd'

export type InputType = 'file' | 'text' | 'date' | 'number' | 'select'

export interface StoreFormProps {
  formItem: Array<{
    type: InputType
    label: string
    name: string
    required: boolean
  }>
  select?: React.ReactNode
  /** 当前表单提交成功的 */
  onSubmitSuccess?: () => void
  onValidateFailed?: () => void
  /** 当前表单正在验证中 */
  onSubmitThing?: () => void
  /** @description 验证中... @returns {Promise<boolean>} */
  onSubmit: (values: Production | PopProduction | PushProducitonStore) => Promise<boolean>
}

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: `24px 16px 1px`,
    marginBottom: '16px'
  },
  layouts: { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
}

const StoreForm: React.FC<StoreFormProps> = (props) => {
  const [disable, setDisabled] = useState(false)
  const [form] = useForm<Production | PopProduction | PushProducitonStore>()
  const getFormItemContent = (item: {
    type: InputType
    label: string
    name: string
    required: boolean
  }) => {
    switch (item.type) {
      case 'date':
        return <DatePicker placeholder={`请选择${item.label}`} />
      case 'file':
        return <Uploader />
      case 'text':
        return <Input placeholder={`请输入${item.label}`} />
      case 'number':
        return <InputNumber step={10} style={{ width: '100%' }} placeholder={`请输入${item.label}`} />
      case 'select':
        return props.select
    }
  }
  const handleClick = async () => {
    setDisabled(true)
    props.onSubmitThing && props.onSubmitThing();
    try {
      const values = await form.validateFields()
      values.id = generateUUID()
      const result = await props.onSubmit(values)
      if (result) {
        props.onSubmitSuccess && props.onSubmitSuccess()
        form.resetFields()
      }
    } catch {
      props.onValidateFailed && props.onValidateFailed()
    } finally {
      setTimeout(() => {
        setDisabled(false)
      }, 600);
    }
  }
  return (
    <Form className='form_container' style={styles.container} {...styles.layouts} form={form} >
      <Row gutter={[8, 0]}>
        {props.formItem.map((item, index) => (<Col span={12} key={index}>
          <Form.Item
            name={item.name}
            rules={[{ required: item.required, message: item.label + '是必填' }]}
            label={item.label}
          >
            {getFormItemContent(item)}
          </Form.Item>
        </Col>))}
      </Row>
      <Form.Item style={{
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center'
      }}>
        <Space size={'middle'}>
          <Button disabled={disable} loading={disable} type='primary' onClick={handleClick}>{disable ? '提交中' : '提交'}</Button>
          <Button type='default' onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form >
  )
}

export default StoreForm