import React from 'react'
import './stepper.scss'

export default function Stepper() {
  return (
    <div className="stepper rounded">
      <div className="stepper-reduce">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1">
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="text" className="form-control border-0 text-center my-auto shadow-none bg-transparent" defaultValue="1" />
      <div className="stepper-increase">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2">
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  )
}
