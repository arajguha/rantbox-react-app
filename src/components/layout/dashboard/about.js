import React from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'


const About = () => {
    const props = useSpring({  config: { duration: 350 }, opacity: 1, from: {opacity: 0} })

    return (
        <animated.div className="container" style={props} >
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title"><strong>About RantBox</strong></span>
                            <p>RantBox is a platform for users to rant about anything anonymously. 
                                The platform allows users to create 
                                a rant, see what others are ranting about, etc.
                            </p>
                            <p>
                                No user information is tagged to any post. Users are also encouraged to not
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
                                Please note this is for fun and educational purposes only.
                                This project takes inspiration from <a href="https://foaas.herokuapp.com/" target="_blank">FOAAS</a>.
                                More features will be added on this platform incrementally.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </animated.div>
    )
}

//const About = animated(SimpleAbout)

export default About
