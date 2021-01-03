import React from 'react'
import { Link } from 'react-router-dom' 


const PostCard = (props) => {
    return (
            <div className="col s12 m12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title"><strong>{props.title}</strong></span>
                        <p>{props.text.substring(0, 25) + "..."}</p>
                    </div>
                    <div className="card-action">
                        <span className="teal-text"><Link to={`/post-detail/${props.id}`}>view</Link></span>
                    </div>
                </div>
            </div>
    )
}

export default PostCard
