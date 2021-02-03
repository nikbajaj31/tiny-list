import React from 'react'
import { Provider } from 'react-redux'
import store from './redux-saga/store'
import TinyList from './containers/tinylist'
import Header from './components/header'

function App() {
  return (
    <Provider store={store}>
      <>
        <Header />
        <TinyList />
      </>
    </Provider>
  )
}

export default App
