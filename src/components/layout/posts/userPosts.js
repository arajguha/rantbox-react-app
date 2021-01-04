import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'


const UserPosts = (props) => {
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:8000/rant-posts/my-rants/', {
                'headers': { 'Authorization': `Token ${props.auth.token}`}
            })
            .then((res) => {
                setPosts(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])


    const postsArray = posts.map(post => <PostCard key={post.id} id={post.id} title={post.title} text={post.text} />)
    return (
        <div className="container">
            { loading && <Loader type="linear" /> }
            {postsArray}
            <Link to="/dashboard">
                <button className="waves-effect waves-light btn" ><i className="material-icons left">chevron_left</i></button>
            </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(UserPosts)
