import React, { useState, useEffect} from 'react'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const PostDetail = (props) => {
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

        axios
            .get(`http://localhost:8000/rant-posts/${props.match.params.id}/`, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                const post = res.data
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
                    <div className="col s11">
                        <div className="card">
                            <span className="card-title">{rantPost.title}</span>
                            <div className="card-content">
                                <p>{rantPost.text}</p>
                            </div>
                            <div className="card-content">
                                <p>{rantPost.feeling_level}</p>
                            </div>
                        </div>
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
