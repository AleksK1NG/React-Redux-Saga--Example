import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {
  fetchAllEvents,
  toggleSelection,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export const VirtualizedEventsTable = (props) => {
  const { loading, events } = this.props
  const rowGetter = ({ index }) => props.events[index]
  const handleClick = ({ rowData }) => props.toggleSelection(rowData.id)

  useEffect(() => {
    props.fetchAllEvents()
  }, [])

  if (loading) return <Loader />
  return (
    <Table
      width={600}
      height={500}
      rowHeight={40}
      headerHeight={60}
      overscanRowCount={5}
      rowCount={events.length}
      rowGetter={rowGetter}
      onRowClick={handleClick}
    >
      <Column dataKey="title" label="Title" width={300} />
      <Column dataKey="where" label="Where" width={300} />
      <Column dataKey="when" label="When" width={300} />
    </Table>
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, toggleSelection }
)(VirtualizedEventsTable)
