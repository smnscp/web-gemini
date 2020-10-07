import React from "react";
import classNames from "classnames";

const WHITE = -1
const NONE = 0
const GREEN = 1
const YELLOW = 2
const BLACK = 3
const RED = 4

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
        this.color = NONE
        return true
      }
      if (!this.color && this.next.color) {
        this.color = this.side.color
        this.side.color = this.next.color
        this.next.color = NONE
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
    let moves
    let square = new Square()
      .makeCircumscribed()
      .makeCircumscribed()
      .makeCircumscribed()

    let pivotal = square.edges[0]

    switch (level) {
      case 1:
        pivotal.color = GREEN
        pivotal.prev.side.color = GREEN
        pivotal.next.next.side.side.color = GREEN

        pivotal.next.side.color = YELLOW
        pivotal.next.next.color = YELLOW
        pivotal.prev.side.side.color = YELLOW

        pivotal.next.next.side.color = BLACK
        pivotal.next.side.side.color = BLACK
        pivotal.next.side.side.side.color = BLACK

        pivotal.next.next.side.side.side.color = WHITE

        moves = 3

        break
      case 2:
        pivotal.next.color = GREEN
        pivotal.side.side.color = GREEN
        pivotal.prev.side.color = GREEN

        pivotal.prev.color = YELLOW
        pivotal.next.next.side.color = YELLOW
        pivotal.next.next.side.side.color = YELLOW

        pivotal.next.side.color = BLACK
        pivotal.side.side.side.color = BLACK
        pivotal.prev.side.side.side.color = BLACK

        pivotal.prev.side.side.color = WHITE

        moves = 4

        break
      case 3:
        pivotal.prev.color = GREEN
        pivotal.next.next.side.color = GREEN
        pivotal.next.next.side.side.side.color = GREEN

        pivotal.next.side.color = YELLOW
        pivotal.next.side.side.color = YELLOW
        pivotal.side.side.side.color = YELLOW

        pivotal.next.color = BLACK
        pivotal.side.side.color = BLACK
        pivotal.prev.side.side.color = BLACK

        pivotal.side.color = WHITE
        pivotal.next.next.color = WHITE

        moves = 4

        break
      case 4:
        pivotal.setRowColor(GREEN)

        pivotal.next.side.color = YELLOW
        pivotal.side.side.color = YELLOW
        pivotal.prev.side.side.side.color = YELLOW

        pivotal.prev.color = BLACK
        pivotal.next.next.side.color = BLACK
        pivotal.next.next.side.side.color = BLACK

        pivotal.prev.side.side.color = WHITE
        pivotal.side.side.side.color = WHITE

        moves = 5

        break
      case 5:
        pivotal.side.color = GREEN
        pivotal.side.side.color = GREEN
        pivotal.prev.color = GREEN

        pivotal.next.next.side.color = YELLOW
        pivotal.next.next.side.side.color = YELLOW
        pivotal.next.side.side.side.color = YELLOW

        pivotal.next.color = BLACK
        pivotal.next.next.color = BLACK
        pivotal.side.side.side.color = BLACK

        pivotal.next.side.color = WHITE
        pivotal.prev.side.side.color = WHITE

        moves = 5

        break
      case 25:
        square = square.makeCircumscribed()
        pivotal = square.edges[0]

        pivotal.side.color = GREEN
        pivotal.prev.side.color = GREEN
        pivotal.next.next.side.side.color = GREEN

        pivotal.side.side.color = YELLOW
        pivotal.next.next.color = YELLOW
        pivotal.prev.side.side.color = YELLOW

        pivotal.next.next.side.color = BLACK
        pivotal.side.side.side.color = BLACK
        pivotal.next.side.side.side.color = BLACK

        pivotal.next.color = RED
        pivotal.prev.side.side.side.color = RED
        pivotal.prev.side.side.side.side.color = RED

        pivotal.next.next.side.side.side.color = WHITE

        moves = 6

        break
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      default:
        pivotal.setRowColor(GREEN)
        pivotal.next.side.setRowColor(YELLOW)
        pivotal.next.next.side.side.setRowColor(BLACK)

        pivotal.side.side.side.color = WHITE
        pivotal.prev.side.side.side.color = WHITE
    }

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
