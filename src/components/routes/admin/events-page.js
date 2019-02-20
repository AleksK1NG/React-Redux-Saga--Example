import React from 'react'
import EventsTable from '../../events/virtualized-lazy-table'
import SelectedEventsList from '../../events/selected-events-list'

const EventsPage = () => {
  return (
    <div>
      <SelectedEventsList/>
      <EventsTable/>
    </div>
  )
}

export default EventsPage
