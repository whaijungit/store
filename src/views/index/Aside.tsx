import React, { SetStateAction } from 'react'

interface AsideProps {
  onClick: (index: number) => void
}

const items = ['新增', '出货', '入库', '一号仓库', '二号仓库', '三号仓库', '四号仓库', '五号仓库', '六号仓库', '七号仓库', '八号仓库', '其他仓库']

const helperHandleClick = (index: number, setIndex: React.Dispatch<SetStateAction<number>>, onClick: (index: number) => void) => {
  switch (index) {
    case 0:
      setIndex(index)
      onClick(index);
      break;
    case 1:
      setIndex(index)
      onClick(index);
      break;
    case 2:
      setIndex(index)
      onClick(index);
      break;
    case 3:
      setIndex(index)
      onClick(index);
      break;
    case 4:
      setIndex(index)
      onClick(index);
      break;
    case 5:
      setIndex(index)
      onClick(index);
      break;
    case 6:
      setIndex(index)
      onClick(index);
      break;
    case 7:
      setIndex(index)
      onClick(index);
      break;
    case 8:
      setIndex(index)
      onClick(index);
      break;
    case 9:
      setIndex(index)
      onClick(index);
      break;
    case 10:
      setIndex(index)
      onClick(index);
      break;
    case 11:
      setIndex(index)
      onClick(index);
      break;
  }
}
const Aside: React.FC<AsideProps> = (props: AsideProps) => {
  const [index, setIndex] = React.useState(0)
  const handleClick = (index: number) => {
    helperHandleClick(index, setIndex, props.onClick)
  }
  return (
    <div className='aside-container'>
      <a href="#" className={index === 0 ? 'item active' : 'item'} onClick={() => {
        handleClick(0)
      }}>新增</a>
      <a href="#" className={index === 1 ? 'item active' : 'item'} onClick={() => {
        handleClick(1)
      }}>出货</a>
      <a href="#" className={index === 2 ? 'item active' : 'item'} onClick={() => {
        handleClick(2)
      }}>入库</a>
      <a href="#" className={index === 3 ? 'item active' : 'item'} onClick={() => {
        handleClick(3)
      }}>一号仓库</a>
      <a href="#" className={index === 4 ? 'item active' : 'item'} onClick={() => {
        handleClick(4)
      }}>二号仓库</a>
      <a href="#" className={index === 5 ? 'item active' : 'item'} onClick={() => {
        handleClick(5)
      }}>三号仓库</a>
      <a href="#" className={index === 6 ? 'item active' : 'item'} onClick={() => {
        handleClick(6)
      }}>四号仓库</a>
      <a href="#" className={index === 7 ? 'item active' : 'item'} onClick={() => {
        handleClick(7)
      }}>五号仓库</a>
      <a href="#" className={index === 8 ? 'item active' : 'item'} onClick={() => {
        handleClick(8)
      }}>六号仓库</a>
      <a href="#" className={index === 9 ? 'item active' : 'item'} onClick={() => {
        handleClick(9)
      }}>七号仓库</a>
      <a href="#" className={index === 10 ? 'item active' : 'item'} onClick={() => {
        handleClick(10)
      }}>八号仓库</a>
      <a href="#" className={index === 11 ? 'item active' : 'item'} onClick={() => {
        handleClick(11)
      }}>其他仓库</a>
    </div>
  )
}

export default Aside