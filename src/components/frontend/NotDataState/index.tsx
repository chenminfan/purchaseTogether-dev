import React from 'react'
import './notDataState.scss'

type Props = {
  notStateTitle: string,
  notStateIcon: string,
  children: JSX.Element | JSX.Element[] | string,
}

export default function NotDataState(props: Props) {
  const { notStateTitle, notStateIcon, children } = props
  return (
    <div className='notState'>
      <div className="notState-box">
        <div className="notState-icon">
          <i className={`bi ${notStateIcon}`}></i>
        </div>
        <div className="notState-title">
          {notStateTitle}
        </div>
        {children}
      </div>

    </div>
  )
}