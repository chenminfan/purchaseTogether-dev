import React, { useEffect, useRef } from 'react'
import './stepper.scss'


type StepperType = {
  stepperNum: number,
  setStepperNum: (value: number) => void
  handleClickCut?: (value: number) => void
  handleClickAdd?: (value: number) => void,
  handleInputChange?: (e: any) => void,
  handleClickSubmit?: (e: any) => void,
  setStepperEdit?: (value: boolean) => void,
  isDisabled?: boolean,
  isEdit?: boolean,
}
export default function Stepper(props: StepperType) {
  const { stepperNum,
    setStepperNum,
    handleClickAdd = () => { },
    handleClickCut = () => { },
    handleInputChange = () => { },
    handleClickSubmit = () => { },
    isDisabled,
    isEdit,
    setStepperEdit = () => { }, } = props;

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
    const { value } = e.target
    if (!/\d*/.test(value)) {
      return
    } else if (value.length > 4) {
      return
    }
    setStepperNum(value)
    handleInputChange(value)
  }

  const handleSubmit = () => {
    handleClickSubmit(stepperNum)
  }
  useEffect(() => {
    stepperValue.current = stepperNum
  }, [stepperNum])
  return (
    <div className={`stepper rounded ${isEdit ? 'stepper-edit' : ''}`}>
      <div className="stepper-reduce">
        <button className="btn btn-outline-dark border-0 py-1" type="button"
          onClick={() => {
            handleCut(stepperNum)
          }}
          disabled={isEdit || isDisabled}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number"
        className="form-control form-control-sm border-0 text-center shadow-none bg-transparent"
        aria-label={isDisabled ? 'Disabled' : ''}
        value={stepperNum}
        onChange={(e) => { handleChange(e) }}
        disabled={isDisabled}
      />
      <div className="stepper-increase">
        <button className="btn btn-outline-dark border-0 py-1" type="button" id="button-addon2"
          onClick={() => {
            handleAdd(stepperNum)
          }}
          disabled={isEdit || isDisabled}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
      {isEdit && <div className='stepper-tool'>
        <button className="btn btn-sm btn-dark border-0 py-1" type="button"
          onClick={() => {
            setStepperEdit(true)
            handleSubmit()
          }}
          disabled={isDisabled}
        >
          確認修改
        </button>
      </div>}
    </div >
  )
}
