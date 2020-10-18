import React from "react"
import classNames from "classnames"
import { GlobalHotKeys } from "react-hotkeys"
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

  getDepth() {
    return this.side && this.side.getDepth() + 1 || 1
  }

  getLength() {
    let edge = this.next
    let count = 1
    while (edge && edge !== this) {
      edge = edge.next
      ++count
    }
    return count
  }

  walkAround(steps) {
    let edge = this
    let count = Math.round(Math.abs(steps))
    while (count--) {
      edge = (steps > 0) ? edge.next : edge.prev
    }
    return edge
  }

  walkInto(steps) {
    let edge = this
    let count = Math.round(steps)
    while (0 < count--) {
      edge = edge.side
    }
    return edge
  }

  goToRandom() {
    const rndInt = cap => Math.floor(Math.random() * cap)

    return this
      .walkAround(rndInt(this.getLength()))
      .walkInto(rndInt(this.getDepth()))
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
  constructor({inscribed, length = 4} = {}) {
    this.inscribed = inscribed
    this.edges = []
    this.length = length

    for (let i = 1, edge; i <= length; ++i) {
      if (!edge) {
        edge = new Edge({
          side: inscribed && inscribed.edges[0],
        })
      } else {
        edge = edge.makeNext(i == length)
      }
      this.edges.push(edge)
    }
  }

  makeCircumscribed() {
    return this.circumscribed = new Ring({inscribed: this, length: this.length})
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
    let length = level > 25 ? 5 : 4
    let depth = level == 25 ? 5 : 4
    let ring = new Ring({length: length})

    for (let i = 1; i < depth; ++i) {
      ring = ring.makeCircumscribed()
    }

    const pivotal = ring.edges[0]
    const moves = setupLevel(pivotal, level)

    return {
      ring: ring,
      level: level,
      moves: moves,
      movedEdges: [],
    }
  }

  trackMove(edge) {
    this.setState((state) => ({
      moves: state.moves - 1,
      movedEdges: state.movedEdges.concat(edge),
    }))
  }

  undo() {
    this.setState((state) => {
      state.movedEdges.pop().move()
      return {
        moves: state.moves + 1,
        movedEdges: state.movedEdges,
      }
    })
  }

  reset() {
    this.setState(this.initGame(this.state.level))
  }

  levelUp() {
    const nextLevel = this.state.level + 1
    this.setState(this.initGame(nextLevel))
    window.location.hash = `#level=${nextLevel}`
  }

  render() {
    const classes = classNames('gemini-game', `gemini-game-${this.state.ring.length}`)
    const keyMap = { UNDO: ['ctrl+z', 'cmd+z'] }
    const handlers = { UNDO: () => this.undo() }
    return (
      <div className={classes}>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
        <RingComponent ring={this.state.ring} onMove={(edge) => this.trackMove(edge)} />
        <nav>
          <p>Level: {this.state.level}</p>
          <p>Moves: {this.state.moves}</p>
          {this.state.ring.isSolved()
            ? <button className='primary text' onClick={() => this.levelUp()}>Level up!</button>
            : !!this.state.movedEdges.length && <>
                <button className='pict' onClick={() => this.undo()} title='Undo'>⤺</button>
                <button className='pict' onClick={() => this.reset()} title='Reset'>↺</button>
              </>
          }
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
        this.props.onMove(edge)
    }) : undefined

    return <li className={classes}>
      {onClick && <button onClick={onClick} />}
    </li>
  }
}

export default GeminiGame
