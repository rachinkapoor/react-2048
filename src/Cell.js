import React from 'react'
import './Cell.css'

export default class Cell extends React.Component {
  render () {
    return (
      <div className={`cell cell-${this.props.value}`}>
        {this.props.value}
      </div>
    )
  }
}