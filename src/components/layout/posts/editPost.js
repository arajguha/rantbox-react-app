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

 
const EditPost = (props) => {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [feeling, setFeeling] = useState('')
    const [body, setBody] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [updated, setUpdated] = useState(false)
 

    useEffect(() => {
        if(!isEmpty(err))
            toast.error(err, {
                position: "top-center",
                autoClose: 2000,
            })
        return () => setErr('')
    }, [err])


    useEffect(() => {
        if(props.auth.isLoggedIn) {
            //console.log(props.auth)
        
            setLoading(true)
            axios
                .get(`/rant-posts/${props.match.params.id}/`, {
                    'headers': { 'Authorization': `Token ${props.auth.token}` }
                })
                .then(res => {
                    const post = res.data
                    post.created_on = res.data.created_on.split('T')[0]
                    setTitle(post.title)
                    setBody(post.text)
                    setFeeling(post.feeling_level)
                    setLoading(false)
                    
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    setErr(err.message)
            })
        }
        
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const patchData = {
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

        console.log(patchData)
        
        axios
            .patch(`/rant-posts/${props.match.params.id}/`, patchData, {
                'headers': { 'Authorization': `Token ${props.auth.token}` }
            })
            .then((res) => {
                setUpdated(true)
            })
            .catch(err => {
                setErr(err.response.data.detail)
            })
        
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

    if(updated) {
        console.log('updated')
        return <Redirect to="/my-rants" />
    }

    return (
        <AnimatedHoc>  
            { loading && <Loader type="linear" /> }
            <ToastContainer />
            <div className="container" style={{'marginTop': '30px', 'marginBottom': '30px'}}>
                <div className="card">
                    <form className="col s12">
                        
                        <div className="card-content">
                            <span className="card-title teal-text"><strong>Edit Your Rant</strong></span>
                        </div>
                        <div className="card-content">
                            <span className="card-title teal-text"><strong>Title</strong></span>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">create</i>
                                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <span className="card-title teal-text"><strong>Body</strong>(max 2000 characters)</span>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">keyboard</i>
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
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
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

export default connect(mapStateToProps)(EditPost)

