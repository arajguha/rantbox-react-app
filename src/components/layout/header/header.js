import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <nav className="nav-extended teal darken-4">
            <div className="nav-wrapper">
            <li className="brand-logo hide-on-med-and-down"><Link to="/dashboard">RantBox</Link></li>
            <ul id="nav-mobile" className="right">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/rants">Your Rants</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
            </div>
        </nav>
        </>
    )
}

export default Header
