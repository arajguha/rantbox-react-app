import React, { useState, useEffect } from 'react'
import PostCard from '../posts/postCard'
import InfoCard from '../../generic/infocard'
import { connect } from 'react-redux'
import { fetchPosts } from '../../../store/posts/postActions'
import CreatePost from '../posts/createPost'
import Loader from '../../generic/loader'


const Dashboard = (props) => {
    const [posts, setPosts ] = useState([])
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(null)

    useEffect(() => {
        console.log('component did mount')
        if(props.auth.token){
            console.log('get request called')
            props.getPosts(props.auth.token)
        }
    }, [])

    useEffect(() => {
        if(props.posts.response.results) {
            setPosts(props.posts.response.results)
            setPrev(props.posts.response.previous)
            setNext(props.posts.response.next)
        }
    }, [props.posts])

    if(!props.auth.isLoggedIn) {
        return ( 
            <div className="container">
                <InfoCard title="Log In Required" text="Please log in to continue. If you are new you can sign up." /> 
            </div>
        )
    }    

    const postsArray = posts.map(post => <PostCard key={post.id} title={post.title} text={post.text} />)
    return (
        <>
            <CreatePost />
            { props.posts.loading && <Loader /> }
            <div className="row">
                <div className="col m7 s12">
                    <ul className="pagination">
                        { prev && <li className="waves-effect" onClick={() => props.getPosts(props.auth.token, prev)}><i className="material-icons">chevron_left</i></li> }
                        { next && <li className="waves-effect" onClick={() => props.getPosts(props.auth.token, next)}><a href="#!"><i className="material-icons">chevron_right</i></a></li> }
                    </ul>
                    {postsArray}
                </div>
                <div className="col m1 s12"></div>
                <div className="col m4 s12">
                    <div className="card-panel">
                        <span><strong>Featured Section</strong></span>
                    </div>
                </div>
            </div>
        </>
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
        getPosts: (token, url) => dispatch(fetchPosts(token, url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
