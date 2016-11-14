import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class Add extends Component {

    constructor(props) {
        super(props)
        this.state = {
            protein: 0,
            fat: 0,
            carb: 0,
        }
        this.setProtein = this.setProtein.bind(this)
        this.setFat = this.setFat.bind(this)
        this.setCarb = this.setCarb.bind(this)
        this.submit = this.submit.bind(this)
        this.valid = this.valid.bind(this)
    }


    setProtein(event) {
        this.setState({ protein: event.target.value })
    }


    setFat(event) {
        this.setState({ fat: event.target.value })
    }


    setCarb(event) {
        this.setState({ carb: event.target.value })
    }


    push(uid, postData) {
        var newPostKey = firebase
            .database()
            .ref('users')
            .push()
            .key
        var updates = {}
        updates['/users/' + uid + '/' + newPostKey] = postData
        return firebase.database().ref().update(updates)  // can use in future
    }


    valid(num) {
        return !isNaN(num) && num > -1
    }


    submit(event) {
        var time = new Date()
        if (! (this.valid(this.state.carb) &&
                this.valid(this.state.protein) &&
                this.valid(this.state.fat))) {
                    alert("macros need to be numbers >= 0")
                    return
                }

        var data = Object.assign(
            {},
            this.state,
            {
                'day': time.getDate(),
                'month': time.getMonth() + 1, // jan is 0
                'year': time.getFullYear()
            }
        )
        console.log('submitting new data', data)
        this.push(this.props.user.id, data)
        this.setState({
            protein: 0,
            fat: 0,
            carb: 0,
        })
    }


    render() {
        return (
            <div className="add ">

                <form className="form-inline">
                    <div className="form-group right">
                        <input type="text"
                            className="form-control small-right"
                            id="carb"
                            value={this.state.carb}
                            onChange={this.setCarb} />
                        <label htmlFor="carb">carb</label>
                    </div>

                    <div className="form-group right">
                        <input type="text"
                            className="form-control small-right"
                            id="protein"
                            value={this.state.protein}
                            onChange={this.setProtein} />
                        <label htmlFor="protein">protein</label>
                    </div>

                    <div className="form-group right">
                        <input type="text"
                            className="form-control small-right"
                            id="fat"
                            value={this.state.fat}
                            onChange={this.setFat} />
                        <label htmlFor="fat">fat</label>
                    </div>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.submit}>add</button>
                </form>
            </div>
        )
    }
}
