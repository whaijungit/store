import { Image } from 'antd'
import { useState } from 'react'
import StoreList from '@/views/components/StoreList'
import Uploader from '@/views/components/Uploader'

const Production: React.FC = () => {
  const [uri, setUri] = useState('')
  return (
    <>
      <Uploader value={uri} onChange={(url) => setUri(url)}></Uploader>
      <StoreList columns={[
        { title: '图片', align: 'center', fixed: 'left', dataIndex: 'poster', width: 100, render(_) { return <Image width={50} height={50} src={_} /> } },
        { title: '名称', align: 'center', dataIndex: 'name', width: 100 },
        { title: '型号', align: 'center', dataIndex: 'series', width: 100 },
        { title: '颜色', align: 'center', dataIndex: 'color', width: 100 },
        { title: '材质', align: 'center', dataIndex: 'textureMaterial', width: 100 },
        { title: '尺寸', align: 'center', dataIndex: 'size', width: 100 }

      ]} data={[
        { poster: 'C:\\Users\\whaij\\Pictures\\Saved Pictures\\avatar.jpg', series: 'yyds', id: Math.random().toString(), size: 1, color: '蓝色', textureMaterial: '木质', name: '一体化神迅桌' }
      ]}></StoreList>
    </>
  )
}

export default Production