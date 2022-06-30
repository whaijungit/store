import fs from 'fs'
import path from 'path'
import { useState } from 'react'
import { ipcRenderer } from 'electron'
import { RcFile } from 'antd/lib/upload'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, UploadFile } from 'antd'
import { UploadRequestOption } from 'rc-upload/lib/interface'

interface ImageUploaderProps {
  value?: string
  onChange?: (url: string) => void
}

const Uploader: React.FC<ImageUploaderProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const handleRequest = async (options: UploadRequestOption) => {
    const file = options.file as RcFile
    const extname = path.extname(file.path)
    const buffer = await fs.promises.readFile(file.path)
    ipcRenderer.send('upload-image', { filename: file.name, content: buffer, extname })
    ipcRenderer.on('upload-success', (e, url) => {
      props.onChange && props.onChange(url)
    })
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
        <img style={{ width: '100%', objectFit: 'contain' }} src={props.value} />
      </Modal>
      <Upload
        fileList={getFileList()}
        listType='picture-card'
        customRequest={handleRequest}
        accept=".jpg,.png,.gif,.jpeg"
        onRemove={() => {
          props.onChange && props.onChange('')
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