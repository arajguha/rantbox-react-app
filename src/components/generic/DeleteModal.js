import React, { Component } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import axios from 'axios'


class DeleteModal extends Component {
  // constructor() {
  //   this.state = {
  //     deleted: false
  //   }
  // }

  componentDidMount() {
    const options = {
        onOpenStart: () => {
            console.log("Open Start")
        },
        onOpenEnd: () => {
            console.log("Open End")
        },
        onCloseStart: () => {
            console.log("Close Start")
        },
        onCloseEnd: () => {
            console.log("Close End")
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%"
    }

    M.Modal.init(this.Modal, options)

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  handleDelete() {
    console.log(`post with id ${this.props.postid} deleted`)
    axios
      .delete(`http://localhost:8000/rant-posts/${this.props.postid}/`, {
        'headers': { 'Authorization': `Token ${this.props.token}`}
      })
      .then( () => this.props.deleteHandler())
      .catch(err => this.props.deleteErrorHandler(err))
  }

  render() {
    return (
      <div>
        <div ref={Modal => {this.Modal = Modal}}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4>Confirm Action</h4>
            <p>Are you sure you want to delete?</p>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat" onClick={this.handleDelete.bind(this)}>
              Delete
            </a>
            <a className="modal-close waves-effect waves-green btn-flat">
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteModal
