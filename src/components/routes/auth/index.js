import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../../auth/sign-in-form'
import SignUpForm from '../../auth/sign-up-form'
import { signIn, signUp } from '../../../ducks/auth'

const AuthPage = (props) => {
  const getSignInForm = () => <SignInForm onSubmit={handleSignIn} />
  const getSignUpForm = () => <SignUpForm onSubmit={handleSignUp} />

  const handleSignIn = ({ email, password }) =>
    props.signIn(email, password)
  const handleSignUp = ({ email, password }) =>
    props.signUp(email, password)

  return (
    <div>
      <h1>Auth Page</h1>
      <div>
        <NavLink to="/auth/sign-in">Sign In</NavLink>
      </div>
      <div>
        <NavLink to="/auth/sign-up">Sign Up</NavLink>
      </div>

      <Route path="/auth/sign-in" render={getSignInForm} />
      <Route path="/auth/sign-up" render={getSignUpForm} />
    </div>
  )
}

export default connect(
  null,
  { signIn, signUp }
)(AuthPage)
