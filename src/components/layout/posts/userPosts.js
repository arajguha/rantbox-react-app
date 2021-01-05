import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'


const UserPosts = (props) => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    
    useEffect(() => {
        if(err !== '') {
            console.log('error notification triggered')
            toast.error(err.message, {
                position: "top-center",
                autoClose: 2000,
            })
        }
    }, [err])

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
                setErr(err)
                setLoading(false)
            })
    
    }, [])

    if(posts.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title"><strong>Oops Your rantbox is empty.</strong></span>
                                <Link to="create-rant/"><strong>start creating Rants</strong></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="waves-effect waves-light btn" onClick={() => history.goBack()}>
                    <i className="material-icons left">chevron_left</i>
                </span>
            </div>
        )
    }

    const postsArray = posts.map(post => <PostCard key={post.id} id={post.id} title={post.title} text={post.text} />)
    return (
        <div className="container">
            <ToastContainer />
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
