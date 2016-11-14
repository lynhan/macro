import React, { Component } from 'react'
import Day from './Day'

// expects
// data: array of {protein, fat, carb, day, month, year}

export default class List extends Component {
    getDateString(item) {
        return item.month + "." + item.day + "." + item.year
    }
    // returns array of arrays
    getItemsByDay() {
        var this_ = this
        var res = []
        var today = [this.props.data[0]]
        var prevDate = this_.getDateString(this.props.data[0])
        for (var i = 1; i < this.props.data.length; i++) {
            let item = this.props.data[i]
            let date = this_.getDateString(item)
            if (date === prevDate) {
                today.push(item)
            } else {
                res.push(today)
                today = [item]
                prevDate = date
            }
        }
        res.push(today)
        return res
    }
    getBody() {
        if (this.props.data.length > 0) {
            let itemsByDay = this.getItemsByDay()
            return itemsByDay.map(function (item, index) {
                return (
                    <div key={index}>
                        <Day data={item} />
                    </div>
                )
            })
        } else {
            return <div>no macros yet</div>
        }
    }
    render() {
        let body = this.getBody()
        return (
            <div className="list">
                <div className="list-body">
                    {body}
                </div>
            </div>
        )
    }
}
