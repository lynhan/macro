import React, { Component } from 'react'

export default class Front extends Component {
    render() {
        return (
            <div className="front">

            <div className="title top">
            macro
            </div>

            <div className="subtitle bottom">
            track carb, protein, fat intake
            </div>

            <div className="login-btn">
                <button
                type="button"
                className="btn btn-success"
                onClick={this.props.handleLogin}>
                log in
                </button>
            </div>

            </div>
        )
    }
}
