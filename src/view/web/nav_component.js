export default class NavComponent extends HTMLElement {
  constructor() {
    super();

    document.addEventListener("keydown", (event) => {
      if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
        event.shiftKey ? this.redo() : this.undo();
      }
    });

    this.levelIndicator = document.createElement("p");
    this.movesIndicator = document.createElement("p");
    this.levelUpButton = document.createElement("button");
    this.levelUpButton.textContent = "Level up!";
    this.levelUpButton.className = "primary text";
    this.levelUpButton.onclick = () => this.levelUp();
    this.undoButton = document.createElement("button");
    this.undoButton.textContent = "↶";
    this.undoButton.title = "Undo";
    this.undoButton.className = "pict";
    this.undoButton.onclick = () => this.undo();
    this.redoButton = document.createElement("button");
    this.redoButton.textContent = "↷";
    this.redoButton.title = "Redo";
    this.redoButton.className = "pict";
    this.redoButton.onclick = () => this.redo();
    this.resetButton = document.createElement("button");
    this.resetButton.textContent = "↺";
    this.resetButton.title = "Reset";
    this.resetButton.className = "pict";
    this.resetButton.onclick = () => this.reset();
  }

  connectedCallback() {
    this.appendChild(this.levelIndicator);
    this.appendChild(this.movesIndicator);
    this.appendChild(this.levelUpButton);
    this.appendChild(this.undoButton);
    this.appendChild(this.redoButton);
    this.appendChild(this.resetButton);
  }

  updateState() {
    this.levelIndicator.textContent = `Level: ${this.game.level}`;
    this.movesIndicator.textContent = `Moves: ${this.game.moves}`;
    const isSolved = this.game.ring.isSolved();
    this.levelUpButton.style.display = isSolved ? "initial" : "none";
    this.undoButton.style.display = isSolved ? "none" : "initial";
    this.redoButton.style.display = isSolved ? "none" : "initial";
    this.resetButton.style.display = isSolved ? "none" : "initial";
    this.undoButton.disabled = !this.game.movedEdges.length;
    this.redoButton.disabled = !this.game.undoneEdges.length;
    this.resetButton.disabled = !this.game.movedEdges.length;
  }

  undo() {
    this.game.undo();
    this.updateState();
    this.previousElementSibling.updateState();
  }

  redo() {
    this.game.redo();
    this.updateState();
    this.previousElementSibling.updateState();
  }

  reset() {
    this.game.reset();
    this.updateState();
    this.previousElementSibling.updateState();
  }

  levelUp() {
    this.game.levelUp();
    this.parentElement.reload();
    window.location.hash = `#level=${this.game.level}`;
  }
}
