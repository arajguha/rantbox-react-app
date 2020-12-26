import React, { useState } from 'react'
import { isEmpty } from '../../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
        
        console.log(signUpData)
    }

    return (
        <>
            <ToastContainer />
            <div className="container" style={{marginTop: '50px'}}>
                <div className="col-xs-2"></div>
                <div className="col-xs-8">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Confirm Password" 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
                    </form>
                </div>
                <div className="col-xs-2"></div>
            </div>
        </>
    )
}

export default SignUp
