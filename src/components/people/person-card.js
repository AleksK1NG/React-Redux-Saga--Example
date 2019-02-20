import React, { useEffect } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-drag-preview'

const PersonCard = (props) => {
  const { person, dragSource, isDragging } = props

  useEffect(() => {
    props.dragPreview(getEmptyImage())
  }, [])

  const style = {
    opacity: isDragging ? 0.3 : 1
  }
  return dragSource(
    <div style={style}>
      <h3>{person.email}</h3>
      <section>{person.firstName}</section>
    </div>
  )
}

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('person', spec, collect)(PersonCard)
