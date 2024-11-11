
type TextAreaType = {
  id: string,
  labelText: string,
  type: string,
  rules?;
  register;
  errors;
}

export default function TextArea(props: TextAreaType) {
  const { id, labelText, type, rules, register, errors } = props;
  return (
    <div className='my-3'>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, rules)}
        className={`form-control ${errors[id] && 'is-invalid'}`}
      />
      {errors[id] && (
        <div className='invalid-feedback'>{errors?.[id]?.message}</div>
      )}
    </div>

  )
}