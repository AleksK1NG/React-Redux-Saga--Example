import React, { useEffect } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import { peopleByIdsSelector } from '../../ducks/people'
import DragPreview from './event-drag-preview'

const SelectedEventCard = (props) => {
  const { event, dropTarget, dragSource, canDrop, isOver } = props
  const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

  const getPeopleList = () => {
    return <h4>{props.people.map((person) => person.email).join('; ')}</h4>
  }

  useEffect(() => {
    props.connectPreview(getEmptyImage())
  }, [])

  return dragSource(
    dropTarget(
      <div
        style={{
          width: 400,
          height: 150,
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box'
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
        {getPeopleList()}
      </div>
    )
  )
}

const dropSpec = {
  drop(props, monitor) {
    props.addPersonToEvent(monitor.getItem().id, props.event.id)
  }
}

const dropCollect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

const dragSpec = {
  beginDrag(props) {
    return {
      id: props.event.id,
      DragPreview
    }
  }
}

const dragCollect = (connect) => ({
  dragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default connect(
  (state, { event }) => ({
    people: peopleByIdsSelector(state, event.peopleIds)
  }),
  { addPersonToEvent }
)(
  DropTarget(['person'], dropSpec, dropCollect)(
    DragSource('event', dragSpec, dragCollect)(SelectedEventCard)
  )
)
