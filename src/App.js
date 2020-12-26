import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/layout/header/header'
import SignIn from './components/auth/signin/signin'
import SignUp from './components/auth/signup/signup'
import Dashboard from './components/layout/dashboard/dashboard'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/signup"><SignUp /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
