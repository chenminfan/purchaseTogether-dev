
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
  disabled?: boolean,
}

export default function TextArea(props: TextAreaType) {
  const { id, labelText, type, rules, register, errors, placeholder, value, handleChange = () => { }, name, disabled } = props;
  return (
    <div className={labelText ? 'my-2' : ''}>
      {labelText && <label htmlFor={id} className='form-label'>
        {labelText}
      </label>}
      {register ? (
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
      )}

      {errors && errors[id] && (
        <div className='invalid-feedback'>{errors?.[id]?.message}</div>
      )}
    </div>

  )
}