import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header/header'
import SignIn from './components/layout/auth/signin/singin'
import Dashboard from './components/layout/dashboard/dashboard'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/signin"><SignIn /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
