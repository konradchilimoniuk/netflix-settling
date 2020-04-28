import React from 'react'
import NumberFormat from 'react-number-format'

export default class Currency extends React.Component {
    render() {
        return <NumberFormat
                value={this.props.children}
                displayType='text'
                thousandSeparator=' '
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={false}
                suffix=' zł'
            />
    }
}