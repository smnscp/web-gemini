const WHITE = -1
const GREEN = 1
const YELLOW = 2
const BLACK = 3
const RED = 4

/**
 * Setup a given level.
 * @param pivotal The edge from where we start navigating.
 * @param level The level’s number.
 * @return Number of moves to solve this level.
 */
const setupLevel = (pivotal, level) => {
  switch (level) {
    case 1:
      pivotal.color = GREEN
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = BLACK
      pivotal.walkInto(2).walkAround(2).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = WHITE
      return 3
    case 2:
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(3).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = BLACK
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = GREEN
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = YELLOW
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(3).color = BLACK
      return 4
    case 3:
      pivotal.walkAround(1).color = BLACK
      pivotal.walkAround(2).color = WHITE
      pivotal.walkAround(3).color = GREEN
      pivotal.walkInto(1).color = WHITE
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = GREEN
      pivotal.walkInto(2).color = BLACK
      pivotal.walkInto(2).walkAround(1).color = YELLOW
      pivotal.walkInto(2).walkAround(3).color = BLACK
      pivotal.walkInto(3).color = YELLOW
      pivotal.walkInto(3).walkAround(2).color = GREEN
      return 4
    case 4:
      pivotal.setRowColor(GREEN)
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(2).color = BLACK
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).color = WHITE
      pivotal.walkInto(3).walkAround(3).color = YELLOW
      return 5
    case 5:
      pivotal.walkAround(1).color = BLACK
      pivotal.walkAround(2).color = BLACK
      pivotal.walkAround(3).color = GREEN
      pivotal.walkInto(1).color = GREEN
      pivotal.walkInto(1).walkAround(1).color = WHITE
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = YELLOW
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(1).color = YELLOW
      return 5
    case 6:
      pivotal.color = BLACK
      pivotal.walkAround(1).color = GREEN
      pivotal.walkInto(1).color = GREEN
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).setRowColor(YELLOW)
      pivotal.walkInto(3).walkAround(2).color = WHITE
      return 5
    case 7:
      pivotal.color = BLACK
      pivotal.walkAround(1).color = YELLOW
      pivotal.walkInto(1).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = GREEN
      pivotal.walkInto(1).walkAround(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = WHITE
      pivotal.walkInto(2).walkAround(2).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = BLACK
      pivotal.walkInto(3).color = YELLOW
      pivotal.walkInto(3).walkAround(1).color = WHITE
      pivotal.walkInto(3).walkAround(2).color = BLACK
      return 5
    case 8:
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).color = BLACK
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = WHITE
      pivotal.walkInto(3).walkAround(2).color = GREEN
      pivotal.walkInto(3).walkAround(3).color = GREEN
      return 6
    case 9:
      pivotal.walkAround(1).color = YELLOW
      pivotal.walkAround(2).color = GREEN
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(1).color = WHITE
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).walkAround(1).color = GREEN
      pivotal.walkInto(3).walkAround(2).color = GREEN
      return 6
    case 10:
      pivotal.color = BLACK
      pivotal.walkAround(1).color = YELLOW
      pivotal.walkInto(1).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = WHITE
      pivotal.walkInto(1).walkAround(3).color = GREEN
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).color = WHITE
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = BLACK
      return 6
    case 11:
      pivotal.color = BLACK
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = WHITE
      pivotal.walkInto(2).walkAround(2).color = BLACK
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).walkAround(3).color = GREEN
      return 6
    case 12:
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkInto(1).color = GREEN
      pivotal.walkInto(1).walkAround(1).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = WHITE
      pivotal.walkInto(2).walkAround(1).color = BLACK
      pivotal.walkInto(2).walkAround(2).color = YELLOW
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).color = GREEN
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = WHITE
      return 7
    case 13:
      pivotal.color = BLACK
      pivotal.walkAround(2).color = GREEN
      pivotal.walkAround(3).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = WHITE
      pivotal.walkInto(1).walkAround(2).color = GREEN
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = BLACK
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = WHITE
      pivotal.walkInto(3).walkAround(2).color = YELLOW
      pivotal.walkInto(3).walkAround(3).color = YELLOW
      return 7
    case 14:
      pivotal.color = YELLOW
      pivotal.walkAround(1).color = BLACK
      pivotal.walkInto(1).color = YELLOW
      pivotal.walkInto(1).walkAround(1).color = WHITE
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = GREEN
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(1).color = GREEN
      return 7
    case 15:
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(2).color = BLACK
      pivotal.walkAround(3).color = YELLOW
      pivotal.walkInto(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = WHITE
      pivotal.walkInto(2).walkAround(1).color = WHITE
      pivotal.walkInto(2).walkAround(2).color = BLACK
      pivotal.walkInto(2).walkAround(3).color = GREEN
      pivotal.walkInto(3).walkAround(2).color = YELLOW
      pivotal.walkInto(3).walkAround(3).color = GREEN
      return 7
    case 16:
      pivotal.color = WHITE
      pivotal.walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = BLACK
      pivotal.walkInto(1).walkAround(3).setRowColor(GREEN)
      pivotal.walkInto(2).walkAround(1).setRowColor(YELLOW)
      pivotal.walkInto(3).color = WHITE
      pivotal.walkInto(3).walkAround(3).color = BLACK
      return 8
    case 17:
      pivotal.color = GREEN
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).color = WHITE
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = WHITE
      pivotal.walkInto(3).color = YELLOW
      pivotal.walkInto(3).walkAround(2).color = BLACK
      return 8
    case 18:
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = GREEN
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = WHITE
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(1).color = BLACK
      pivotal.walkInto(2).walkAround(2).color = YELLOW
      pivotal.walkInto(3).color = WHITE
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = GREEN
      return 8
    case 19:
      pivotal.color = GREEN
      pivotal.walkAround(3).color = WHITE
      pivotal.walkInto(1).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = WHITE
      return 9
    case 20:
      pivotal.color = GREEN
      pivotal.walkAround(2).color = WHITE
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).color = GREEN
      pivotal.walkInto(1).walkAround(1).color = YELLOW
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = BLACK
      pivotal.walkInto(2).walkAround(3).color = WHITE
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(1).color = YELLOW
      return 9
    case 21:
      pivotal.color = YELLOW
      pivotal.walkAround(1).color = BLACK
      pivotal.walkInto(1).color = BLACK
      pivotal.walkInto(1).walkAround(2).color = WHITE
      pivotal.walkInto(1).walkAround(3).color = YELLOW
      pivotal.walkInto(2).walkAround(1).setRowColor(GREEN)
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = WHITE
      return 10
    case 22:
      pivotal.walkAround(2).color = WHITE
      pivotal.walkAround(3).color = YELLOW
      pivotal.walkInto(1).color = BLACK
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = GREEN
      pivotal.walkInto(2).color = BLACK
      pivotal.walkInto(2).walkAround(1).color = BLACK
      pivotal.walkInto(2).walkAround(2).color = GREEN
      pivotal.walkInto(3).color = WHITE
      pivotal.walkInto(3).walkAround(1).color = YELLOW
      pivotal.walkInto(3).walkAround(2).color = GREEN
      return 10
    case 23:
      pivotal.color = GREEN
      pivotal.walkAround(2).color = GREEN
      pivotal.walkAround(3).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = GREEN
      pivotal.walkInto(1).walkAround(2).color = YELLOW
      pivotal.walkInto(1).walkAround(3).color = BLACK
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(2).color = WHITE
      pivotal.walkInto(2).walkAround(3).color = BLACK
      pivotal.walkInto(3).color = YELLOW
      pivotal.walkInto(3).walkAround(3).color = WHITE
      return 11
    case 24:
      pivotal.walkAround(1).color = GREEN
      pivotal.walkAround(3).color = WHITE
      pivotal.walkInto(1).color = BLACK
      pivotal.walkInto(1).walkAround(1).color = WHITE
      pivotal.walkInto(1).walkAround(3).color = YELLOW
      pivotal.walkInto(2).color = GREEN
      pivotal.walkInto(2).walkAround(1).color = GREEN
      pivotal.walkInto(2).walkAround(2).color = BLACK
      pivotal.walkInto(3).color = YELLOW
      pivotal.walkInto(3).walkAround(1).color = YELLOW
      pivotal.walkInto(3).walkAround(2).color = BLACK
      return 12
      // End of original levels.
    case 25:
      // Depth of 5.
      pivotal.walkAround(1).color = RED
      pivotal.walkAround(2).color = YELLOW
      pivotal.walkInto(1).color = GREEN
      pivotal.walkInto(1).walkAround(2).color = BLACK
      pivotal.walkInto(1).walkAround(3).color = GREEN
      pivotal.walkInto(2).color = YELLOW
      pivotal.walkInto(2).walkAround(2).color = GREEN
      pivotal.walkInto(2).walkAround(3).color = YELLOW
      pivotal.walkInto(3).color = BLACK
      pivotal.walkInto(3).walkAround(1).color = BLACK
      pivotal.walkInto(3).walkAround(2).color = WHITE
      pivotal.walkInto(3).walkAround(3).color = RED
      pivotal.walkInto(4).walkAround(3).color = RED
      return 6
    case 26:
      // Length of 5.
      // Setup goal.
      pivotal.setRowColor(GREEN)
      pivotal.walkInto(1).walkAround(1).setRowColor(YELLOW)
      pivotal.walkInto(2).walkAround(2).setRowColor(BLACK)
      pivotal.walkInto(3).walkAround(3).color = WHITE
      pivotal.walkInto(3).walkAround(4).color = WHITE
      // Perform moves.
      pivotal.walkAround(1).move()
      pivotal.walkInto(1).walkAround(2).move()
      pivotal.walkInto(1).walkAround(4).move()
      pivotal.walkInto(2).walkAround(3).move()
      pivotal.walkInto(2).walkAround(3).move()
      return 5
    default:
      return setupRandomLevel(pivotal, level ** .75 )
  }
}

