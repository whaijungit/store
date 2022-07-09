import React from 'react'
import { Avatar, Button, Popconfirm, Space } from 'antd'
import { LoginOutlined, MenuFoldOutlined } from '@ant-design/icons'

interface HeaderProps {
  avatar?: string
  onCollapse: () => void
  onLoginOut: () => void
}

const Header: React.FC<HeaderProps> = (props) => {

  return (
    <div className="header-container container-center">
      <div>
        <Button size='middle' onClick={props.onCollapse} icon={<MenuFoldOutlined />} />
      </div>
      <div>
        <Space>
          <Popconfirm style={{ width: 200 }} placement={'bottom'} title={'确定要退出系统嘛!'} onConfirm={props.onLoginOut} okText="确认" cancelText="取消">
            <Button size='middle' icon={<LoginOutlined />} />
          </Popconfirm>
          <Avatar size={'default'} shape='circle' src={props.avatar} />
        </Space>
      </div>
    </div>
  )
}

export default Header;