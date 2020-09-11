'use strict'

class Node {

}

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
      throw 'Cannot get first link of a ring!'
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
      <p onClick={() => console.log(this.state.square)}>
        I am a Gemini square with a depth of {this.state.square.getDepth()}.
      </p>)
  }
}

ReactDOM.render(<GeminiGame />, document.querySelector('#gemini_game_container'))