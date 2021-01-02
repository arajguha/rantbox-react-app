import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/layout/header/header'
import SignIn from './components/auth/signin/signin'
import SignUp from './components/auth/signup/signup'
import Dashboard from './components/layout/dashboard/dashboard'
import About from './components/layout/dashboard/about'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"><Redirect to="/dashboard" /></Route>
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/about"><About /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
