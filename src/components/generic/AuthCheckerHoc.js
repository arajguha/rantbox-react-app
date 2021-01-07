import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const AuthCheckerHoc = (props) => {
    const history = useHistory()

    if(!props.auth.isLoggedIn)
        return <Redirect to="/dashboard" />
        
    return (
        <div>
            {props.children}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AuthCheckerHoc)
