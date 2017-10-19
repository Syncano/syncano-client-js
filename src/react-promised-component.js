import React from 'react'

export default class ReactPromisedComponent extends React.Component {
  state = {
    component: null
  }

  componentWillMount() {
    const {url, name} = this.props._promise

    this._loadComponent(url).then(() =>
      this.setState({component: window.syncanoComponents[name]})
    )
  }

  _loadComponent = src =>
    new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })

  render() {
    return this.state.component
      ? React.createElement(this.state.component, {...this.props._props})
      : this.state.component
  }
}
