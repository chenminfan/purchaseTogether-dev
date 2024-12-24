import React, { useContext } from 'react'
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import './cartStep.scss'

type Props = {
  title: string,
  info: string,
  active: boolean,
  disabled: boolean,
}

export default function CartStepItem(props: Props) {
  const { title, info, active, disabled } = props
  const { USER_TOKEN } = useContext<any>(LoginContext)
  return (
    <div className={`cartStep-item ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}>
      <div className="cartStep-spot"></div>
      <div className="cartStep-box">
        <div className="cartStep-title">{title}</div>
        {(USER_TOKEN === '') && title === "購物車結帳" && <div className="cartStep-title text-danger">您尚未登入會員！</div>}
        {info && <div className="cartStep-info">{info}</div>}
      </div>
    </div>
  )
}