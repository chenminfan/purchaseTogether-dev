import React from 'react'
import './loadingState.scss'

type Props = {
  loadingTitle: string,
  loadingIcon: string,
}

export default function Loading(props: Props) {
  const { loadingTitle, loadingIcon } = props
  return (
    <div className='loadingState'>
      <div className="loadingState-box">
        <div className="loadingState-image">
          <div className="loadingState-loading spinner-border spinner-border-sm" role="status">
          </div>
          <div className="loadingState-icon">
            <i className={`bi ${loadingIcon}`}></i>
          </div>
        </div>

        <div className="loadingState-title">
          Loading...
          <span className='loadingState-title-text'>{loadingTitle}</span>
        </div>
      </div>

    </div>
  )
}