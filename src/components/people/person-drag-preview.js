import React from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

const PersonDragPreview = (props) => {
  return (
    <div>
      <h2>{props.person.email}</h2>
    </div>
  )
}

export default connect((state, props) => ({
  person: personSelector(state, props)
}))(PersonDragPreview)
