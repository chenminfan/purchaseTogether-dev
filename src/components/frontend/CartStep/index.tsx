import React from 'react'
import CartStepItem from '@components/frontend/CartStep/CartStepItem'
import './cartStep.scss'

type Props = {
  active: number
}
const STEP = [
  { title: "購物車結帳", info: '' },
  { title: "填寫送貨資訊", info: '' },
  { title: "結帳付款", info: '' },
]
export default function CartStep(props: Props) {
  const { active } = props;
  const stepBar = ((100 / (STEP.length - 1)) * (active))

  return (
    <div className='cartStep'>
      <div className="cartStep-progress progress" role="progressbar" aria-label="cartStep" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar" style={{ width: `${active > 0 ? stepBar : 0}%` }}></div>
      </div >
      <div className="cartStep-list">
        {STEP.map((item, index) => (
          <CartStepItem key={`cartStep_${item.title}`} disabled={active > index} active={active === -1 ? false : active === index} title={item.title} info={item?.info}></CartStepItem>
        ))}
      </div>
    </div>
  )
}