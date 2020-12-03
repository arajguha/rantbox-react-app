import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [ posts, setPosts ] = useState([])
    const [ error, setError ] = useState('')

    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        axios
            .get(url)
            .then((posts) => setPosts(posts.data))
            .catch(err => setError(err))
    }, [])
    
    console.log(posts)
    return (
        <div>
            <p>Dashboard</p>
        </div>
    )
}

export default Dashboard
