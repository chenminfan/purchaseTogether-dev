import React from 'react'
import './boxSection.scss'

type Props = {
  children: JSX.Element | JSX.Element[],
  isAlertOpen?: boolean,
  isAlert?: boolean,
  alertMessage?: string,
  headLineText: string,
}

export default function BoxSection(props: Props) {
  const { children, isAlertOpen, isAlert, alertMessage, headLineText } = props;
  return (
    <div className="boxSection">
      <div className="box-main">
        {isAlertOpen && (
          <div className={`alert alert-${isAlert ? "success" : "danger"}`}>
            {alertMessage}
          </div>
        )}
        <div className="box-headLine"><h2>{headLineText}</h2></div>
        {children}

      </div>
    </div>
  )
}