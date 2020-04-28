import { createSelector } from 'reselect';

const getPeople = state => state.people.items;
const getReturns = state => state.returns.items;

export const getReturnsByPerson = createSelector(
    getReturns,
    returns => returns.filter(returnObj => returnObj.personId === ownProps.personId)
)