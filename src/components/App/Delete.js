import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class Delete extends Component {
    delete(e) {
        var user = firebase.auth().currentUser
        if (user != null) {
            return firebase
            .database()
            .ref('users/' + user.uid + '/' + e.target.id)
            .remove()
        } else {
            console.log("oh noes can't delete: no user")
        }
    }
    render() {
        if (this.props.canEdit) {
            return (
                <span
                    className="delete soft-link"
                    id={this.props.id}
                    onClick={this.delete}>
                    delete
                </span>
            )
        }
        return <div></div>
    }
}
