import { createElement, Component } from 'react'

const toPromise = fn => async (...args) => fn(...args)

/**
 * withDataLoader HoC factory.
 *
 * @param {String} prop Property to be used as data and status holder.
 * @param {Function} loader Data loader resolver. Will be called with props as single
 *                          argument and should return a data loader function.
 *
 * @return HoC.
 */
export const withDataLoader = (prop, loader) => component => class Requester extends Component {
  state = {
    data: undefined,
    loading: false,
    error: null,
    requests: 0,
    promise: null,
  }

  load = (...args) => {
    const promise = toPromise(loader(this.props))(...args)
    const requests = this.state.requests + 1

    this.setState({
      loading: true,
      requests,
      promise,
    })

    promise.then(data => this.state.requests !== requests ? null : this.setState({
      data,
      loading: false
    }))

    promise.catch(error => this.state.requests !== requests ? null : this.setState({
      error,
      loading: false
    }))

    return promise
  }

  render () {
    return createElement(
      component,
      { ...this.props, [prop]: { ...this.state, load: this.load } }
    )
  }
}
