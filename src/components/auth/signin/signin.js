import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clearError, login } from '../../../store/auth/authActions'
import AnimatedHoc from '../../generic/AnimatedHoc'
import Loader from '../../generic/loader'


const SignIn = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        return () => props.clearError()
    }, [])

    useEffect(() => {
        //console.log(props.auth.error)
        setMessage(props.auth.error)
    }, [props.auth.error])


    const loginHandler = (e) => {
        e.preventDefault()
        if(username.trim() === '' || password.trim() === ''){
            setMessage('username or password cannot be blank')
        }
        else 
            props.login({username, password})
    }

    if(props.auth.isLoggedIn)
        return <Redirect to="/dashboard" />
    
    return (
        <AnimatedHoc>
            <div className="container" style={{marginTop: '50px'}}>
                { props.auth.loading && <Loader type="linear" />}
                <div className="col s4"></div>
                    <div className="col s4">
                        <form>
                            <div className="input-field">
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={e => loginHandler(e)}>Sign In</button>
                        </form>
                    </div>
                <div className="col s4"></div>
                { message !== '' && <p style={{'color': 'red'}}><strong>{message}</strong></p> }
            </div>
        </AnimatedHoc>
    
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userData) => dispatch(login(userData)),
        clearError: () => dispatch(clearError())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
