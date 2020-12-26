import React from 'react'


const SignIn = () => {
    return (
        <div className="container" style={{marginTop: '50px'}}>
            <div className="col-xs-2"></div>
            <div className="col-xs-8">
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Sign In</button>
                </form>
            </div>
            <div className="col-xs-2"></div>
        </div>
    )
}

export default SignIn
