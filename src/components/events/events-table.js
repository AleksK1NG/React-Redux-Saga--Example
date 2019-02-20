import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllEvents,
  toggleSelection,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import EventTableRow from './event-table-row'

export const EventsTable = (props) => {
  const handleClick = (event) => () => props.toggleSelection(event.id)
  const getRow = (event) => (
    <EventTableRow key={event.id} event={event} onClick={handleClick(event)} />
  )
  const getRows = () => props.events.map(getRow)

  useEffect(() => {
    props.fetchAllEvents()
  }, [])

  if (props.loading) return <Loader />
  return (
    <table>
      <tbody>{getRows()}</tbody>
    </table>
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, toggleSelection }
)(EventsTable)
