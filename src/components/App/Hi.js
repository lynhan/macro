import React, { Component } from 'react'

export default class Hi extends Component {
    render() {
        return (
            <div className="hi">
                <span className="hi-name">
                    hi {this.props.name}!
                </span>
                <span
                    className="logout soft-link"
                    onClick={this.props.handleLogout}>
                    log out
                </span>
            </div>
        )
    }
}
