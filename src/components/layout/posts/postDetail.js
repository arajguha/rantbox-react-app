import React, { useState, useEffect} from 'react'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import { instance as axios } from '../../../api/rantbox.instance'
import { ToastContainer, toast } from 'react-toastify'
import { feelingsDict } from '../../../utils/utils'
import { Redirect, useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import AuthCheckerHoc from '../../generic/AuthCheckerHoc'
import DeleteModal from '../../generic/DeleteModal'


const PostDetail = (props) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [rantPost, setRantPost] = useState({})
    const [reacted, setReacted] = useState(false)
    const [reactorCount, setReactorCount] = useState(0)
    const [postDeleted, setPostDeleted] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [feelingsDict, setFeelingsDict] = useState(new Map())


    useEffect(() => {
        axios
            .get('rant-posts/feelings/', {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                const map = new Map()
                for(let tuple of res.data) 
                    map.set(tuple[0], tuple[1])
                
                setFeelingsDict(map)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])
    
    useEffect( () => {
        if(err !== '') {
            console.log('error notification triggered')
            toast.error(err.message, {
                position: "top-center",
                autoClose: 2000,
            })
        }
        return () => setErr('')
    }, [err])


    useEffect( () => {
        console.log('edit mode set')
        
    }, [editMode])


    useEffect(() => {
        if(props.auth.isLoggedIn) {
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
        }
        
    }, [])


    const handleReaction = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:8000/rant-posts/react/', { 'post_id': props.match.params.id }, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                //console.log(res.data)
                setReacted(res.data.reaction_status)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = () => {
        setPostDeleted(true)
        console.log('delete handler called')
    }

    const deleteErrorHandler = (err) => {
        setErr(err)
        console.log(err)
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    if(postDeleted)
        return <Redirect to="/my-rants" />
    
    if(editMode)
        return <Redirect to={`/edit-post/${props.match.params.id}`} />


    return (
        <div id="main">
            <DeleteModal 
                token={props.auth.token}
                postid={props.match.params.id} 
                deleteHandler={handleDelete} 
                deleteErrorHandler={deleteErrorHandler}
            />

            <AuthCheckerHoc>
                { loading && <Loader type='linear' />}
                <ToastContainer />
                
                <div className="container">
                    <div className="row">
                        <div className="col s10">
                            { reacted && <p><strong>Seems like you gave a fuck</strong></p> }
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
                                        {feelingsDict.get(rantPost.feeling_level)}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p>{rantPost.text}</p>
                                </div>
                                <div className="card-action">
                                    { props.auth.userid === rantPost.author &&
                                        <div>
                                            <button className="btn-small btn-floating modal-trigger red"
                                                data-target="modal1"
                                                style={{ margin: '5px' }}
                                            >
                                                <i className="material-icons left">delete</i>
                                            </button>
                                            
                                            <button className="btn-small btn-floating"
                                                style={{ margin: '5px' }}
                                                onClick={handleEdit}
                                            >
                                                <i className="material-icons left">edit</i>
                                            </button>

                                        </div>
                                    }    
                                    
                                </div>
                                
                            </div>
                            <button className="btn-small" onClick={handleReaction}>
                                <i className="material-icons left">thumb_up</i>{reacted ?  'Take Back Fuck' : 'Give a Fuck'}
                            </button>
                        </div>
                        <div className="col 4">
                            <p><strong>So far, {reactorCount} user(s) gave a fuck.</strong></p>
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
            </AuthCheckerHoc>
        </div>
    )
}

const mapStateToProps = state => {
    return  {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PostDetail)
