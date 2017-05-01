import React, { Component } from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } fro 'redux-logger'

import ChatUI from './components/ChatUI'
import LoginUI from './components/LoginUI'
import rootReducer from './reducers'
import { fetchMessages, checkUserExists } from './actions'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const LoginOrChat = connect(
  (state) => ({
    authorized: state.user.authorized
  })
)(({ authorized }) => {
  if(authorized) {
    return (<ChatUI />)
  } else {
    return <LoginUI />
  }
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginOrChat />
      </Provider>
    )
  }
}
