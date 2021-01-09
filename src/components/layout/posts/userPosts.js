import React, { useState, useEffect } from 'react'
import PostCard from './postCard'
import Loader from '../../generic/loader'
import { connect } from 'react-redux'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { CSVLink } from "react-csv";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'


const UserPosts = (props) => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [downloadReady, setDownloadReady] = useState(false)
    const [csvData, setCsvData] = useState([])
    const [generating, setGenerating] = useState(false)
    const [emptyRantBox, setEmptyRantBox] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

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
        if(props.auth.isLoggedIn){
        
            setLoading(true)
            axios
                .get('http://localhost:8000/rant-posts/my-rants/', {
                    'headers': { 'Authorization': `Token ${props.auth.token}`}
                })
                .then((res) => {
                    setPosts(res.data)
                    setLoading(false)
                    if(res.data.length === 0)
                        setEmptyRantBox(true)

                })
                .catch(err => {
                    console.log(err)
                    setErr(err)
                    setLoading(false)
                })
        }
        return () => {
            setLoading(false)
        }
        
    }, [])


    const generateReport = () => {
        setGenerating(true)
        axios
            .get('http://localhost:8000/generate-report/json/', {
                'headers': { 'Authorization': `Token ${props.auth.token}`}
            })
            .then((res) => {
                setCsvData(res.data)
                setDownloadReady(true)
                setGenerating(false)
            })
            .catch((err) => { 
                console.log('error ocurred')
                setGenerating(false)
            })
    }


    if(!props.auth.isLoggedIn)
        return <Redirect to="/dashboard" />

    if(emptyRantBox) {
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

    const postsArray = posts.map(post => <PostCard key={post.id} id={post.id} title={post.title} text={post.text} userid={post.author}/>)
    return (
        <>
            <ToastContainer />
            { loading && <Loader type="linear" /> }
            <div className="row">
                <div className="col s12 m6">
                    <h4 className="teal-text"><strong>My Rants</strong></h4>
                    {postsArray}
                    <span className="waves-effect waves-light btn btn-small" onClick={() => history.goBack()}>
                        <i className="material-icons small">chevron_left</i>
                    </span>
                </div>
                <div className="col m2"></div>
                <div className="col s12 m4">
                
                    <div className="card" style={{ marginTop: '10px' }}>
                        <div className="card-content">
                        <span className="card-title teal-text"><strong>Action Center</strong></span>
                        <p style={{ fontSize: '16px' }}>Export my rants</p>
                        </div>
                        <div className="card-action">
                            { !downloadReady && 
                                <span className="waves-effect waves-light btn btn-small" onClick={generateReport}>
                                    Generate Export
                                    <i className="material-icons left">file_download</i>
                                </span>
                            }
                            { generating && <Loader type='linear' /> }
                            { downloadReady && 
                                <div>
                                <p>Your Export is ready</p>
                                <CSVLink data={csvData} filename={"myrants.csv"}>
                                    <span className="waves-effect waves-light btn btn-small">Download
                                        <i className="material-icons left">file_download</i>
                                    </span>
                                </CSVLink> 
                                </div>
                            }
                        </div>
                   
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(UserPosts)
