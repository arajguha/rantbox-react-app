import React from 'react'
import { Link } from 'react-router-dom'

const InfoCard = (props) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title"><strong>Log In Required</strong></span>
                        <p>Please log in to continue. If you are new you can sign up.</p>
                    </div>
                    <div className="card-action">
                        <Link to="/signin">Log in</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
