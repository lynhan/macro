import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './style.css'

import * as firebase from 'firebase/firebase-browser'
import { firebaseConfig } from '../../config'
import Front from './Front'
import Home from './Home'


export default class App extends Component {

    constructor(props) {
        super(props)
        firebase.initializeApp(firebaseConfig)
        this.state = {
            data: [],
            user: {}
        }
        this.listenForData = this.listenForData.bind(this)
    }


    componentDidMount() {
        let this_ = this
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("user is now:", user)
            if (user != null) {
                this_.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        id: user.uid
                    }
                })
                this_.listenForData(user.uid)
            } else {
                this_.setState({
                    data: [],
                    user: {}
                })
            }
        });
    }


    listenForData(uid) {
        let this_ = this
        let dataRef = firebase
            .database()
            .ref('user-posts/' + uid)
        dataRef.on('value', function (snapshot) {
            var data = snapshot.val()
            console.log('data', data)
            if (data != null) {
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                array.reverse()
                this_.setState({ data: array })
            } else {
                this_.setState({ data: [] })
            }
        })
    }


    login() {
        var provider = new firebase.auth.GoogleAuthProvider()
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                let user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    id: result.user.uid,
                    token: result.credential.accessToken
                }
                console.log('omg logged in!!! user: ', user)
            })
            .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                var email = error.email
                var credential = error.credential
                console.log(errorCode, errorMessage, email, credential)
            })
    }


    logout() {
        firebase.auth()
            .signOut()
            .then(function () {
                console.log('log out success!!!')
            })
            .catch(function (error) {
                console.log('log out error: ', error)
            })
    }


    render() {
        var user = firebase.auth().currentUser
        if (user) {
            // User is signed in.
            let name = this.state.user.name.split(" ")[0].toLowerCase()
            return (
                <div className="app">
                    <Home
                        name={name}
                        user={this.state.user}
                        data={this.state.data}
                        handleLogout={this.logout} />
                </div>
            )
        } else {
            // No user is signed in.
            return (
                <div className="app">
                    <Front handleLogin={this.login} />
                </div>
            )
        }
    } // end render
}
