import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  loadedSelector,
  fetchLazy,
  eventListSelector,
  toggleSelection
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import TableRow from './table-row'

export const EventLazyTable = (props) => {
  const { loaded, events } = props
  const getRowRenderer = (rowCtx) => <TableRow {...rowCtx} />
  const isRowLoaded = ({ index }) => index < props.events.length
  const loadMoreRows = () => {
    props.fetchLazy()
  }
  const rowGetter = ({ index }) => props.events[index]
  const handleSelect = ({ rowData }) => props.toggleSelection(rowData.id)

  useEffect(() => {
    props.fetchLazy()
  }, [])

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      rowCount={loaded ? events.length : events.length + 1}
      loadMoreRows={loadMoreRows}
    >
      {({ onRowsRendered, registerChild }) => (
        <Table
          ref={registerChild}
          rowCount={events.length}
          rowGetter={rowGetter}
          rowHeight={40}
          headerHeight={50}
          overscanRowCount={1}
          width={600}
          height={300}
          onRowClick={handleSelect}
          onRowsRendered={onRowsRendered}
          rowRenderer={getRowRenderer}
          rowClassName="test__event_table_row"
        >
          <Column dataKey="title" width={200} label="Title" />
          <Column dataKey="where" width={200} label="Place" />
          <Column dataKey="when" width={200} label="When" />
        </Table>
      )}
    </InfiniteLoader>
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, toggleSelection }
)(EventLazyTable)
