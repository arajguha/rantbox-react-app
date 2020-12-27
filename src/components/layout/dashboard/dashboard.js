import React, { useState, useEffect } from 'react'
import PostCard from '../posts/postCard'
import axios from 'axios'

const Dashboard = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/rant-posts/')
            .then(json => json.data)
            .then(data => setPosts(data.results))
            .catch(err => console.log(err))
    }, [])

    const postsArray = posts.map(post => <PostCard key={post.id} title={post.title} text={post.text} />)
    return (
        <div className="row">
            {postsArray}
        </div>
    )
}

export default Dashboard
