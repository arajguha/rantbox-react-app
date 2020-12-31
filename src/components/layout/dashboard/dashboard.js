import React, { useState, useEffect } from 'react'
import PostCard from '../posts/postCard'
import InfoCard from '../../generic/infocard'
import axios from 'axios'
import { connect } from 'react-redux'

const Dashboard = (props) => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/rant-posts/')
            .then(json => json.data)
            .then(data => setPosts(data.results))
            .catch(err => console.log(err.message))
    }, [])

    if(!props.auth.isLoggedIn) 
        return <InfoCard text="Please log in to continue" />

    const postsArray = posts.map(post => <PostCard key={post.id} title={post.title} text={post.text} />)
    return (
        <div className="row">
            {postsArray}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Dashboard)
