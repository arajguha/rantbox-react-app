import React from 'react'


const SignIn = () => {
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

export default SignIn
