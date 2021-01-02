import React from 'react'

const PostCard = (props) => {
    return (
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title"><strong>{props.title}</strong></span>
                        <p>{props.text.substring(0, 25) + "..."}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" className="teal-text">view</a>
                    </div>
                </div>
            </div>
    )
}

export default PostCard
