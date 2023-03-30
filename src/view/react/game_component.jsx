import React from "react";
import { GlobalHotKeys } from "react-hotkeys";
import Game from "../../model/game";
import RingComponent from "./ring_component.jsx";

export default class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    const level = +props.level || 1;
    this.game = new Game(level);
  }

  trackMove(edge) {
    this.game.trackMove(edge);
    this.forceUpdate();
  }

  undo() {
    this.game.undo();
    this.forceUpdate();
  }

  redo() {
    this.game.redo();
    this.forceUpdate();
  }

  reset() {
    this.game.reset();
    this.forceUpdate();
  }

  levelUp() {
    this.game.levelUp();
    this.forceUpdate();
    window.location.hash = `#level=${this.game.level}`;
  }

  render() {
    console.debug("rendering GameComponent");
    const keyMap = {
      UNDO: ["ctrl+z", "cmd+z"],
      REDO: ["shift+ctrl+z", "shift+cmd+z"],
    };
    const handlers = {
      UNDO: () => this.undo(),
      REDO: () => this.redo(),
    };
    return (
      <gemini-game class={`length-${this.game.ring.length}`}>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
        <RingComponent
          ring={this.game.ring}
          onMove={(edge) => this.trackMove(edge)}
        />
        <gemini-nav>
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
      </gemini-game>
    );
  }
}
