import React from 'react'
import { reduxForm, Field } from 'redux-form'
import validateEmail from 'email-validator'
import ErrorField from '../common/error-field'

const NewPersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Field name="firstName" label="first name" component={ErrorField} />
        <Field name="lastName" label="last name" component={ErrorField} />
        <Field name="email" label="email" component={ErrorField} />
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

function validate({ firstName, email }) {
  const errors = {}
  if (!firstName) errors.firstName = 'first name is required'

  if (!email) errors.email = 'email is required'
  else if (!validateEmail.validate(email)) errors.email = 'email is invalid'

  return errors
}

export default reduxForm({
  form: 'person',
  validate
})(NewPersonForm)
