import React, { useEffect, useRef } from 'react'
import './inputStepper.scss'

type InputStepperType = {
  inputStepperNum: number,
  setInputStepperNum: (value: number) => void
  handleClickCut?: (value: number) => void
  handleClickAdd?: (value: number) => void,
  handleInputChange?: (e: any) => void,
  handleClickSubmit?: (e: any) => void,
  setInputStepperEdit?: (value: boolean) => void,
  isDisabled?: boolean,
  isEdit?: boolean,
}
export default function Stepper(props: InputStepperType) {
  const {
    inputStepperNum,
    setInputStepperNum,
    handleClickAdd = () => { },
    handleClickCut = () => { },
    handleInputChange = () => { },
    handleClickSubmit = () => { },
    isDisabled,
    isEdit,
    setInputStepperEdit = () => { }, } = props;

  const stepperValue = useRef(0)
  const handleAdd = (number) => {
    stepperValue.current = number + 1
    setInputStepperNum(++number)
    handleClickAdd(number)
  }
  const handleCut = (number) => {
    if (inputStepperNum > 1 && inputStepperNum !== 0) {
      stepperValue.current = number - 1
      setInputStepperNum(--number)
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
    setInputStepperNum(value)
    handleInputChange(value)
  }

  const handleSubmit = () => {
    handleClickSubmit(inputStepperNum)
  }
  useEffect(() => {
    stepperValue.current = inputStepperNum
  }, [inputStepperNum])
  return (
    <div className={`inputStepper rounded ${isEdit ? 'inputStepper-edit' : ''}`}>
      <div className="inputStepper-reduce">
        <button className="btn btn-outline-dark border-0 py-1" type="button"
          onClick={() => {
            handleCut(inputStepperNum)
          }}
          disabled={isEdit || isDisabled}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
      </div>
      <input type="number"
        className="form-control form-control-sm border-0 text-center shadow-none bg-transparent"
        aria-label={isDisabled ? 'Disabled' : ''}
        value={inputStepperNum}
        onChange={(e) => { handleChange(e) }}
        disabled={isDisabled}
      />
      <div className="inputStepper-increase">
        <button className="btn btn-outline-dark border-0 py-1" type="button" id="button-addon2"
          onClick={() => {
            handleAdd(inputStepperNum)
          }}
          disabled={isEdit || isDisabled}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
      {
        isEdit && <div className='inputStepper-tool'>
          <button className="btn btn-sm btn-dark border-0 py-1" type="button"
            onClick={() => {
              setInputStepperEdit(true)
              handleSubmit()
            }}
            disabled={isDisabled}
          >
            確認修改
          </button>
        </div>
      }
    </div >
  )
}
