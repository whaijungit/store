import os from 'os'
import path from 'path'
import { promises } from 'fs'
import { useState } from 'react'
import { RcFile } from 'antd/lib/upload'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, UploadFile } from 'antd'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import ProductionServices from '@/common/services'

interface ImageUploaderProps {
  value?: string
  onChange?: (url: string) => void
}

const Uploader: React.FC<ImageUploaderProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const handleRequest = async (options: UploadRequestOption) => {
    const file = options.file as RcFile
    const filename = await ProductionServices.writeImage(file.path)
    props.onChange && props.onChange(filename)
  }
  const getFileList = (): UploadFile[] => {
    if (props.value) {
      return [
        {
          uid: props.value,
          name: props.value,
          url: props.value,
        }
      ]
    }
    return []
  }
  const getUploadContent = () => {
    if (props.value) {
      return null
    }
    return (
      <>
        <PlusOutlined />
        <div>点击上传</div>
      </>
    )
  }
  return (
    <div>
      <Modal visible={visible} title={null} onOk={() => {
        setVisible(false)
      }} onCancel={() => {
        setVisible(false)
      }}>
        <img style={{ width: '100%', objectFit: 'cover' }} src={props.value} />
      </Modal>
      <Upload
        fileList={getFileList()}
        listType='picture-card'
        customRequest={handleRequest}
        accept=".jpg,.png,.gif,.jpeg"
        onRemove={async () => {
          props.onChange && props.onChange('')
          // if (props.value) {
          //   promises.unlink(props.value)
          // }
        }}
        onPreview={() => {
          setVisible(true)
        }}
      >
        {getUploadContent()}
      </Upload>

    </div>
  )
}

export default Uploader