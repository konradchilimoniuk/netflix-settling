import React from 'react'
import Translate from '../../Languages/Translate'
import { addReturn } from '../../Data/Actions'
import { connect } from 'react-redux'
import {IMaskInput} from 'react-imask'
import { options } from '../../Objects/InputOptions'

class ReturnForm extends React.Component {
    state = {
        personId: '',
        date: '',
        amount: '',
        comment: ''
    }
    
    handleSubmit = (event) => {
        this.props.handleCloseForm();
        this.props.addReturn(
            this.props.activeForm.options.personId,
            this.state.date,
            parseFloat(this.state.amount),
            this.state.comment
        );
        event.preventDefault();
    }

    handleChange = (value, mask) => {
        this.setState({
            [mask.el.input.name]: value
        });
    }

    render() {
        return (
            <div className="content return-form">
                <div className="form-title"><Translate text="addReturnTitle" /></div>
                <div className="form-section">
                    <b>{this.props.people.find(person => person.id === this.props.activeForm.options.personId).name + " "}</b> <Translate text="paid" /> {"   "}
                    <IMaskInput className="form-input" name="amount" {...options['currency']} value={this.state.amount} onAccept={(value, mask) => this.handleChange(value, mask)} />
                    {"   "} <Translate text="onDay" /> {"   "}
                    <IMaskInput className="form-input" name="date" {...options['date']} value={this.state.date} onAccept={(value, mask) => this.handleChange(value, mask)} />
                    {"   "} <Translate text="forComment" /> {"   "}
                    <IMaskInput className="form-input comment" name="comment" {...options['text']} value={this.state.comment} onAccept={(value, mask) => this.handleChange(value, mask)} />
                    .
                </div>
                {this.state.amount && this.state.date && this.state.comment ? <button className="submit-button" type="button" onClick={this.handleSubmit}><Translate text="save" /></button> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeForm: state.activeForm,
        startDate: state.subscriptionInfo.startDate,
        people: state.people.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReturn: (personId, date, amount, comment) => dispatch(addReturn(personId, date, amount, comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnForm);