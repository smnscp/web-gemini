import React from "react"
import classNames from "classnames"
import setupLevel from "./levels"

class Edge {
  constructor({prev, next, side}) {
    this.prev = prev
    this.next = next
    this.side = side
    this.color = 0
    if (next) next.prev = this
  }

  makeNext(close = false) {
    return this.next = new Edge({
      prev: this,
      side: this.side && this.side.next,
      next: close && this.getFirst(this) || undefined
    })
  }

  makeLast() {
    return this.makeNext(true)
  }

  getFirst(ref) {
    if (!this.prev) {
      return this
    } else if (this.prev === ref) {
      throw new Error('Cannot get first link of a ring!')
    } else {
      return this.prev.getFirst(ref)
    }
  }

  isMovable() {
    return this.side && this.side.color
      && (this.color && !this.next.color || !this.color && this.next.color)
  }

  move() {
    if (this.side && this.side.color) {
      if (this.color && !this.next.color) {
        this.next.color = this.side.color
        this.side.color = this.color
        this.color = null
        return true
      }
      if (!this.color && this.next.color) {
        this.color = this.side.color
        this.side.color = this.next.color
        this.next.color = null
        return true
      }
    }
    return false
  }

  setRowColor(color) {
    this.color = this.side.color = this.next.color = color
  }

  isRow() {
    return this.side && this.color && (this.color === this.side.color)
      && (this.color === this.next.color)
  }
}

class Square {
  constructor(inscribed) {
    this.inscribed = inscribed

    const edge1 = new Edge({
      side: inscribed && inscribed.edges[0],
    })
    const edge2 = edge1.makeNext()
    const edge3 = edge2.makeNext()
    const edge4 = edge3.makeLast()

    this.edges = [edge1, edge2, edge3, edge4]
  }

  makeCircumscribed() {
    return this.circumscribed = new Square(this)
  }

  getDepth() {
    return this.inscribed && this.inscribed.getDepth() + 1 || 1
  }

  hasRow() {
    return !!this.edges.filter((edge) => {return edge.isRow()}).length
  }

  isSolved() {
    return !this.inscribed || this.hasRow() && this.inscribed.isSolved()
  }
}

class GeminiGame extends React.Component {
  constructor(props) {
    super(props)
    const level = +props.level || 1
    this.state = this.initGame(level)
  }

  initGame(level) {
    let square = new Square()
      .makeCircumscribed()
      .makeCircumscribed()
      .makeCircumscribed()

    if (level > 24) square = square.makeCircumscribed()

    const pivotal = square.edges[0]
    const moves = setupLevel(pivotal, level)

    return {
      square: square,
      level: level,
      moves: moves,
    }
  }

  levelUp() {
    const nextLevel = this.state.level + 1
    this.setState(this.initGame(nextLevel))
  }

  render() {
    return (
      <div className='gemini-game'>
        <GeminiSquare square={this.state.square} onMove={() => this.setState((state) => ({moves: state.moves - 1}))} />
        <nav>
          <p>Level: {this.state.level}</p>
          <p>Moves: {this.state.moves}</p>
          {this.state.square.isSolved() && <button onClick={() => this.levelUp()}>level up!</button>}
        </nav>
      </div>
    )
  }
}

class GeminiSquare extends React.Component {
  render() {
    const inscribed = this.props.square.inscribed
    return (
      <div className={classNames('gemini-square', {innermost: !inscribed})}>
        <ol className='edges'>
          {this.props.square.edges.map((edge, index) =>
            <li
              className={classNames(
                'edge',
                `edge-${index+1}`,
                `color-${edge.color}`,
                {movable: edge.isMovable()}
              )}
              onClick={edge.isMovable() ? (() => {
                if (this.props.square.edges[index].move())
                  this.props.onMove()
              }) : undefined}
              key={index}>
            </li>
          )}
        </ol>
        {inscribed && <GeminiSquare square={inscribed} onMove={this.props.onMove} />}
      </div>
    )
  }
}

export default GeminiGame
