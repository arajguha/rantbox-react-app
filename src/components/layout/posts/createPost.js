import React, { useState } from 'react'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
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
                    <div className="card-content">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreatePost

/**
 * <div className="container" style={{'marginTop': '30px', 'marginBottom': '30px'}}>
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text"><strong>Rant</strong></span>
                </div>
                <form className="col s12" style={{'paddingTop': '15px', 'paddingBottom': '15px'}}>
                    <div className="container">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">create</i>
                                <label htmlFor="title">Title</label>
                                <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">keyboard</i>
                                <label htmlFor="text">Body</label>
                                <textarea 
                                    id="text" className="materialize-textarea" 
                                    value={body} onChange={e => setBody(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
 */