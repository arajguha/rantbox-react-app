import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="container-fluid">
            <ul className="nav navbar-nav">
                <div className="navbar-header">
                    <div className="navbar-brand">RantBox</div>
                </div>
                <li role="presentation"><Link to="/dashboard">Dashboard</Link></li>
                <li role="presentation"><Link to="/rants">Your Rants</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li role="presentation"><Link to="/about">About</Link></li>
                <li role="presentation"><Link to="/signin">Sign in</Link></li>
                <li role="presentation"><Link to="/singup">Sign up</Link></li>
            </ul>
        </div>
    )
}

export default Header
