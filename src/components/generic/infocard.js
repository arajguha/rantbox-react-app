import React from 'react'
import { Link } from 'react-router-dom'

const InfoCard = (props) => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title"><strong>{props.title}</strong></span>
                        <p>{props.text}</p>
                    </div>
                    {
                        props.type !== 'error' &&
                        <div className="card-action">
                            <Link to="/signin">Log in</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default InfoCard
