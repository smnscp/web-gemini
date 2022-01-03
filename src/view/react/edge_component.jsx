import React from "react";

export default class EdgeComponent extends React.Component {
  constructor(props) {
    super(props);
    console.debug("constructing EdgeComponent");
  }

  render() {
    console.debug("rendering EdgeComponent");
    const edge = this.props.edge;
    let classes = `edge edge-${this.props.index + 1} color-${edge.color}`;
    let button;
    if (edge.isMovable()) {
      classes += " movable";
      button = (
        <button onClick={() => edge.move() && this.props.onMove(edge)} />
      );
    }

    return <li className={classes}>{button}</li>;
  }
}
