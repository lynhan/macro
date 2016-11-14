import React, { Component } from 'react'
import DayItems from './DayItems'
var classNames = require('classnames')

// expects
// date: string
// items: array of {protein, fat, carb}

export default class Day extends Component {
    render() {
        let date = (
            <span>
                {this.props.data[0]['month']}.
                {this.props.data[0]['day']}.
                {this.props.data[0]['year']}
            </span>
        )

        let totalProtein = 0
        let totalFat = 0
        let totalCarb = 0
        this.props.data.forEach(function (item, index) {
            totalProtein += parseFloat(item.protein, 10)
            totalFat += parseFloat(item.fat, 10)
            totalCarb += parseFloat(item.carb, 10)
        })

        let today = new Date()
        let isToday = (this.props.data[0]['month'] === today.getMonth() + 1
            && this.props.data[0]['day'] === today.getDate()
            && this.props.data[0]['year'] === today.getFullYear())

        var btnClass = classNames('day', {
            'highlight': isToday
        })

        return (
            <div className={btnClass}>
                <DayItems data={this.props.data} isToday={isToday}/>
                <span className="day-date right">
                    {date}
                </span>
                <span className="total">
                    | {totalCarb} carb | {totalProtein} protein | {totalFat} fat
                </span>
            </div>
        )
    }
}
