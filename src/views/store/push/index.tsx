import React from 'react'
import { Select } from 'antd'
import { FormItem } from '../production'
import StoreForm from '@/views/components/StoreForm'

const formItem: FormItem[] = [
  {
    label: '入库时间',
    name: 'push_timer',
    required: true,
    type: 'date',
  },
  {
    label: '产品',
    name: 'production',
    required: true,
    type: 'select',
  },
  {
    label: '产品数量',
    name: 'production_number',
    required: true,
    type: 'number',
  },
  {
    label: '出库方式',
    name: 'pop_mode',
    required: true,
    type: 'text',
  },
  {
    label: '运输方式',
    name: 'transport_mode',
    required: true,
    type: 'text',
  },
  {
    label: '入库方式',
    name: 'push_mode',
    required: true,
    type: 'text',
  },
  {
    label: '所入仓库',
    name: 'store',
    required: true,
    type: 'number',
  }
]

interface PushStoreProps {
  chooseProductions: Production[]
}

const PushStore: React.FC<PushStoreProps> = ({ chooseProductions }) => {
  console.log('render push');
  const [series, setSeries] = React.useState('')
  const seriess = chooseProductions.map((p) => (p.series))
  // const stores = ['store1', 'store2', 'store3', 'store4', 'store5', 'store6', 'store7', 'store8']
  const select = <Select placeholder="请选择产品" value={series} onChange={(e) => setSeries(e)}>
    {seriess.map((item) => <Select.Option key={item} children={item} label={item} value={item}></Select.Option>)}
  </Select>

  return (
    <StoreForm select={select} onSubmit={async (value) => {
      const pushRecord = value as PushProducitonStore
      console.log(pushRecord);
      return true
    }} formItem={formItem} ></StoreForm >
  )
}

export default PushStore