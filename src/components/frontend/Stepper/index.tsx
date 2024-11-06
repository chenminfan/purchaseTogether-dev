import React, { useState } from 'react'
import './stepper.scss'

export default function Stepper(props) {
  const { num } = props
  const [prodsNum, setProdsNum] = useState<number>(num)
  const handleAdd = (number) => {
    if (0 < prodsNum && number < num) {
      setProdsNum(++number)
    }

  }
  const handleCut = (number) => {
    if (prodsNum > 1 && prodsNum !== 0) {
      setProdsNum(--number)
    }
  }

  const handleChange = (e) => {
    if (!/\d*/.test(e.target.value)) return
    setProdsNum(e.target.value)
  }
  return (
    <div className="stepper rounded">
      <div className="stepper-reduce">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
          onClick={() => {
            handleCut(prodsNum)
          }}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-transparent" value={prodsNum} onChange={(e) => {
        handleChange(e)
      }} />
      <div className="stepper-increase">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"
          onClick={() => {

            handleAdd(prodsNum)
          }}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div >
  )
}
