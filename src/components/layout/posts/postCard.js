import React from 'react'

const PostCard = (props) => {
    return (
            <div className="col s12 m6">
                <div className="card teal lighten-5">
                    <div className="card-content">
                        <span className="card-title teal-text"><strong>{props.title}</strong></span>
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
