import React from "react";
import classNames from "classnames";

const NONE = 0
const GREEN = 1
const YELLOW = 2
const BLACK = 3
const WHITE = 4

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
}

class GeminiGame extends React.Component {
  constructor(props) {
    super(props)
    const square1 = new Square()
      .makeCircumscribed()
      .makeCircumscribed()
      .makeCircumscribed()

    this.state = { square: square1 }

    this.initGame(1)
  }

  initGame(number) {
    const pivotal = this.state.square.edges[0]

    switch (number) {
      case 1:
        pivotal.color = GREEN
        pivotal.prev.side.color = GREEN
        pivotal.prev.prev.side.side.color = GREEN

        pivotal.next.side.color = YELLOW
        pivotal.next.next.color = YELLOW
        pivotal.prev.side.side.color = YELLOW

        pivotal.next.next.side.color = BLACK
        pivotal.next.side.side.color = BLACK
        pivotal.next.side.side.side.color = BLACK

        pivotal.next.next.side.side.side.color = WHITE

        break;
      default:
        pivotal.setRowColor(GREEN)
        pivotal.next.side.setRowColor(YELLOW)
        pivotal.next.next.side.side.setRowColor(BLACK)

        pivotal.side.side.side.color = WHITE
        pivotal.prev.side.side.side.color = WHITE
    }

    this.setState({square: this.state.square})
  }

  render() {
    return (
      <div className='gemini-game'>
        <GeminiSquare square={this.state.square} />
      </div>)
  }
}

class GeminiSquare extends React.Component {
  constructor(props) {
    super(props)
    this.state = { square: props.square }
  }

  render() {
    const inscribed = this.state.square.inscribed
    return (
      <div className={classNames('gemini-square', {innermost: !inscribed})}>
        <ol className='edges'>
          {this.state.square.edges.map((edge, index) =>
            <li
              className={classNames('edge', `edge-${index+1}`, `color-${edge.color}`)}
              onClick={() => {this.state.square.edges[index].move(); this.setState({square: this.state.square})}}
              key={index}>
            </li>
          )}
        </ol>
        {inscribed && <GeminiSquare square={inscribed} />}
      </div>)
  }
}

export default GeminiGame
