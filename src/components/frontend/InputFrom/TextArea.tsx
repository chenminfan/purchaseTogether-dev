
type TextAreaType = {
  id: string,
  labelText: string,
  rows: number,
  rules?;
  register;
  errors;
}

export default function TextArea(props: TextAreaType) {
  const { id, labelText, rows, rules, register, errors } = props;
  return (
    <div className='my-3'>
      <label htmlFor={id} className='form-label'>{labelText}</label>
      <textarea {...register(id, rules)} id={id} rows={rows} className={`form-control ${errors[id] && 'is-invalid'}`} />
      {errors[id] && (
        <div className='invalid-feedback'>{errors?.[id]?.message}</div>
      )}
    </div>

  )
}