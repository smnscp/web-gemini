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

class Ring {
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
    return this.circumscribed = new Ring(this)
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
    let ring = new Ring()
      .makeCircumscribed()
      .makeCircumscribed()
      .makeCircumscribed()

    if (level > 24) ring = ring.makeCircumscribed()

    const pivotal = ring.edges[0]
    const moves = setupLevel(pivotal, level)

    return {
      ring: ring,
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
        <RingComponent ring={this.state.ring} onMove={() => this.setState((state) => ({moves: state.moves - 1}))} />
        <nav>
          <p>Level: {this.state.level}</p>
          <p>Moves: {this.state.moves}</p>
          {this.state.ring.isSolved() && <button onClick={() => this.levelUp()}>level up!</button>}
        </nav>
      </div>
    )
  }
}

class RingComponent extends React.Component {
  render() {
    const inscribed = this.props.ring.inscribed
    return (
      <div className={classNames('ring', {innermost: !inscribed})}>
        <ol className='edges'>
          {this.props.ring.edges.map((edge, index) =>
            <EdgeComponent edge={edge} key={index} index={index} onMove={this.props.onMove} />
          )}
        </ol>
        {inscribed && <RingComponent ring={inscribed} onMove={this.props.onMove} />}
      </div>
    )
  }
}

class EdgeComponent extends React.Component {
  render() {
    const edge = this.props.edge
    const classes = classNames(
      'edge',
      `edge-${this.props.index+1}`,
      `color-${edge.color}`,
      {movable: edge.isMovable()}
    )
    const onClick = edge.isMovable() ? (() => {
      if (edge.move())
        this.props.onMove()
    }) : undefined

    return <li className={classes}>
      {onClick && <button onClick={onClick} />}
    </li>
  }
}

export default GeminiGame
