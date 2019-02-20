import React from 'react'

const EventTableRow = ({ event, onClick }) => {
  return (
    <tr className="test__events-table--item" onClick={onClick}>
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )
}

export default EventTableRow
