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

                    <div className="card-action">
                        <label className="card-title"><strong>How are you feeling?</strong></label>
                        <div className="input-field col s12">
                            <select className="browser-default" defaultValue="">
                                <option value="" disabled>Choose</option>
                                <option value="1">Very Sad</option>
                                <option value="1">Sad</option>
                                <option value="1">Neutral</option>
                                <option value="2">Pissed</option>
                                <option value="2">Extremely Pissed</option>
                                <option value="3">Fucking Furious</option>
                            </select>
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
