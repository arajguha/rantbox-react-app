import React, { useState, useEffect } from 'react'
import PostCard from '../posts/postCard'
import { connect } from 'react-redux'
import { fetchPosts } from '../../../store/posts/postActions'
import { Link } from 'react-router-dom'
import Loader from '../../generic/loader'
import AnimatedHoc from '../../generic/AnimatedHoc'
import 'materialize-css/dist/css/materialize.min.css'


const Dashboard = (props) => {
    const [posts, setPosts ] = useState([])
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(null)

    useEffect(() => {
        if(props.auth.token){
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
            <AnimatedHoc>
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title"><strong>Log In Required</strong></span>
                                    <p>Please log in to continue. If you are new you can sign up.</p>
                                </div>
                                {
                                    props.type !== 'error' &&
                                    <div className="card-action">
                                        <Link to="/signin"><strong>Log in</strong></Link>
                                        <Link to="/signup"><strong>Sign Up</strong></Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedHoc>
        )
    }    

    const postsArray = posts.map(post => <PostCard key={post.id} id={post.id} title={post.title} text={post.text} userid={post.author} />)
    return (
        <AnimatedHoc>  
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title"><strong>Want to create your own rant ?</strong></span>
                            <Link to="create-rant/"><strong>Yes Please</strong></Link>
                        </div>
                    </div>
                </div>
             </div>
            <div className="row">
                <div className="col m7 s12">
                    <ul className="pagination">
                        
                            {/*<button className="btn btn-info waves-effect" onClick={() => props.getPosts(props.auth.token, prev)} disabled={!prev}>
                                    <i className="material-icons">chevron_left</i>
                            </button> */}
                            <button className="btn-small" 
                                onClick={() => props.getPosts(props.auth.token, prev)}
                                disabled={!prev}>
                                <i className="material-icons">chevron_left</i>
                            </button>
                            <button className="btn-small" 
                                onClick={() => props.getPosts(props.auth.token, next)}
                                disabled={!next}>
                                <i className="material-icons">chevron_right</i>
                            </button>
                    </ul>
                    <h5 className="teal-text"><strong>See what others are ranting about</strong></h5>
                    { props.posts.loading && <Loader /> }
                    {postsArray}
                </div>
                <div className="col m1 s12"></div>
                <div className="col m4 s12">
                    <div className="card-panel">
                        <span><strong>Featured Section</strong></span>
                    </div>
                </div>
            </div>
        </AnimatedHoc>
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
