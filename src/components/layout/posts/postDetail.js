import React, { useState, useEffect} from 'react'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { feelingsDict } from '../../../utils/utils'
import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'


const PostDetail = (props) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [rantPost, setRantPost] = useState({})
    const [reacted, setReacted] = useState(false)
    const [reactorCount, setReactorCount] = useState(0)

    useEffect( () => {
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
            .get(`http://localhost:8000/rant-posts/${props.match.params.id}/`, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                const post = res.data
                post.created_on = res.data.created_on.split('T')[0]
                setRantPost(post)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setErr(err)
        })

        axios
            .get(`http://localhost:8000/rant-posts/reaction-status/${props.match.params.id}/`, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                setReactorCount(res.data.users_count)
                setReacted(res.data.self_reacted)
            })
            .catch(err => {
                console.log(err)
                setErr(err)
        })
        
    }, [])


    const handleReaction = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:8000/rant-posts/react/', { 'post_id': props.match.params.id }, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                console.log(res.data)
                setReacted(res.data.reaction_status)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            { loading && <Loader type='linear' />}
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col s10">
                        <div className="card">
                            <div className="card-content">
                                <div className="row">
                                    <div className="col s8 m10">
                                        <span className="card-title"><strong>{rantPost.title}</strong></span>
                                    </div>
                                    <div className="col s4 m2">
                                        <p><strong>{rantPost.created_on}</strong></p>
                                    </div>
                                </div>
                                <div className="chip">
                                    {feelingsDict[rantPost.feeling_level]}
                                </div>
                            </div>
                            <div className="card-content">
                                <p>{rantPost.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="waves-effect waves-light btn" onClick={handleReaction}>
                            <i className="material-icons left">thumb_up</i>{reacted ?  'Take Back Fuck' : 'Give a Fuck'}
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light" onClick={() => history.goBack()}>
                            <i className="material-icons left">chevron_left</i>
                        </a>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return  {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PostDetail)
