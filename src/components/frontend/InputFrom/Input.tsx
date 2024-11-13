
type TextAreaType = {
  id: string,
  labelText: string,
  type: string,
  placeholder?: string,
  rules?;
  value?: string | number,
  register;
  errors;
}

export default function TextArea(props: TextAreaType) {
  const { id, labelText, type, rules, register, errors, placeholder, value } = props;
  return (
    <div className={labelText ? 'my-3' : ''}>
      {labelText && <label htmlFor={id} className='form-label'>
        {labelText}
      </label>}
      <input
        id={id}
        type={type}
        {...register(id, rules)}
        placeholder={placeholder}
        className={`form-control ${errors[id] && 'is-invalid'}`}
        value={value}
      />
      {errors[id] && (
        <div className='invalid-feedback'>{errors?.[id]?.message}</div>
      )}
    </div>

  )
}