import React from 'react'
import './cartStep.scss'

type Props = {
  title: string,
  info: string,
  active: boolean,
  disabled: boolean,
}

export default function CartStepItem(props: Props) {
  const { title, info, active, disabled } = props
  return (
    <div className={`cartStep-item ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}>
      <div className="cartStep-spot"></div>
      <div className="cartStep-box">
        <div className="cartStep-title">{title}</div>
        {info && <div className="cartStep-info">{info}</div>}
      </div>
    </div>
  )
}