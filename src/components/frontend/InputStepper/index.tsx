import React, { useState } from 'react'
import './inputStepper.scss'

export default function InputStepper(props) {
  const { num } = props
  const [stepperNum, setStepperNum] = useState<number>(num)
  const handleAdd = (number) => {
    setStepperNum(++number)
  }
  const handleCut = (number) => {
    if (stepperNum > 1 && stepperNum !== 0) {
      setStepperNum(--number)
    }
  }

  const handleChange = (e) => {
    if (!/\d*/.test(e.target.value)) return
    setStepperNum(e.target.value)
  }
  return (
    <div className="inputStepper rounded">
      <div className="inputStepper-reduce">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
          onClick={() => {
            handleCut(stepperNum)
          }}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-transparent" value={stepperNum} onChange={(e) => {
        handleChange(e)
      }} />
      <div className="inputStepper-increase">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"
          onClick={() => {

            handleAdd(stepperNum)
          }}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div >
  )
}
