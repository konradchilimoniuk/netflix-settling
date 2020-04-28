import React from 'react'
import Translate from '../../Languages/Translate'
import { addPerson } from '../../Data/Actions'
import { connect } from 'react-redux';

class PersonForm extends React.Component {
    state = {
        value: ''
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit = (event) => {
        this.props.handleCloseForm();
        this.props.addPerson(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="content person-form">
                <div className="form-title"><Translate text="addPersonTitle" /></div>
                <input className="form-input" type="text" name="personName" value={this.state.value} maxLength={25} onChange={this.handleChange} />
                {this.state.value ? <button className="submit-button" type="button" onClick={this.handleSubmit}><Translate text="save" /></button> : null}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPerson: name => dispatch(addPerson(name))
    }
}

export default connect(null, mapDispatchToProps)(PersonForm);