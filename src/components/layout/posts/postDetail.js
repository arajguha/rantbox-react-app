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
        console.log(props)

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
    }, [])

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
            
                <button className="waves-effect waves-light btn" onClick={() => history.goBack()}>
                    <i className="material-icons left">chevron_left</i>
                </button>
                
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
