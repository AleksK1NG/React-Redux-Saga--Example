import React from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

const SelectedEventsList = (props) => {
  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <SelectedEventCard event={props.events[index]} />
    </div>
  )
  return (
    <List
      width={400}
      height={300}
      rowCount={props.events.length}
      rowHeight={150}
      rowRenderer={rowRenderer}
      data={props.events}
    />
  )
}

export default connect((state) => {
  return {
    events: selectedEventsSelector(state)
  }
})(SelectedEventsList)
