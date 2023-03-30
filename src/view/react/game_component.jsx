import React from "react";
import Game from "../../model/game";
import NavComponent from "./nav_component.jsx";
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

  render() {
    return (
      <gemini-game class={`length-${this.game.ring.length}`}>
        <RingComponent
          ring={this.game.ring}
          onMove={(edge) => this.trackMove(edge)}
        />
        <NavComponent game={this.game} onAction={this.forceUpdate.bind(this)} />
      </gemini-game>
    );
  }
}
