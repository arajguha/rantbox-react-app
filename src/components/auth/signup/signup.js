import React, { useState } from 'react'
import { isEmpty } from '../../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const signUpData = { username, password, confirmPassword }

        if(isEmpty(username))
            toast.error('Username cannot empty', {
                position: "top-center",
                autoClose: 2000,
            })
        
        else if(isEmpty(password) || isEmpty(confirmPassword))
            toast.error('Password cannot empty', {
                position: "top-center",
                autoClose: 2000,
            })
        else if(password.trim() !== confirmPassword.trim()) {
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 2000,
            })
        }
        
        else{
            console.log(signUpData)
            setFormSubmitted(true)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container" style={{marginTop: '50px'}}>
                <div className="col s2"></div>
                <div className="col s8">
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
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={formSubmitted}>Sign Up</button>
                    </form>
                </div>
                <div className="col s2"></div>
            </div>
        </>
    )
}

export default SignUp
