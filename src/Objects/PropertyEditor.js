import React from 'react'
import { IMaskInput } from 'react-imask'
import { options } from './InputOptions'
import { Tooltip } from './Tooltip'

class PropertyEditor extends React.Component {
    constructor(props) {
        super(props);

        let value;
        if(props.children instanceof Object) value = props.children.props.children;
        else value = props.children;

        this.state = {
            initialValue: value,
            value: value,
            activating: false,
            active: false
        }

        this.options = options[props.type];
    }

    onChange = (value) => {
        this.setState({ value: value });
    }

    onKeyDown = e => {
        if (e.key === "Escape") {
            this.setState({ value: this.state.initialValue });
            this.deactivateEditor();
        } else if (e.key === "Enter") {
            if(this.catchInvalidDate()) {
                this.setState({ value: this.state.initialValue });
                this.deactivateEditor();
                return;
            }
            this.handleChangedValue();
            this.deactivateEditor();
        }

    }

    onBlur = () => {
        if(this.catchInvalidDate()) {
            this.setState({ value: this.state.initialValue });
            this.deactivateEditor();
            return;
        }
        this.handleChangedValue();
        this.deactivateEditor();
    }

    activateEditor = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({activating: true, active: true});
    }

    deactivateEditor = () => {
        this.setState({active: false});
        setTimeout(() => this.setState({activating: false}), 1);
    }

    handleChangedValue = () => {
        console.log(this.state.value);
        if(this.state.value === '') {
            this.setState({ value: this.state.initialValue });
        } else {
            let value;

            if(this.props.type.localeCompare("number") === 0 || this.props.type.localeCompare("currency") === 0)
                value = parseFloat(this.state.value);
            else
                value = this.state.value;

            if(this.props.id === undefined && this.props.property === undefined)
                this.props.onChange(value);
            else
                this.props.onChange(this.props.id, this.props.property, value);
            this.setState({ initialValue: value + "", value: value + ""  });
        }
    }

    catchInvalidDate = () => {
        if(this.props.type.localeCompare("date") !== 0)
            return false;

        return !(new Date(this.state.value) instanceof Date && !isNaN(new Date(this.state.value)) && this.state.value.length === 10);
    }

    render() {
        return (
            <div className="property-editor" onClick={this.activateEditor} onBlur={this.onBlur} onKeyDown={this.onKeyDown}>
                {this.state.active
                    ? <IMaskInput
                        name={this.props.property}
                        value={this.state.value + ""}
                        onAccept={(value) => this.onChange(value)}
                        {...this.options}
                        autoFocus
                        className="input"
                        />
                    : <div className={this.state.activating ? "content activated" : "content"}>{this.props.children}</div>}
                <Tooltip text="tooltipChangeValue" />
            </div>
        );
    }
}

export default PropertyEditor;