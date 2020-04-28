import React, { Component } from 'react'
import Translate from '../Languages/Translate'

export class Tooltip extends Component {
    render() {
        return (
            <div className="tooltip">
                <Translate text={this.props.text} />
            </div>
        )
    }
}

export default Tooltip