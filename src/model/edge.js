export default class Edge {
  constructor({ ring, prev, next, side }) {
    this.prev = prev;
    this.next = next;
    this.side = side;
    this.color = 0;
    this.ring = ring || prev.ring;
    this.game = this.ring && this.ring.game;
    if (next) next.prev = this;
    if (side) side.trunk = this;
  }

  makeNext(close = false) {
    return (this.next = new Edge({
      prev: this,
      side: this.side && this.side.next,
      next: (close && this.getFirst(this)) || undefined,
    }));
  }

  makeLast() {
    return this.makeNext(true);
  }

  getFirst(ref) {
    if (!this.prev) {
      return this;
    } else if (this.prev === ref) {
      throw new Error("Cannot get first link of a ring!");
    } else {
      return this.prev.getFirst(ref);
    }
  }

  getDepth() {
    return (this.side && this.side.getDepth() + 1) || 1;
  }

  getLength() {
    let edge = this.next;
    let count = 1;
    while (edge && edge !== this) {
      edge = edge.next;
      ++count;
    }
    return count;
  }

  walkAround(steps) {
    let edge = this;
    let count = Math.round(Math.abs(steps));
    while (count--) {
      edge = steps > 0 ? edge.next : edge.prev;
    }
    return edge;
  }

  walkInto(steps) {
    let edge = this;
    let count = Math.round(steps);
    while (0 < count--) {
      edge = edge.side;
    }
    return edge;
  }

  isMovable() {
    return (
      this.side &&
      this.side.color &&
      ((this.color && !this.next.color) || (!this.color && this.next.color))
    );
  }

  getMoveDirection() {
    switch (this.color && this.game.getLastEdge()) {
      case undefined:
      default:
        return "";
      case this:
        return "moved-from-side";
      case this.prev:
        return "moved-from-prev";
      case this.trunk:
        return this.trunk.color ? "moved-from-next-trunk" : "moved-from-trunk";
    }
  }

  move() {
    if (this.side && this.side.color) {
      if (this.color && !this.next.color) {
        this.next.color = this.side.color;
        this.side.color = this.color;
        this.color = null;
        return true;
      }
      if (!this.color && this.next.color) {
        this.color = this.side.color;
        this.side.color = this.next.color;
        this.next.color = null;
        return true;
      }
    }
    return false;
  }

  isRow() {
    return (
      this.side &&
      this.color &&
      this.color === this.side.color &&
      this.color === this.next.color
    );
  }
}
