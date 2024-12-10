import React from 'react'
import './loadingState.scss'

type Props = {
  loadingStateTitle: string,
  loadingStateIcon: string,
}

export default function LoadingState(props: Props) {
  const { loadingStateTitle, loadingStateIcon } = props
  return (
    <div className='loadingState'>
      <div className="loadingState-box">
        <div className="loadingState-image">
          <div className="loadingState-loading spinner-border spinner-border-sm" role="status">
          </div>
          <div className="loadingState-icon">
            <i className={`bi ${loadingStateIcon}`}></i>
          </div>
        </div>

        <div className="loadingState-title">
          Loading...
          <span className='loadingState-title-text'>{loadingStateTitle}</span>
        </div>
      </div>

    </div>
  )
}