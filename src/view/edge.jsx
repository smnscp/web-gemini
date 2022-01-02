import React from 'react'
import classNames from 'classnames'

export default class EdgeComponent extends React.Component {
  constructor(props) {
    super(props)
    console.debug('constructing EdgeComponent')
  }

  render() {
    console.debug('rendering EdgeComponent')
    const edge = this.props.edge
    const classes = classNames(
      'edge',
      `edge-${this.props.index+1}`,
      `color-${edge.color}`,
      {movable: edge.isMovable()}
    )
    const onClick = edge.isMovable() ? (() => {
      if (edge.move())
        this.props.onMove(edge)
    }) : undefined

    return <li className={classes}>
      {onClick && <button onClick={onClick} />}
    </li>
  }
}
