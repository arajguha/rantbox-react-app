import React from 'react'
import { Link } from 'react-router-dom'


const About = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title"><strong>About RantBox</strong></span>
                            <p>RantBox is a platform for users to rant about anything anonymously. The platform allows users can create a rant,
                                see what others are ranting about, etc.
                            </p>
                            <p>
                                No user information is tagged to any post. We also encourage users to not
                                share any kind of personal information anywhere in the platform, 
                                including the signup.
                            </p>
                        </div>
                        <div className="card-action">
                            <Link to="/dashboard"><strong>Get Started</strong></Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <span className="card-title"><strong>Disclaimer</strong></span>
                            <p>
                                Please note this is for fun and educational purposes only. More features will be added incrementally.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About
