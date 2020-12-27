import React from 'react'

const PostCard = (props) => {
    return (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{props.title}</span>
                        <p>{props.text.substring(0, 25) + "..."}</p>
                    </div>
                </div>
            </div>
    )
}

export default PostCard
