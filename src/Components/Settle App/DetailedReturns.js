import React from 'react'
import Currency from '../../Objects/Currency'
import ReturnsList from './ReturnsList'
import Translate from '../../Languages/Translate'
import { connect } from 'react-redux';
import { MonthDifference } from '../../Objects/DateFormatter'
import PropertyEditor from '../../Objects/PropertyEditor'
import { toggleForm, editPerson, removePerson } from '../../Data/Actions';

class DetailedReturns extends React.Component {
    state = {
        active: null
    }

    dropdown(id) {
        this.setState({
            active: this.state.active === id ? null : id
        })
    }

    handleAddReturn = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.toggleForm(e.target.name, {personId: id});
    }

    handleRemovePerson = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.removePerson(id);
    }

    render() {
        var numberOfPeople = this.props.people.items.filter(person => person.active === true).length + 1;
        var numberOfMonths = MonthDifference(new Date(this.props.subscriptionInfo.startDate), new Date(), true);
        var sumPayments = numberOfMonths * this.props.subscriptionInfo.amount;
        var paymentsPerPerson = sumPayments / numberOfPeople;
    
        return (
            <div id="detailed-returns">
                <div id="detailed-returns-header">
                    <div id="detailed-returns-title">
                        <Translate text="returnDetails" />
                    </div>
                    <button className="add-person-button" name="addPerson" type="button" onClick={e => this.props.toggleForm(e.target.name)}>
                        <Translate text="addPerson" />
                    </button>
                </div>
                <table id="detailed-returns-list">
                    <thead id="detailed-returns-list-header">
                        <tr>
                            <th><Translate text="personName" /></th>
                            <th><Translate text="returned" /></th>
                            <th><Translate text="toBeReturned" /></th>
                            <th><Translate text="actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.people.items.map((person) => {
                            var sumPerPerson = this.props.returns.items.reduce((p,n) => (person.id === n.personId ? p + n.amount : p), 0);
                            var numberOfReturnsPerPerson = this.props.returns.items.filter(returnObj => returnObj.personId === person.id).length;

                            return [
                                <tr key={person.id} onClick={() => this.dropdown(person.id)} className={"detailed-returns-list-row " + (numberOfReturnsPerPerson > 0 ? "has-returns" : null)}>
                                    <td><PropertyEditor id={person.id} type='text' property='name' onChange={this.props.editPerson}>{person.name}</PropertyEditor></td>
                                    <td><Currency>{sumPerPerson}</Currency></td>
                                    <td><Currency>{paymentsPerPerson - sumPerPerson}</Currency></td>
                                    <td className="actions">
                                        <button className="action-button" name="addReturn" type="button" onClick={e => this.handleAddReturn(e, person.id)}>
                                            <Translate text="addReturn" />
                                        </button>
                                        <button className="action-button secondary" name="removePerson" type="button" onClick={e => this.handleRemovePerson(e, person.id)}>
                                            <Translate text="removePerson" />
                                        </button>
                                    </td>
                                </tr>,
                                <React.Fragment key={person.id + "-additional-info"}>
                                    {
                                        numberOfReturnsPerPerson > 0
                                        &&
                                        <tr>
                                            <td colSpan="4" className="additional-info-container">
                                                <div className={person.id === this.state.active ? "additional-info active" : "additional-info"}>
                                                    <ReturnsList personId={person.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    }  
                                </React.Fragment>
                                
                            ];
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subscriptionInfo: state.subscriptionInfo,
        people: state.people,
        returns: state.returns
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleForm: (form, options) => dispatch(toggleForm(form, options)),
        editPerson: (index, property, value) => dispatch(editPerson(index, property, value)),
        removePerson: index => dispatch(removePerson(index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailedReturns);