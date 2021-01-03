import React, { useState, useEffect } from 'react'
import { isEmpty } from '../../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../generic/loader'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

 
const CreatePost = (props) => {
    const [title, setTitle] = useState('')
    const [feeling, setFeeling] = useState('')
    const [body, setBody] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false)
 
    useEffect(() => {
        if(!isEmpty(message))
            toast.error(message, {
                position: "top-center",
                autoClose: 2000,
            })
    }, [message])


    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            'title': title,
            'text': body,
            'feeling_level': feeling
        }

        if(isEmpty(title) || isEmpty(body) || isEmpty(feeling)) {
            toast.error('Fields cannot be empty', {
                position: "top-center",
                autoClose: 2000,
            })
            return
        }

        console.log(postData)
        
        setLoading(true)
        axios
            .post('http://localhost:8000/rant-posts/', postData, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                console.log(res)
                setMessage(res.statusText)
                setCreated(true)
            })
            .catch(err => {
                console.log(err.response)
                setMessage(err.message)
            })

        setLoading(false)
        setTitle('')
        setBody('')
        setFeeling('')
    }

    if(!props.auth.isLoggedIn)
        return <Redirect to="/dashboard" />

    if(created) {
        console.log('created')
        return <Redirect to="/rants" />
    }

    return (
        <>  
            { loading && <Loader type="linear" />}
            <ToastContainer />
            <div className="container" style={{'marginTop': '30px', 'marginBottom': '30px'}}>
                <div className="card">
                    <form className="col s12">
                        
                        <div className="card-content">
                            <span className="card-title teal-text"><strong>Create Rant</strong></span>
                        </div>
                        <div className="card-content">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">create</i>
                                <label htmlFor="title">Title</label>
                                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">keyboard</i>
                                <label htmlFor="text">Body</label>
                                <textarea 
                                    id="text" className="materialize-textarea" 
                                    value={body} onChange={e => setBody(e.target.value)}
                                ></textarea>
                            </div>

                        </div>

                        <div className="card-action">
                            <label className="card-title"><strong>How are you feeling?</strong></label>
                            <div className="input-field col s12">
                                <select className="browser-default" value={feeling} onChange={(e) => setFeeling(e.target.value)} >
                                    <option value="" disabled>Choose</option>
                                    <option value="VS">Very Sad</option>
                                    <option value="S">Sad</option>
                                    <option value="N">Neutral</option>
                                    <option value="P">Pissed</option>
                                    <option value="EP">Extremely Pissed</option>
                                    <option value="FF">Fucking Furious</option>
                                </select>
                            </div>
                        </div>

                        <div className="card-content">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CreatePost)

