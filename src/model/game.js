import makeSetup from "../data/levels.js";
import Ring from "./ring.js";

export default class Game {
  constructor(level) {
    if (!level) return;
    this.initGame(level);
  }

  initGame(level) {
    const setup = makeSetup(level);

    let ring = new Ring({ game: this, length: setup.length });
    for (let i = 1; i < setup.depth; ++i) {
      ring = ring.makeCircumscribed();
    }

    const pivotal = ring.edges[0];
    for (var marble of setup.marbles) {
      pivotal.walkInto(marble.into).walkAround(marble.around).color =
        marble.color;
    }
    let moves = setup.implicitMoves;
    for (var move of setup.moves) {
      if (setup.targetMoves && moves >= setup.targetMoves) break;
      pivotal.walkInto(move.into).walkAround(move.around).move() && ++moves;
    }

    this.ring = ring;
    this.level = level;
    this.moves = moves;
    this.movedEdges = [];
    this.undoneEdges = [];
    this.isReverse = false;
  }

  trackMove(edge) {
    this.isReverse = false;
    --this.moves;
    this.movedEdges.push(edge);
    this.undoneEdges = [];
  }

  travelTime(steps) {
    this.isReverse = steps < 0;
    const source = this.isReverse ? this.movedEdges : this.undoneEdges;
    const target = this.isReverse ? this.undoneEdges : this.movedEdges;
    let count = Math.min(source.length, Math.round(Math.abs(steps)));
    this.moves -= Math.sign(steps) * count;
    while (count--) {
      const edge = source.pop();
      target.push(edge);
      edge.move();
    }
  }

  undo() {
    this.travelTime(-1);
  }

  redo() {
    this.travelTime(1);
  }

  reset() {
    this.travelTime(Number.MIN_SAFE_INTEGER);
  }

  levelUp() {
    const nextLevel = this.level + 1;
    this.initGame(nextLevel);
  }

  getLastEdge() {
    return (this.isReverse ? this.undoneEdges : this.movedEdges).at(-1);
  }
}
