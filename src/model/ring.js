import Edge from "./edge.js";

export default class Ring {
  constructor({ game, inscribed, length = 4 } = {}) {
    this.game = game || inscribed.game;
    this.inscribed = inscribed;
    this.edges = [];
    this.length = length;

    for (let i = 1, edge; i <= length; ++i) {
      if (!edge) {
        edge = new Edge({
          ring: this,
          side: inscribed && inscribed.edges[0],
        });
      } else {
        edge = edge.makeNext(i == length);
      }
      this.edges.push(edge);
    }
  }

  makeCircumscribed() {
    return (this.circumscribed = new Ring({
      inscribed: this,
      length: this.length,
    }));
  }

  getDepth() {
    return (this.inscribed && this.inscribed.getDepth() + 1) || 1;
  }

  hasRow() {
    return this.edges.some((edge) => {
      return edge.isRow();
    });
  }

  isSolved() {
    return !this.inscribed || (this.hasRow() && this.inscribed.isSolved());
  }
}
