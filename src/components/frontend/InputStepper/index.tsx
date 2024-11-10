import React from 'react'
import './inputStepper.scss'

type StepperType = {
  inputStepperNum: number,
  setInputStepperNum: (value: number) => void
  inputStepperOnChange?: (e: any) => void
  handleClickCut?: () => void
  handleClickAdd?: () => void
}
export default function InputStepper(props: StepperType) {
  const { inputStepperNum, setInputStepperNum, inputStepperOnChange = () => { } } = props;
  const handleAdd = (number) => {
    setInputStepperNum(++number)
  }
  const handleCut = (number) => {
    if (inputStepperNum > 1 && inputStepperNum !== 0) {
      setInputStepperNum(--number)
    }
  }

  const handleChange = (e) => {
    if (!/\d*/.test(e.target.value)) return
    setInputStepperNum(e.target.value)
    inputStepperOnChange(e.target.value)
  }
  return (
    <div className="inputStepper rounded">
      <div className="inputStepper-reduce">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
          onClick={() => {
            handleCut(inputStepperNum)
          }}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-transparent" value={inputStepperNum}
        onChange={(e) => {
          handleChange(e)
        }} />
      <div className="inputStepper-increase">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"
          onClick={() => {

            handleAdd(inputStepperNum)
          }}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div >
  )
}
