import React from 'react'
import { connect } from 'react-redux'
import { eventSelector } from '../../ducks/events'

const EventDragPreview = (props) => {
  return (
    <div>
      <h1>{props.event.title}</h1>
    </div>
  )
}

export default connect((state, props) => ({
  event: eventSelector(state, props)
}))(EventDragPreview)
