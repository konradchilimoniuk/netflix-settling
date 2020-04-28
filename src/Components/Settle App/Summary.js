import React from 'react';
import { connect } from "react-redux"
import Currency from '../../Objects/Currency'
import Translate from '../../Languages/Translate'
import { setStartDate, setSubscriptionAmount } from '../../Data/Actions'
import PropertyEditor from '../../Objects/PropertyEditor'

import { MonthDifference } from '../../Objects/DateFormatter'

const Summary = (props) => {
    const numberOfPeople = props.people.items.filter(person => person.active === true).length + 1;
    const numberOfMonths = MonthDifference(new Date(props.subscriptionInfo.startDate), new Date(), true);
    const sumPayments = numberOfMonths * props.subscriptionInfo.amount;
    const sumReturns = props.returns.items.reduce((p,n) => p + n.amount, 0);

    const items = [
        {value: <PropertyEditor type="currency" onChange={props.setSubscriptionAmount}><Currency>{props.subscriptionInfo.amount}</Currency></PropertyEditor>, desc: "monthlyPayment"},
        {value: <PropertyEditor type="date" onChange={props.setStartDate}>{props.subscriptionInfo.startDate}</PropertyEditor>, desc: "startedAt"},
        {value: numberOfMonths, desc: "monthAmount"},
        {value: <Currency>{sumPayments}</Currency>, desc: "paymentSum"},
        {value: (numberOfPeople - 1), desc: "peopleAmount"},
        {value: <Currency>{sumPayments / numberOfPeople}</Currency>, desc: "totalPaymentPerPerson"},
        {value: <Currency>{props.subscriptionInfo.amount / numberOfPeople}</Currency>, desc: "monthlyPaymentPerPerson"},
        {value: (sumPayments - sumReturns - (sumPayments / numberOfPeople)) > 0 ? <span style={{color:"#aa0808"}}><Currency>{sumPayments - sumReturns - (sumPayments / numberOfPeople)}</Currency></span> : <Currency>{0}</Currency>, desc: "notReturnedAmount"}
    ];

    return (
        <div id="summary">
            <div id="summary-title"><Translate text="summary" /></div>
            <div id="stats">
                {items.map(item => (
                    <div className="item" key={item.desc}>
                        <div className="value">{item.value}</div>
                        <div className="desc"><Translate text={item.desc} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        subscriptionInfo: state.subscriptionInfo,
        people: state.people,
        returns: state.returns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStartDate: startDate => dispatch(setStartDate(startDate)),
        setSubscriptionAmount: amount => dispatch(setSubscriptionAmount(amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);