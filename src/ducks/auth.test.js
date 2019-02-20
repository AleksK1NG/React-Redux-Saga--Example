import reducer, {
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  ReducerRecord,
  SIGN_UP_ERROR,
  SIGN_IN_LIMIT_REACHED,
  SIGN_IN_ERROR
} from './auth'
import { call, put, take } from 'redux-saga/effects'
import api from '../services/api'

/**
 * Saga tests
 * */

describe('Auth', () => {
  it('should sign up', () => {
    const authData = {
      email: 'alex@example.com',
      password: '12345678'
    }

    const user = {
      email: authData.email,
      uid: Math.random().toString()
    }

    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData
    }

    const saga = signUpSaga(requestAction)

    expect(saga.next().value).toEqual(
      call(api.signUp, authData.email, authData.password)
    )

    expect(saga.next(user).value).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })

  it('should dispatch an error on sign up', () => {
    const authData = {
      email: 'alex@example.com',
      password: '12345678'
    }

    const user = {
      email: authData.email,
      uid: Math.random().toString()
    }

    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData
    }

    const saga = signUpSaga(requestAction)

    expect(saga.next().value).toEqual(
      call(api.signUp, authData.email, authData.password)
    )

    const error = new Error('some err')

    expect(saga.throw(error).value).toEqual(put({ type: SIGN_UP_ERROR, error }))
  })

  it('should sign in', () => {
    const authData = {
      email: 'alex@example.com',
      password: '12345678'
    }

    const requestAction = {
      type: SIGN_IN_REQUEST,
      payload: authData
    }

    const saga = signInSaga()

    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(saga.next(requestAction).value).toEqual(
      call(api.signIn, authData.email, authData.password)
    )
  })

  it('should limit sign in tries', () => {
    const authData = {
      email: 'alex@example.com',
      password: '12345678'
    }

    const requestAction = {
      type: SIGN_IN_REQUEST,
      payload: authData
    }

    const saga = signInSaga()

    for (let i = 0; i < 3; i++) {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(saga.next(requestAction).value).toEqual(
        call(api.signIn, authData.email, authData.password)
      )
      const error = new Error('dummy error')

      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    }

    expect(saga.next().value).toEqual(
      put({
        type: SIGN_IN_LIMIT_REACHED
      })
    )
  })

  /**
   * Reducer Tests
   * */

  it('should sign in', () => {
    const state = new ReducerRecord()
    const user = {
      email: 'alex@example.com',
      uid: Math.random().toString()
    }

    const newState = reducer(state, {
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })

    expect(newState).toEqual(new ReducerRecord({ user }))
  })
})
