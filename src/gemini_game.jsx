import React from "react"
import classNames from "classnames"
import { GlobalHotKeys } from "react-hotkeys"
import makeSetup from "./levels"

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
    return this.edges.some((edge) => {return edge.isRow()})
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
    const setup = makeSetup(level)

    let ring = new Ring({length: setup.length})
    for (let i = 1; i < setup.depth; ++i) {
      ring = ring.makeCircumscribed()
    }

    const pivotal = ring.edges[0]
    for (var marble of setup.marbles) {
      pivotal.walkInto(marble.into).walkAround(marble.around).color = marble.color
    }
    let moves = setup.implicitMoves
    for (var move of setup.moves) {
      if (setup.targetMoves && moves >= setup.targetMoves) break
      pivotal.walkInto(move.into).walkAround(move.around).move()
        && ++moves
    }

    return {
      ring: ring,
      level: level,
      moves: moves,
      movedEdges: [],
      undoneEdges: [],
    }
  }

  trackMove(edge) {
    this.setState((state) => ({
      moves: state.moves - 1,
      movedEdges: state.movedEdges.concat(edge),
      undoneEdges: [],
    }))
  }

  travelTime(steps) {
    this.setState((state) => {
      const source = (steps > 0) ? state.undoneEdges : state.movedEdges
      const target = (steps < 0) ? state.undoneEdges : state.movedEdges
      let count = Math.min(source.length, Math.round(Math.abs(steps)))
      const moves = state.moves - Math.sign(steps) * count
      while (count--) {
        const edge = source.pop()
        target.push(edge)
        edge.move()
      }
      return {
        moves: moves,
        movedEdges: (steps > 0) ? target : source,
        undoneEdges: (steps < 0) ? target : source,
      }
    })
  }

  undo() {
    this.travelTime(-1)
  }

  redo() {
    this.travelTime(1)
  }

  reset() {
    this.travelTime(Number.MIN_SAFE_INTEGER)
  }

  levelUp() {
    const nextLevel = this.state.level + 1
    this.setState(this.initGame(nextLevel))
    window.location.hash = `#level=${nextLevel}`
  }

  render() {
    const classes = classNames('gemini-game', `gemini-game-${this.state.ring.length}`)
    const keyMap = {
      UNDO: ['ctrl+z', 'cmd+z'],
      REDO: ['shift+ctrl+z', 'shift+cmd+z'],
    }
    const handlers = {
      UNDO: () => this.undo(),
      REDO: () => this.redo(),
    }
    return (
      <div className={classes}>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
        <RingComponent ring={this.state.ring} onMove={(edge) => this.trackMove(edge)} />
        <nav>
          <p>Level: {this.state.level}</p>
          <p>Moves: {this.state.moves}</p>
          {this.state.ring.isSolved()
            ? <button className='primary text' onClick={() => this.levelUp()}>Level up!</button>
            : <>
                <button disabled={!this.state.movedEdges.length} className='pict' onClick={() => this.undo()} title='Undo'>↶</button>
                <button disabled={!this.state.undoneEdges.length} className='pict' onClick={() => this.redo()} title='Redo'>↷</button>
                <button disabled={!this.state.movedEdges.length} className='pict' onClick={() => this.reset()} title='Reset'>↺</button>
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
