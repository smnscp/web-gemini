const WHITE = -1
const GREEN = 1
const YELLOW = 2
const BLACK = 3
const RED = 4

const rndInt = cap => Math.floor(Math.random() * cap)

class Setup {
  constructor(length, depth, implicitMoves = 0) {
    // Length of rings, normally 4 for squares.
    this.length = length
    // Number of rings, normally 4 (incl. the innermost ring w/o visible edges).
    this.depth = depth
    // Moves implied by the initial setup (w/o calling `addMove`).
    this.implicitMoves = Math.floor(implicitMoves)
    // List of placed marbles.
    this.marbles = []
    // List of performed moves.
    this.moves = []
  }

  addMarble(into, around, color) {
    around = around % this.length
    this.marbles.push({into, around, color})
  }

  addMarbleRow(into, around, color) {
    this.addMarble(into, around, color)
    this.addMarble(into + 1, around, color)
    this.addMarble(into, around + 1, color)
  }

  addMove(into, around) {
    this.moves.push({into, around})
  }

  setRandomGoal() {
    let into = 0
    let around = rndInt(this.length)
    let colors = [...Array(this.depth).keys()].slice(1)
    while (colors.length) {
      around += rndInt(this.length - 2)
      let colorIndex = rndInt(colors.length)
      this.addMarbleRow(into, around, colors[colorIndex])
      colors.splice(colorIndex, 1)
      ++into
      ++around
    }
  }

  setRandomPlaceholders(min = 1, max = 2) {
    let tries = min + max
    let placed = 0

    while (placed < min || tries > 0 && placed < max) {
      const into = rndInt(this.depth)
      const around = rndInt(this.length)

      if (!this.marbles.some(m => m.into === into && m.around === around)) {
        this.addMarble(into, around, WHITE)
        ++placed
      }
      --tries
    }
  }

  setRandomMoves(target) {
    target = Math.floor(target)
    // Since we cannot guarantee that moves are valid
    // we fill a pool with a probably sufficient number of tries.
    const poolSize = target * target

    this.targetMoves = target

    while (this.moves.length < poolSize) {
      const into = rndInt(this.depth)
      const around = rndInt(this.length)
      this.addMove(into, around)
    }
  }
}

/**
 * Make a Setup for a given level.
 * @param level The level’s number.
 * @return The Setup object.
 */
