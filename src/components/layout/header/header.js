import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../store/auth/authActions'


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
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            { this.props.auth.isLoggedIn && <li><NavLink to="/rants">Your Rants</NavLink></li> } 
                            <li><NavLink to="/about">About</NavLink></li>
                            { !this.props.auth.isLoggedIn &&  <li><NavLink to="/signin">Sign In</NavLink></li> }
                            { !this.props.auth.isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li> }
                            { this.props.auth.isLoggedIn && <li><NavLink to="/signin" onClick={this.props.logout}>Logout</NavLink></li> }
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    { this.props.auth.isLoggedIn && <li><NavLink to="/rants">Your Rants</NavLink></li> }
                    <li><NavLink to="/about">About</NavLink></li>
                    { !this.props.auth.isLoggedIn &&  <li><NavLink to="/signin">Sign In</NavLink></li> }
                    { !this.props.auth.isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li> }
                    { this.props.auth.isLoggedIn && <li><NavLink to="/signin" onClick={this.props.logout}>Logout</NavLink></li> }
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)