import React, { useEffect } from 'react'
import PersonCard from './person-card'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'

const PeopleList = (props) => {
  useEffect(() => {
    props.fetchAllPeople()
  }, [])

  return (
    <div>
      {props.people.map((person) => (
        <PersonCard person={person} key={person.id} />
      ))}
    </div>
  )
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
