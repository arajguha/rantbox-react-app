import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/layout/header/header'
import SignIn from './components/auth/signin/signin'
import SignUp from './components/auth/signup/signup'
import Dashboard from './components/layout/dashboard/dashboard'
import About from './components/layout/dashboard/about'
import CreatePost from './components/layout/posts/createPost'
import PostDetail from './components/layout/posts/postDetail'
import UserPosts from './components/layout/posts/userPosts'
import EditPost from './components/layout/posts/editPost'


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
          <Route path="/create-rant"><CreatePost /></Route>
          <Route path="/my-rants" component={UserPosts}></Route>
          <Route path="/post-detail/:id" component={PostDetail} ></Route>
          <Route path="/edit-post/:id" component={EditPost} ></Route>
        </Switch>
      </Router>
    </div>
  )
}


export default App
