import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { EventsTable } from './events-table'
import Loader from '../common/loader'
import events from '../../mocks/conferences'
const eventList = events.map((event, id) => ({ ...event, id }))

describe('EventsTable', () => {
  it('should render Loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render a list of rows', () => {
    const container = render(<EventsTable events={eventList} />, {
      disableLifecycleMethods: true
    })

    expect(container.find('.test__events-table--item').length).toBe(
      eventList.length
    )
  })

  it('should fetch all events', () => {
    const fn = jest.fn()
    shallow(<EventsTable events={[]} fetchAllEvents={fn} />)

    expect(fn.mock.calls.length).toBe(0)
  })

  it('should select an event', () => {
    const fn = jest.fn()

    const container = mount(
      <EventsTable
        events={eventList}
        fetchAllEvents={() => {}}
        toggleSelection={fn}
      />
    )

    container
      .find('.test__events-table--item')
      .at(0)
      .simulate('click')

    expect(fn).toBeCalledWith(eventList[0].id)
  })
})
