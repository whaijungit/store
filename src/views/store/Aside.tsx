import { Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { ReactKeys } from '.'

const items: ItemType[] = [
  {
    label: '产品',
    key: 'production',
  },
  {
    label: '入库',
    key: 'push',
  },
  {
    label: '出货',
    key: 'pop',
  },
  {
    label: '仓库',
    key: 'store',
    children: [
      {
        key: 'store1',
        label: '一号仓库',
      },
      {
        key: 'store2',
        label: '二号仓库',
      },
      {
        key: 'store3',
        label: '三号仓库',
      },
      {
        key: 'store4',
        label: '四号仓库',
      },
      {
        key: 'store5',
        label: '五号仓库',
      },
      {
        key: 'store6',
        label: '六号仓库',
      },
      {
        key: 'store7',
        label: '七号仓库',
      },
      {
        key: 'store8',
        label: '八号仓库',
      },
      {
        key: 'store_other',
        label: '其他',
      }
    ]
  },
]

const Aside: React.FC<{ value: string[], switchPage: (key: ReactKeys) => void }> = (props) => {

  return (
    // @ts-ignore
    <Menu selectedKeys={props.value} defaultSelectedKeys={props.value} items={items.map((item) => {
      return {
        ...item,
        onClick(key) {
          props.switchPage(key.key as ReactKeys)
        }
      }
    })} />
  )
}

export default Aside