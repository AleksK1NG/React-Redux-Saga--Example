import React, { useEffect } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { defaultTableRowRenderer } from 'react-virtualized'
import DragPreview from './event-drag-preview'

const TableRow = (props) => {
  const { connectDragSource, ...rest } = props

  useEffect(() => {
    props.connectPreview(getEmptyImage())
  }, [])

  return connectDragSource(defaultTableRowRenderer(rest))
}

const spec = {
  beginDrag(props) {
    return {
      id: props.rowData.id,
      DragPreview
    }
  }
}

const collect = (connect) => ({
  connectDragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(TableRow)
