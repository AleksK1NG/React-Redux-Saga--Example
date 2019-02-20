import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import {
  put,
  call,
  all,
  takeEvery,
  fork,
  delay,
  cancel,
  cancelled,
  spawn,
  take,
  race
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { fbToEntities } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const UPDATE = `${prefix}/UPDATE`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap({})
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_SUCCESS:
    case UPDATE:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.id])

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

const idSelector = (_, { id }) => id

export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.getIn(['entities', id])
)

export const peopleByIdsSelector = (state, ids) =>
  ids.map((id) => stateSelector(state).getIn(['entities', id])).filter(Boolean)

/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

export function fetchAllPeople() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { id }
  }
}

/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START,
    payload: { ...action.payload.person }
  })

  const { id } = yield call(api.addPerson, action.payload.person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { id, ...action.payload.person }
  })

  yield put(reset('person'))
}

export function* fetchAllSaga() {
  try {
    const data = yield call(api.loadAllPeople)

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data
    })
  } catch (_) {}
}

export function* deletePersonSaga({ payload }) {
  try {
    yield call(api.deletePerson, payload.id)

    yield put({
      type: DELETE_PERSON_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* syncPeopleWithPolling() {
  while (true) {
    yield fork(fetchAllSaga)
    yield delay(2000)
    throw new Error('Error message')
  }
}

export function* cancelableSyncSaga() {
  yield race({
    sync: syncPeopleWithPolling(),
    timeout: delay(5000)
  })
}

const createChannel = () => eventChannel((emit) => api.subscribeForPeople(emit))

export function* syncPeopleSaga() {
  const channel = yield call(createChannel)
  while (true) {
    const data = yield take(channel)

    yield put({
      type: UPDATE,
      payload: data
    })
  }
}

export function* saga() {
  yield spawn(syncPeopleSaga)

  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
