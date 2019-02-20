import React from 'react'

const ErrorField = ({ input, meta: { error, touched }, type, label }) => {
  const errorText = error && touched && (
    <div style={{ color: 'red' }}>{error}</div>
  )
  return (
    <div>
      <div>{label}</div>
      <div>
        <input {...input} type={type} />
      </div>
      {errorText}
    </div>
  )
}

export default ErrorField
