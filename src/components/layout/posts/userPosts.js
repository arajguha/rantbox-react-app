import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const UserPosts = (props) => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [unmounted, setUnmounted] = useState(false)

    useEffect(() => {
        console.log(props)
        if(!unmounted) {
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
        }
        return () => setUnmounted(true)
    }, [])


    const postsArray = posts.map(post => <PostCard key={post.id} id={post.id} title={post.title} text={post.text} />)
    return (
        <div className="container">
            { loading && <Loader type="linear" /> }
            {postsArray}
            <span className="waves-effect waves-light btn" onClick={() => history.goBack()}>
                <i className="material-icons left">chevron_left</i>
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(UserPosts)
