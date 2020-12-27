import React from 'react'

const PostCard = (props) => {
    return (
            <div className="col s12 m6">
                <div className="card teal lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title"><strong>{props.title}</strong></span>
                        <p>{props.text.substring(0, 25) + "..."}</p>
                    </div>
                </div>
            </div>
    )
}

export default PostCard
