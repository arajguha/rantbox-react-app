import React, { useState, useEffect } from 'react'
import { isEmpty } from '../../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import AnimatedHoc from '../../generic/AnimatedHoc'


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(err !== '')
            toast.error(err, {
                position: "top-center",
                autoClose: 5000,
            })
        return () => setErr('')
    }, [err])

    const handleSubmit = (e) => {
        e.preventDefault()
        const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

        const signUpData = { username, password, 'confirm_password': confirmPassword }

        if(isEmpty(username))
            setErr('Username cannot empty')
        
        else if(isEmpty(password) || isEmpty(confirmPassword))
            setErr('Password cannot empty')

        else if(password.trim() !== confirmPassword.trim())
            setErr('Passwords do not match')
        
        else if(username.trim().length < 3)
            setErr('Username should have atleast 3 characters')
        
        else if(!password.match(pwdRegex))
            setErr('Please follow password policy')
        
        else{
            setLoading(true)
            axios
                .post('http://localhost:8000/signup/', signUpData)
                .then(res => {
                    console.log(res)
                    setLoading(false)
                    setSuccess(true)
                })
                .catch(err => {
                    console.log(err.response.data.error_message)
                    setLoading(false)
                    setErr(err.response.data.error_message)
                })

        }
    }

    if(success) {
        return <Redirect to="/dashboard" />
    }

    return (
        <AnimatedHoc>
            <ToastContainer />
            <div className="container" style={{marginTop: '50px'}}>
                <div className="row">
                    <div className="col s12 m6">
                        <form>
                            <div className="input-field">
                                <label htmlFor="username">Username</label>
                                <input 
                                    id="username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input 
                                    id="password"
                                    type="password"  
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input 
                                    id="confirm_password"
                                    type="password" 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>Sign Up</button>
                        </form>
                    </div>
                    <div className="col s12 m6">        
                        <div className="card" style={{margin: '10px'}}>
                            <div className="card-content">
                                <span className="card-title">Password Policy</span>
                                <ol>
                                    <li>must be between 6 to 20 characters</li>
                                    <li>must contain contain at least one numeric digit</li>
                                    <li>must contain contain at least one uppercase</li>
                                    <li>must contain contain at least  one lowercase letter</li>
                                </ol>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </AnimatedHoc>
    )
}

export default SignUp
