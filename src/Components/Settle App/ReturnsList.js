import React from 'react';
import Currency from '../../Objects/Currency'
import Translate from '../../Languages/Translate'
import { connect } from 'react-redux';
import PropertyEditor from '../../Objects/PropertyEditor'
import { editReturn, removeReturn } from '../../Data/Actions';

class ReturnsList extends React.Component {
  handleRemovePerson = (e, id) => {
    e.preventDefault();
    this.props.removeReturn(id);
  }

  render() {
    return (
      <table className="returns-list">
        <thead>
          <tr>
            <th><Translate text="returnDate" /></th>
            <th><Translate text="amount" /></th>
            <th className="comment"><Translate text="comment" /></th>
            <th><Translate text="actions" /></th>
          </tr>
        </thead>
        <tbody>
          {this.props.returns.items.map(returnObj => (
            <tr key={returnObj.id}>
                <td><PropertyEditor id={returnObj.id} type={'date'} property={'date'} onChange={this.props.editReturn}>{returnObj.date}</PropertyEditor></td>
                <td><PropertyEditor id={returnObj.id} type={'currency'} property={'amount'} onChange={this.props.editReturn}><Currency>{returnObj.amount}</Currency></PropertyEditor></td>
                <td className="comment"><PropertyEditor id={returnObj.id} type={'text'} property={'comment'} onChange={this.props.editReturn}>{returnObj.comment}</PropertyEditor></td>
                <td className="actions">
                  <button className="action-button secondary" name="removeReturn" type="button" onClick={e => this.handleRemovePerson(e, returnObj.id)}>
                    <Translate text="removeReturn" />
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    returns: {
      isLoading: state.returns.isLoading,
      items: state.returns.items.filter(returnObj => returnObj.personId === ownProps.personId)
    }
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      editReturn: (index, property, value) => dispatch(editReturn(index, property, value)),
      removeReturn: index => dispatch(removeReturn(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnsList);