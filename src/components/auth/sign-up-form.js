import React from 'react'
import { reduxForm, Field } from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/error-field'

const SignUpForm = ({ handleSubmit }) => {
  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <Field name="email" component={ErrorField} label="Email" />
        <Field
          name="password"
          type="password"
          component={ErrorField}
          label="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

const validate = ({ email, password }) => {
  const errors = {}
  if (!email) errors.email = 'Email is required'
  else if (!validator.validate(email)) errors.email = 'Invalid email'

  if (!password) errors.password = 'Password is required'
  else if (password.length < 8) errors.password = 'Password is too short'

  return errors
}

export default reduxForm({
  form: 'sign-up',
  validate
})(SignUpForm)
