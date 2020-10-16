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

      return 0
  }
}

export default setupLevel
