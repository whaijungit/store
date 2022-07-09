import FormItem from 'antd/lib/form/FormItem'
import Uploader from '@/views/components/Uploader'
import { InputType } from '@/views/components/StoreForm'
import { DatePicker, Input, InputNumber, Select } from 'antd'

interface EditableCellProps extends React.HtmlHTMLAttributes<HTMLElement> {
  title: string
  type: InputType
  record: Production
  editing: boolean
  children: React.ReactNode
  dataIndex: keyof Production
}

const EditableCell: React.FC<EditableCellProps> = ({ editing, record: item, type, dataIndex, title, children, ...resProps }) => {
  const getFormItemContent = (type: InputType) => {
    switch (type) {
      case 'date':
        return <DatePicker placeholder={`请选择${title}`} />
      case 'file':
        return <Uploader />
      case 'text':
        return <Input placeholder={`请输入${title}`} />
      case 'number':
        return <InputNumber style={{ width: '100%' }} placeholder={`请输入${title}`} />
      case 'select':
        <Select.OptGroup >
        </Select.OptGroup>
        return
      default: 
        return '123123'
    }
  }
  return <td {...resProps}>
    {editing ? (<FormItem name={dataIndex} rules={[{ required: true, message: `${title}必填` }]}>
      {getFormItemContent(type)}
    </FormItem>) : (
      children
    )}
  </td>
}

export default EditableCell