const rndInt = cap => Math.floor(Math.random() * cap)

const setupRandomGoal = (pivotal) => {
  const length = pivotal.getLength()
  let edge = pivotal.walkAround(rndInt(length))
  let colors = [...Array(pivotal.getDepth()).keys()].slice(1)
  while (colors.length) {
    edge = edge.walkAround(rndInt(length - 2))
    let colorIndex = rndInt(colors.length)
    edge.setRowColor(colors[colorIndex])
    colors.splice(colorIndex, 1)
    edge = edge.side.next
  }
}

const placeRandomPlaceholders = (pivotal, min = 1, max = 2) => {
  let tries = min + max
  let placed = 0

  while (placed < min || tries > 0 && placed < max) {
    const edge = pivotal.goToRandom()

    if (!edge.color) {
      edge.color = WHITE
      ++placed
    }
    --tries
  }
}

const performRandomMoves = (pivotal, min = 3, max = 7) => {
  let tries = (min + max) * pivotal.getLength()
  let moves = 0
  let lastMoved

  while (moves < min || tries > 0 && moves < max) {
    const edge = pivotal.goToRandom()

    if (edge !== lastMoved && edge.move()) {
      ++moves
      lastMoved = edge
    }
    --tries
  }

  return moves
}

const setupRandomLevel = (pivotal, moves) => {
  setupRandomGoal(pivotal)
  placeRandomPlaceholders(pivotal)
  return performRandomMoves(pivotal, moves, moves)
}

export default setupLevel
