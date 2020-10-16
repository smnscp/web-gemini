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
      pivotal.prev.side.color = GREEN
      pivotal.next.next.side.side.color = GREEN

      pivotal.next.side.color = YELLOW
      pivotal.next.next.color = YELLOW
      pivotal.prev.side.side.color = YELLOW

      pivotal.next.next.side.color = BLACK
      pivotal.next.side.side.color = BLACK
      pivotal.next.side.side.side.color = BLACK

      pivotal.next.next.side.side.side.color = WHITE

      return 3
    case 2:
      pivotal.next.color = GREEN
      pivotal.side.side.color = GREEN
      pivotal.prev.side.color = GREEN

      pivotal.prev.color = YELLOW
      pivotal.next.next.side.color = YELLOW
      pivotal.next.next.side.side.color = YELLOW

      pivotal.next.side.color = BLACK
      pivotal.side.side.side.color = BLACK
      pivotal.prev.side.side.side.color = BLACK

      pivotal.prev.side.side.color = WHITE

      return 4
    case 3:
      pivotal.prev.color = GREEN
      pivotal.next.next.side.color = GREEN
      pivotal.next.next.side.side.side.color = GREEN

      pivotal.next.side.color = YELLOW
      pivotal.next.side.side.color = YELLOW
      pivotal.side.side.side.color = YELLOW

      pivotal.next.color = BLACK
      pivotal.side.side.color = BLACK
      pivotal.prev.side.side.color = BLACK

      pivotal.side.color = WHITE
      pivotal.next.next.color = WHITE

      return 4
    case 4:
      pivotal.setRowColor(GREEN)

      pivotal.next.side.color = YELLOW
      pivotal.side.side.color = YELLOW
      pivotal.prev.side.side.side.color = YELLOW

      pivotal.prev.color = BLACK
      pivotal.next.next.side.color = BLACK
      pivotal.next.next.side.side.color = BLACK

      pivotal.prev.side.side.color = WHITE
      pivotal.side.side.side.color = WHITE

      return 5
    case 5:
      pivotal.side.color = GREEN
      pivotal.side.side.color = GREEN
      pivotal.prev.color = GREEN

      pivotal.next.next.side.color = YELLOW
      pivotal.next.next.side.side.color = YELLOW
      pivotal.next.side.side.side.color = YELLOW

      pivotal.next.color = BLACK
      pivotal.next.next.color = BLACK
      pivotal.side.side.side.color = BLACK

      pivotal.next.side.color = WHITE
      pivotal.prev.side.side.color = WHITE

      return 5
    case 6:
      pivotal.side.color = GREEN
      pivotal.next.color = GREEN
      pivotal.side.side.color = GREEN

      pivotal.next.side.side.setRowColor(YELLOW)

      pivotal.color = BLACK
      pivotal.prev.side.color = BLACK
      pivotal.prev.prev.side.color = BLACK

      pivotal.next.next.side.side.side.color = WHITE

      return 5
    case 7:
      pivotal.color = BLACK
      pivotal.next.color = YELLOW
      pivotal.next.next.next.side.side.color = BLACK
      pivotal.next.next.side.color = GREEN
      pivotal.next.next.side.side.color = GREEN
      pivotal.next.next.side.side.side.color = BLACK
      pivotal.next.side.color = GREEN
      pivotal.next.side.side.color = WHITE
      pivotal.next.side.side.side.color = WHITE
      pivotal.side.color = YELLOW
      pivotal.side.side.side.color = YELLOW
      return 5
    case 8:
      pivotal.next.next.color = YELLOW
      pivotal.next.next.next.color = BLACK
      pivotal.next.next.next.side.color = BLACK
      pivotal.next.next.next.side.side.side.color = GREEN
      pivotal.next.next.side.color = YELLOW
      pivotal.next.next.side.side.color = WHITE
      pivotal.next.next.side.side.side.color = GREEN
      pivotal.next.side.side.color = GREEN
      pivotal.side.color = BLACK
      pivotal.side.side.color = YELLOW
      return 6
    case 25:
      pivotal.side.color = GREEN
      pivotal.prev.side.color = GREEN
      pivotal.next.next.side.side.color = GREEN

      pivotal.side.side.color = YELLOW
      pivotal.next.next.color = YELLOW
      pivotal.prev.side.side.color = YELLOW

      pivotal.next.next.side.color = BLACK
      pivotal.side.side.side.color = BLACK
      pivotal.next.side.side.side.color = BLACK

      pivotal.next.color = RED
      pivotal.prev.side.side.side.color = RED
      pivotal.prev.side.side.side.side.color = RED

      pivotal.next.next.side.side.side.color = WHITE

      return 6
    case 26:
      pivotal.setRowColor(GREEN)
      pivotal.next.side.setRowColor(YELLOW)
      pivotal.next.next.side.side.setRowColor(BLACK)

      pivotal.next.next.next.side.side.side.color = WHITE
      pivotal.next.next.next.next.side.side.side.color = WHITE

      pivotal.next.move()
      pivotal.next.next.side.move()
      pivotal.next.next.side.next.side.move()
      pivotal.prev.side.move()
      pivotal.prev.prev.side.side.move()

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
