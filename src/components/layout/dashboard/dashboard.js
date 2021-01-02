import React, { useState, useEffect } from 'react'
import PostCard from '../posts/postCard'
import InfoCard from '../../generic/infocard'
import { connect } from 'react-redux'
import { fetchPosts } from '../../../store/posts/postActions'
import axios from 'axios'


const Dashboard = (props) => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        console.log('component did mount')
        if(props.auth.token)
            props.getPosts(props.auth.token)
    }, [])

    useEffect(() => {
        console.log('posts array set')
        setPosts(props.posts.postsArray)
    }, [props.posts.postsArray])


    const postsArray = posts.map(post => <PostCard key={post.id} title={post.title} text={post.text} />)
    return (
        <div className="row">
            { !props.auth.isLoggedIn && <InfoCard title="Log In Required" text="Please log in to continue. If you are new you can sign up." /> }
            {postsArray}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (token) => dispatch(fetchPosts(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
