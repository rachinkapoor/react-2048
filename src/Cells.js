import React from 'react'
import Cell from './Cell'
import './Cells.css'

export default class Cells extends React.Component {
  render () {
    return (
      <div className="cells">
        {
          this.cellGroups().map((cells, groupIndex) => {
            return (
              <div key={groupIndex} className="cells-row">
                {
                  cells.map((cell, cellIndex) => {
                    return <Cell key={groupIndex * 4 + cellIndex} value={cell} />
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  cellGroups () {
    let groups = []

    this.props.cells.forEach((value, index) => {
      let groupIndex = Math.floor(index / 4)
      groups[groupIndex] = groups[groupIndex] || []
      groups[groupIndex].push(value)
    })

    return groups
  }
}