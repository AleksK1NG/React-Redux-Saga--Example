import React from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import EventsPage from './events-page'
import Trash from '../../common/trash'

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <Trash />
      <Route path="/admin/people" component={PersonPage} />
      <Route path="/admin/events" component={EventsPage} />
    </div>
  )
}

export default AdminPage
