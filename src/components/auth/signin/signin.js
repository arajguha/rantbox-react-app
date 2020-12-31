import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const SignIn = (props) => {
    if(props.auth.isLoggedIn)
        return (
            <Route path="/">
                <Redirect to="/about" />
            </Route>
        )
    return (
        
        <div className="container" style={{marginTop: '50px'}}>
            <div className="col s2"></div>
                <div className="col s8">
                    <form>
                        <div className="input-field">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            <div className="col s2"></div>
        </div>
    
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(SignIn)