const makeSetup = (level) => {
  let setup

  switch (level) {
    case 1:
      setup = new Setup(4, 4, 3)
      setup.addMarble(0, 0, GREEN)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(1, 3, GREEN)
      setup.addMarble(2, 1, BLACK)
      setup.addMarble(2, 2, GREEN)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, WHITE)
      return setup
    case 2:
      setup = new Setup(4, 4, 4)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 3, YELLOW)
      setup.addMarble(1, 1, BLACK)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, GREEN)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 2, YELLOW)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 3, BLACK)
      return setup
    case 3:
      setup = new Setup(4, 4, 4)
      setup.addMarble(0, 1, BLACK)
      setup.addMarble(0, 2, WHITE)
      setup.addMarble(0, 3, GREEN)
      setup.addMarble(1, 0, WHITE)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, GREEN)
      setup.addMarble(2, 0, BLACK)
      setup.addMarble(2, 1, YELLOW)
      setup.addMarble(2, 3, BLACK)
      setup.addMarble(3, 0, YELLOW)
      setup.addMarble(3, 2, GREEN)
      return setup
    case 4:
      setup = new Setup(4, 4, 5)
      setup.addMarbleRow(0, 0, GREEN)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 2, BLACK)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 0, WHITE)
      setup.addMarble(3, 3, YELLOW)
      return setup
    case 5:
      setup = new Setup(4, 4, 5)
      setup.addMarble(0, 1, BLACK)
      setup.addMarble(0, 2, BLACK)
      setup.addMarble(0, 3, GREEN)
      setup.addMarble(1, 0, GREEN)
      setup.addMarble(1, 1, WHITE)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 2, YELLOW)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 1, YELLOW)
      return setup
    case 6:
      setup = new Setup(4, 4, 5)
      setup.addMarble(0, 0, BLACK)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(1, 0, GREEN)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, GREEN)
      setup.addMarbleRow(2, 1, YELLOW)
      setup.addMarble(3, 2, WHITE)
      return setup
    case 7:
      setup = new Setup(4, 4, 5)
      setup.addMarble(0, 0, BLACK)
      setup.addMarble(0, 1, YELLOW)
      setup.addMarble(1, 0, YELLOW)
      setup.addMarble(1, 1, GREEN)
      setup.addMarble(1, 2, GREEN)
      setup.addMarble(2, 1, WHITE)
      setup.addMarble(2, 2, GREEN)
      setup.addMarble(2, 3, BLACK)
      setup.addMarble(3, 0, YELLOW)
      setup.addMarble(3, 1, WHITE)
      setup.addMarble(3, 2, BLACK)
      return setup
    case 8:
      setup = new Setup(4, 4, 6)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 0, BLACK)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 2, WHITE)
      setup.addMarble(3, 2, GREEN)
      setup.addMarble(3, 3, GREEN)
      return setup
    case 9:
      setup = new Setup(4, 4, 6)
      setup.addMarble(0, 1, YELLOW)
      setup.addMarble(0, 2, GREEN)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 1, WHITE)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 1, GREEN)
      setup.addMarble(3, 2, GREEN)
      return setup
    case 10:
      setup = new Setup(4, 4, 6)
      setup.addMarble(0, 0, BLACK)
      setup.addMarble(0, 1, YELLOW)
      setup.addMarble(1, 0, YELLOW)
      setup.addMarble(1, 1, WHITE)
      setup.addMarble(1, 3, GREEN)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 0, WHITE)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, BLACK)
      return setup
    case 11:
      setup = new Setup(4, 4, 6)
      setup.addMarble(0, 0, BLACK)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 1, WHITE)
      setup.addMarble(2, 2, BLACK)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 3, GREEN)
      return setup
    case 12:
      setup = new Setup(4, 4, 7)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(1, 0, GREEN)
      setup.addMarble(1, 1, BLACK)
      setup.addMarble(1, 3, WHITE)
      setup.addMarble(2, 1, BLACK)
      setup.addMarble(2, 2, YELLOW)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 0, GREEN)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, WHITE)
      return setup
    case 13:
      setup = new Setup(4, 4, 7)
      setup.addMarble(0, 0, BLACK)
      setup.addMarble(0, 2, GREEN)
      setup.addMarble(0, 3, YELLOW)
      setup.addMarble(1, 1, WHITE)
      setup.addMarble(1, 2, GREEN)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, BLACK)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 2, WHITE)
      setup.addMarble(3, 2, YELLOW)
      setup.addMarble(3, 3, YELLOW)
      return setup
    case 14:
      setup = new Setup(4, 4, 7)
      setup.addMarble(0, 0, YELLOW)
      setup.addMarble(0, 1, BLACK)
      setup.addMarble(1, 0, YELLOW)
      setup.addMarble(1, 1, WHITE)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 3, GREEN)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 1, GREEN)
      return setup
    case 15:
      setup = new Setup(4, 4, 7)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 2, BLACK)
      setup.addMarble(0, 3, YELLOW)
      setup.addMarble(1, 0, YELLOW)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(1, 3, WHITE)
      setup.addMarble(2, 1, WHITE)
      setup.addMarble(2, 2, BLACK)
      setup.addMarble(2, 3, GREEN)
      setup.addMarble(3, 2, YELLOW)
      setup.addMarble(3, 3, GREEN)
      return setup
    case 16:
      setup = new Setup(4, 4, 8)
      setup.addMarble(0, 0, WHITE)
      setup.addMarble(0, 2, BLACK)
      setup.addMarble(1, 1, BLACK)
      setup.addMarbleRow(1, 3, GREEN)
      setup.addMarbleRow(2, 1, YELLOW)
      setup.addMarble(3, 0, WHITE)
      setup.addMarble(3, 3, BLACK)
      return setup
    case 17:
      setup = new Setup(4, 4, 8)
      setup.addMarble(0, 0, GREEN)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 0, WHITE)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 2, WHITE)
      setup.addMarble(3, 0, YELLOW)
      setup.addMarble(3, 2, BLACK)
      return setup
    case 18:
      setup = new Setup(4, 4, 8)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 2, BLACK)
      setup.addMarble(1, 1, GREEN)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, WHITE)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 1, BLACK)
      setup.addMarble(2, 2, YELLOW)
      setup.addMarble(3, 0, WHITE)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, GREEN)
      return setup
    case 19:
      setup = new Setup(4, 4, 9)
      setup.addMarble(0, 0, GREEN)
      setup.addMarble(0, 3, WHITE)
      setup.addMarble(1, 0, BLACK)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 2, GREEN)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, WHITE)
      return setup
    case 20:
      setup = new Setup(4, 4, 9)
      setup.addMarble(0, 0, GREEN)
      setup.addMarble(0, 2, WHITE)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 0, GREEN)
      setup.addMarble(1, 1, YELLOW)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 2, BLACK)
      setup.addMarble(2, 3, WHITE)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 1, YELLOW)
      return setup
    case 21:
      setup = new Setup(4, 4, 10)
      setup.addMarble(0, 0, YELLOW)
      setup.addMarble(0, 1, BLACK)
      setup.addMarble(1, 0, BLACK)
      setup.addMarble(1, 2, WHITE)
      setup.addMarble(1, 3, YELLOW)
      setup.addMarbleRow(2, 1, GREEN)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 2, WHITE)
      return setup
    case 22:
      setup = new Setup(4, 4, 10)
      setup.addMarble(0, 2, WHITE)
      setup.addMarble(0, 3, YELLOW)
      setup.addMarble(1, 0, BLACK)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, GREEN)
      setup.addMarble(2, 0, BLACK)
      setup.addMarble(2, 1, BLACK)
      setup.addMarble(2, 2, GREEN)
      setup.addMarble(3, 0, WHITE)
      setup.addMarble(3, 1, YELLOW)
      setup.addMarble(3, 2, GREEN)
      return setup
    case 23:
      setup = new Setup(4, 4, 11)
      setup.addMarble(0, 0, GREEN)
      setup.addMarble(0, 2, GREEN)
      setup.addMarble(0, 3, BLACK)
      setup.addMarble(1, 1, GREEN)
      setup.addMarble(1, 2, YELLOW)
      setup.addMarble(1, 3, BLACK)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 2, WHITE)
      setup.addMarble(2, 3, BLACK)
      setup.addMarble(3, 0, YELLOW)
      setup.addMarble(3, 3, WHITE)
      return setup
    case 24:
      setup = new Setup(4, 4, 12)
      setup.addMarble(0, 1, GREEN)
      setup.addMarble(0, 3, WHITE)
      setup.addMarble(1, 0, BLACK)
      setup.addMarble(1, 1, WHITE)
      setup.addMarble(1, 3, YELLOW)
      setup.addMarble(2, 0, GREEN)
      setup.addMarble(2, 1, GREEN)
      setup.addMarble(2, 2, BLACK)
      setup.addMarble(3, 0, YELLOW)
      setup.addMarble(3, 1, YELLOW)
      setup.addMarble(3, 2, BLACK)
      return setup
      // End of original levels.
    case 25:
      // Depth of 5.
      setup = new Setup(4, 5, 6)
      setup.addMarble(0, 1, RED)
      setup.addMarble(0, 2, YELLOW)
      setup.addMarble(1, 0, GREEN)
      setup.addMarble(1, 2, BLACK)
      setup.addMarble(1, 3, GREEN)
      setup.addMarble(2, 0, YELLOW)
      setup.addMarble(2, 2, GREEN)
      setup.addMarble(2, 3, YELLOW)
      setup.addMarble(3, 0, BLACK)
      setup.addMarble(3, 1, BLACK)
      setup.addMarble(3, 2, WHITE)
      setup.addMarble(3, 3, RED)
      setup.addMarble(4, 3, RED)
      return setup
    case 26:
      // Length of 5.
      setup = new Setup(5, 4)
      // Setup goal.
      setup.addMarbleRow(0, 0, GREEN)
      setup.addMarbleRow(1, 1, YELLOW)
      setup.addMarbleRow(2, 2, BLACK)
      setup.addMarble(3, 3, WHITE)
      setup.addMarble(3, 4, WHITE)
      // Perform moves.
      setup.addMove(0, 1)
      setup.addMove(1, 2)
      setup.addMove(1, 3)
      setup.addMove(2, 3)
      setup.addMove(2, 4)
      return setup
    default:
      setup = new Setup(4 + rndInt(2), 4 + rndInt(2))
      setup.setRandomGoal()
      setup.setRandomPlaceholders()
      setup.setRandomMoves(level ** .75)
      return setup
  }
}

export default makeSetup
