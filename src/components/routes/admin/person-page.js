import React from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../../ducks/people'
import NewPersonForm from '../../people/new-person-form'
import PeopleList from '../../people/people-list'
import SelectedEventsList from '../../events/selected-events-list'
import EventLazyTable from '../../events/virtualized-lazy-table'

const PersonPage = (props) => {
  return (
    <div>
      <h2>Add new person</h2>
      <SelectedEventsList />
      <PeopleList />
      <EventLazyTable />
      <NewPersonForm onSubmit={props.addPerson} />
    </div>
  )
}

export default connect(
  null,
  { addPerson }
)(PersonPage)
