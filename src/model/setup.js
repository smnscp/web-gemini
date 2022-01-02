import { WHITE } from "../data/colors";
import { rndInt } from "../tools";

export default class Setup {
  constructor(length, depth, implicitMoves = 0) {
    // Length of rings, normally 4 for squares.
    this.length = length || 4 + rndInt(2);
    // Number of rings, normally 4 (incl. the innermost ring w/o visible edges).
    this.depth = depth || 4 + rndInt(2);
    // Moves implied by the initial setup (w/o calling `addMove`).
    this.implicitMoves = Math.floor(implicitMoves);
    // List of placed marbles.
    this.marbles = [];
    // List of performed moves.
    this.moves = [];
  }

  addMarble(into, around, color) {
    around = around % this.length;
    this.marbles.push({ into, around, color });
  }

  addMarbleRow(into, around, color) {
    this.addMarble(into, around, color);
    this.addMarble(into + 1, around, color);
    this.addMarble(into, around + 1, color);
  }

  addMove(into, around) {
    this.moves.push({ into, around });
  }

  setRandomGoal() {
    let into = 0;
    let around = rndInt(this.length);
    let colors = [...Array(this.depth).keys()].slice(1);
    while (colors.length) {
      around += rndInt(this.length - 2);
      let colorIndex = rndInt(colors.length);
      this.addMarbleRow(into, around, colors[colorIndex]);
      colors.splice(colorIndex, 1);
      ++into;
      ++around;
    }
  }

  setRandomPlaceholders(min = 1, max = 2) {
    let tries = min + max;
    let placed = 0;

    while (placed < min || (tries > 0 && placed < max)) {
      const into = rndInt(this.depth);
      const around = rndInt(this.length);

      if (!this.marbles.some((m) => m.into === into && m.around === around)) {
        this.addMarble(into, around, WHITE);
        ++placed;
      }
      --tries;
    }
  }

  setRandomMoves(target) {
    target = Math.floor(target);
    // Since we cannot guarantee that moves are valid
    // we fill a pool with a probably sufficient number of tries.
    const poolSize = target * target;

    this.targetMoves = target;

    while (this.moves.length < poolSize) {
      const into = rndInt(this.depth);
      const around = rndInt(this.length);
      this.addMove(into, around);
    }
  }
}
