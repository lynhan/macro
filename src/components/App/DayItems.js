import React, { Component } from 'react'
import Delete from './Delete'

// expects data: array of {}
export default class DayItems extends Component {
    render() {
        let this_ = this
        if (this_.props.isToday === true) {
            let items = this_.props.data.map(function (item) {
                return (
                    <div className="item" key={item.id}>
                        <span className="right">
                            {item.carb} carb | {item.protein} protein | {item.fat} fat
                    </span>
                        <Delete id={item.id} canEdit={this_.props.isToday} />
                    </div>
                )
            })
            return (
                <div className="day-items">
                    {items}
                </div>
            )
        } // end if isToday
        return (
            <div></div>
        )
    } // end render
}
