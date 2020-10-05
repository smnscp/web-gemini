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

    let edge = square1.edges[0]
    edge.color = GREEN
    edge.side.color = GREEN
    edge.next.color = GREEN

    edge = edge.next.side
    edge.color = YELLOW
    edge.side.color = YELLOW
    edge.next.color = YELLOW

    edge = edge.next.side
    edge.color = BLACK
    edge.side.color = BLACK
    edge.next.color = BLACK

    edge.next.side.color = WHITE
    edge.next.side.next.color = WHITE

    this.state = { square: square1 }
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
