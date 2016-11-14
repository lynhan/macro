import React, { Component } from 'react'
import List from './List'
import Add from './Add'
import Hi from './Hi'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Hi
                name={this.props.name}
                handleLogout={this.props.handleLogout} />
                <Add user={this.props.user} />
                <List data={this.props.data} />
            </div>
        )
    }
}
