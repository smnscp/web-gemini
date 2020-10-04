import React from "react";

class Edge {
  constructor({prev, next, side}) {
    this.prev = prev
    this.next = next
    this.side = side
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
    this.state = { square: square1 }
  }

  render() {
    return (
      <div onClick={() => console.log(this.state.square)}>
        <p>I am a Gemini square with a depth of {this.state.square.getDepth()}.</p>
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
    return (
      <div className='gemini-square'>
        <ol className='corners'>
          <li className='corner corner-1'></li>
          <li className='corner corner-2'></li>
          <li className='corner corner-3'></li>
          <li className='corner corner-4'></li>
        </ol>
        {this.state.square.inscribed && <GeminiSquare square={this.state.square.inscribed} />}
      </div>)
  }
}

export default GeminiGame
