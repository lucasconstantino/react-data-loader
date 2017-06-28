import React from 'react'
import { mount } from 'enzyme'
import { withDataLoader } from '../src/react-data-loader'

describe('withDataLoader', () => {
  const fetcher = jest.fn(() => 'Loaded data!')
  const loader = props => fetcher
  const errorLoader = jest.fn(props => e => { throw new Error('Some error') })

  const DataLoadingComponent = ({ data }) => (
    <div>
      { JSON.stringify(data) }
      <button onClick={ data.load }>Load</button>
    </div>
  )

  beforeEach(() => jest.clearAllMocks())

  it('should be a Higher-Order Component', () => {
    const connect = withDataLoader('data', loader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />)

    expect(build.find('button').length).toBe(1)
  })

  it('should match initial state', () => {
    const connect = withDataLoader('data', loader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />).find(DataLoadingComponent)

    const { data } = build.props()

    expect(data.data).toBeUndefined()
    expect(data.error).toBeNull()
    expect(data.loading).toBeFalsy()
    expect(data.requests).toBe(0)
    expect(data.promise).toBeNull()
    expect(data.load).toBeInstanceOf(Function)
  })

  it('should have loading flag truthy when loader is fired', () => {
    const connect = withDataLoader('data', loader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />).find(DataLoadingComponent)

    expect(build.props()).toHaveProperty('data.loading', false)
    build.find('button').simulate('click')
    expect(build.props()).toHaveProperty('data.loading', true)
  })

  it('should have loading flag falsy when loader is finished', async () => {
    const connect = withDataLoader('data', loader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />).find(DataLoadingComponent)

    expect(build.props()).toHaveProperty('data.loading', false)
    build.find('button').simulate('click')

    expect(build.props()).toHaveProperty('data.loading', true)
    await build.props().data.promise

    expect(build.props()).toHaveProperty('data.loading', false)
  })

  it('should fulfil data when loaded', async () => {
    const connect = withDataLoader('data', loader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />).find(DataLoadingComponent)

    expect(build.props()).toHaveProperty('data.data', undefined)

    build.find('button').simulate('click')
    await build.props().data.promise

    expect(build.props()).toHaveProperty('data.data', 'Loaded data!')
  })

  it('should fulfil error when failed', async () => {
    const connect = withDataLoader('data', errorLoader)
    const ConnectedComponent = connect(DataLoadingComponent)
    const build = mount(<ConnectedComponent />).find(DataLoadingComponent)

    expect(build.props()).toHaveProperty('data.data', undefined)

    build.find('button').simulate('click')
    try { await build.props().data.promise } catch (e) {}

    expect(build.props().data.error).toBeInstanceOf(Error)
  })
})
