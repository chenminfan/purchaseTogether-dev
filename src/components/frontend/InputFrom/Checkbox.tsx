
type CheckboxType = {
  id: string,
  name: string,
  checkboxText: string,
  type: string,
  value: string,
  required?: boolean,
  handleClick: (e: any) => void,
  rules?;
  register;
  errors;
  children?: JSX.Element | JSX.Element[]
}

export default function Checkbox(props: CheckboxType) {
  const { id, name, required, checkboxText, value, type, rules, register, errors, handleClick = () => { }, children } = props
  return (
    <div className="form-check my-3">
      <input id={id} type={type} required={required}
        className={`form-check-input me-2 ${errors[id] && 'is-invalid'}`}
        {...register(name, rules)} name={name} value={value} onClick={handleClick} />
      <label className='form-check-label' htmlFor={id}>{checkboxText}{children}</label>
      {errors[name] && (
        <div className='invalid-feedback'>{errors?.[id]?.message}</div>
      )}
    </div>
  )
}