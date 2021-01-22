import React, { useState, useEffect } from 'react'
import { isEmpty, maxBodyLength } from '../../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../generic/loader'
import { useHistory } from 'react-router-dom'
import { instance as axios } from '../../../api/rantbox.instance'
import 'react-toastify/dist/ReactToastify.css'
import AnimatedHoc from '../../generic/AnimatedHoc'

 
const CreatePost = (props) => {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [feeling, setFeeling] = useState('')
    const [body, setBody] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false)
    const [feelingOptions, setFeelingOptions] = useState([])

    useEffect(() => {
        axios
            .get('/rant-posts/feelings/', {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then(res => {
                setFeelingOptions(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])
 
    useEffect(() => {
        if(!isEmpty(message))
            toast.error(message, {
                position: "top-center",
                autoClose: 2000,
            })
        return () => setMessage('')
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
            .post('/rant-posts/', postData, {
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

    const handleBodyUpdate = e => {
        if(e.target.value.length > maxBodyLength)
            toast.error('Maximum Allowed Characters exceeded', {
                position: "top-center",
                autoClose: 2000,
            })
        
        else setBody(e.target.value)
    }

    if(!props.auth.isLoggedIn)
        return <Redirect to="/dashboard" />

    if(created) {
        console.log('created')
        return <Redirect to="/my-rants" />
    }

    const options = feelingOptions.map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)
    

    return (
        <AnimatedHoc>  
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
                                <label htmlFor="text">Body (Max 2000 characters)</label>
                                <textarea 
                                    id="text" className="materialize-textarea" 
                                    value={body} onChange={handleBodyUpdate}
                                    maxLength={maxBodyLength}
                                ></textarea>
                            </div>

                        </div>

                        <div className="card-action">
                            <label className="card-title"><strong>How are you feeling?</strong></label>
                            <div className="input-field col s12">
                                <select className="browser-default" value={feeling} onChange={(e) => setFeeling(e.target.value)} >
                                <option value="" disabled>Choose</option>
                                    {options}
                                </select>
                            </div>
                        </div>

                        <div className="card-content">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        </div>

                    </form>
                </div>
                <span className="waves-effect waves-light" onClick={() => history.goBack()}>
                    <i className="material-icons left">chevron_left</i>
                </span>
            </div>
        </AnimatedHoc>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CreatePost)

