import React from 'react'
import Cells from './Cells'
import game from '2048-engine'
import './App.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    game.start()

    this.state = {
      score: 0,
      cells: game.cells,
      over: false,
      won: false,
      addition: 0
    }

    this.handleKeydown = this.handleKeydown.bind(this)
    this.restart = this.restart.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown)

    game.addCallback('over', () => {
      this.setState({ over: true })
    })

    game.addCallback('won', () => {
      this.setState({ won: true })
    })

    game.addCallback('addScore', (score) => {
      this.setState({ addition:  score })
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)

    game.removeCallback('over')
    game.removeCallback('won')
    game.removeCallback('addScore')
  }

  render () {
    return (
      <div className="app">
        <p className="game-explanation">
          <b className="important">How to play: </b>
          Use your <b>arrow keys</b> to move the tiles. When two tiles with the same number touch, they <b>merge into one!</b>
        </p>
        <div className="game-header">
          <h1 className="title">
            2048
          </h1>
          <div className="score-container">
            {this.state.score}

            {
              this.state.addition !== 0 && <div className="score-addition">
                +{this.state.addition}
              </div>
            }
          </div>
        </div>

        <div className="game-container">
          {
            (this.state.won || this.state.over) &&
              <div className={`game-message game-${(this.state.won && 'won') || (this.state.over && 'over')}`}>
                <p>
                  {this.state.won ? 'You win!' : 'Game over!'}
                </p>

                <div className='actions'>
                  <button className='retry-button' onClick={this.restart}>Try again</button>
                </div>
              </div>
          }
          <Cells cells={this.state.cells} />
        </div>

      </div>
    )
  }

  restart (event) {
    event.preventDefault()
    game.restart()
    this.setState({
      cells: game.cells,
      addition: 0,
      score: 0,
      over: false,
      won: false
    })
  }

  handleKeydown (event) {
    const keyMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    }

    if (game.respond(keyMap[event.code])) {
      this.refreshGameState()
    }
  }

  refreshGameState () {
    this.setState({
      cells: game.cells,
      score: game.score,
      over: game.over,
      won: game.won
    })
  }
}
