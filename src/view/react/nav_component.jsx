import React from "react";
import { GlobalHotKeys } from "react-hotkeys";

export default class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
    this.requireUpdate = props.onAction;
  }

  undo() {
    this.game.undo();
    this.requireUpdate();
  }

  redo() {
    this.game.redo();
    this.requireUpdate();
  }

  reset() {
    this.game.reset();
    this.requireUpdate();
  }

  levelUp() {
    this.game.levelUp();
    this.requireUpdate();
    window.location.hash = `#level=${this.game.level}`;
  }

  render() {
    const keyMap = {
      UNDO: ["ctrl+z", "cmd+z"],
      REDO: ["shift+ctrl+z", "shift+cmd+z"],
    };
    const handlers = {
      UNDO: () => this.undo(),
      REDO: () => this.redo(),
    };
    return (
      <gemini-nav>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
        <p>Level: {this.game.level}</p>
        <p>Moves: {this.game.moves}</p>
        {this.game.ring.isSolved() ? (
          <button className="primary text" onClick={() => this.levelUp()}>
            Level up!
          </button>
        ) : (
          <>
            <button
              disabled={!this.game.movedEdges.length}
              className="pict"
              onClick={() => this.undo()}
              title="Undo"
            >
              ↶
            </button>
            <button
              disabled={!this.game.undoneEdges.length}
              className="pict"
              onClick={() => this.redo()}
              title="Redo"
            >
              ↷
            </button>
            <button
              disabled={!this.game.movedEdges.length}
              className="pict"
              onClick={() => this.reset()}
              title="Reset"
            >
              ↺
            </button>
          </>
        )}
      </gemini-nav>
    );
  }
}
