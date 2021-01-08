import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const PostCard = (props) => {
    return (
            <div className="col s12 m12">
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col m6">
                                <span className="card-title"><strong>{props.title}</strong></span>
                            </div>
                            <div className="col m3"></div>
                            { props.auth.userid === props.userid && <div className="col m3">
                                <div className="chip">
                                    Your rant
                                </div>
                            </div>}
                        </div>
                        <p>{props.text.substring(0, 25) + "..."}</p>
                    </div>
                    <div className="card-action">
                        <span className="teal-text"><Link to={`/post-detail/${props.id}`}><strong>view</strong></Link></span>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PostCard)