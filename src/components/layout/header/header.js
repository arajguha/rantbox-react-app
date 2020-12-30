import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

    componentDidMount() {
        const M = window.M
        document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.sidenav')
            const instances = M.Sidenav.init(elems, {})
          })
    }

    render() {
        return (
            <> 
                <nav>
                    <div className="nav-wrapper teal darken-4">
                        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <a href="#" className="brand-logo">RantBox</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/rants">Your Rants</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav teal lighten-4">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/rants">Your Rants</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                </ul>
            
            </>
        )
    }
}

export default Header

/*
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
*/