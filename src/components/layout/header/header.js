import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/rants">Your Rants</Link></li>
                            <li><Link to="/about">About</Link></li>
                            { !this.props.auth.isLoggedIn &&  <li><Link to="/signin">Sign In</Link></li> }
                            { !this.props.auth.isLoggedIn && <li><Link to="/signup">Sign up</Link></li> }
                            { this.props.auth.isLoggedIn && <li><Link to="/signin" onClick={this.props.logout}>Logout</Link></li> }
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav teal lighten-4">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/rants">Your Rants</Link></li>
                    <li><Link to="/about">About</Link></li>
                    { !this.props.auth.isLoggedIn &&  <li><Link to="/signin">Sign In</Link></li> }
                    { !this.props.auth.isLoggedIn && <li><Link to="/signup">Sign up</Link></li> }
                    { this.props.auth.isLoggedIn && <li><Link to="/signin" onClick={this.props.logout}>Logout</Link></li> }
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