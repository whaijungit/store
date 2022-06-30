import React from 'react'

const Content: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="content-container container-center">
      {props.children}
    </div>
  )
}

export default Content