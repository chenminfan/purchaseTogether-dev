import React, { useEffect, useRef } from 'react'
import './stepper.scss'


type StepperType = {
  stepperNum: number,
  setStepperNum: (value: number) => void
  handleClickCut?: (value: number) => void
  handleClickAdd?: (value: number) => void
}
export default function Stepper(props: StepperType) {
  const { stepperNum, setStepperNum, handleClickAdd = () => { }, handleClickCut = () => { }, } = props;

  const stepperValue = useRef(0)
  const handleAdd = (number) => {
    stepperValue.current = number + 1
    setStepperNum(++number)
    handleClickAdd(number)
  }
  const handleCut = (number) => {
    if (stepperNum > 1 && stepperNum !== 0) {
      stepperValue.current = number - 1
      setStepperNum(--number)
      handleClickCut(number)
    }
  }

  const handleChange = (e) => {
    if (!/\d*/.test(e.target.value)) return
    setStepperNum(e.target.value)
  }
  useEffect(() => {
    stepperValue.current = stepperNum
  }, [stepperNum])
  return (
    <div className="stepper rounded"  >
      <div className="stepper-reduce">
        <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
          onClick={() => {
            handleCut(stepperNum)
          }}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-transparent" value={stepperNum}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      <div className="stepper-increase">
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
