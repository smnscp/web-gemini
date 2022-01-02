import React from "react";
import classNames from "classnames";
import EdgeComponent from "./edge_component";

export default class RingComponent extends React.Component {
  render() {
    console.debug("rendering RingComponent");
    const inscribed = this.props.ring.inscribed;
    return (
      <div className={classNames("ring", { innermost: !inscribed })}>
        <ol className="edges">
          {this.props.ring.edges.map((edge, index) => (
            <EdgeComponent
              edge={edge}
              key={index}
              index={index}
              onMove={this.props.onMove}
            />
          ))}
        </ol>
        {inscribed && (
          <RingComponent ring={inscribed} onMove={this.props.onMove} />
        )}
      </div>
    );
  }
}
