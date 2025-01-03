
type TextAreaType = {
  id: string,
  labelText: string,
  type: string,
  placeholder?: string,
  rules?;
  name?: string,
  value?: string | number,
  handleChange?: (e: any) => void,
  register?;
  errors?;
  isRequired?: boolean,
  disabled?: boolean,
  readonly?: boolean,
}

export default function TextArea(props: TextAreaType) {
  const { id, labelText, type, rules, register, isRequired, errors, placeholder, value, handleChange = () => { }, name, disabled, readonly } = props;
  return (
    <div className={labelText ? 'my-2' : ''}>
      {labelText && <label htmlFor={id} className='form-label'>
        {labelText}{isRequired ? (<span className="text-danger">＊</span>) : ''}
      </label>}
      {
        register ? (
          <input
            id={id}
            type={type}
            {...register(id, rules)}
            placeholder={placeholder}
            className={`form-control ${errors[id] && 'is-invalid'}`}
            value={value}
            onChange={handleChange}
            autoComplete={type === 'password' ? 'new-password' : ''}
            disabled={disabled}
            readOnly={readonly}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="form-control"
            value={value}
            name={name}
            onChange={handleChange}
            disabled={disabled}
          />
        )
      }

      {
        errors && errors[id] && (
          <div className='invalid-feedback'>{errors?.[id]?.message}</div>
        )
      }
    </div >

  )
}