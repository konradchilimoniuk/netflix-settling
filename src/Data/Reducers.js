import { v4 as uuid } from 'uuid'
import { PURGE } from 'redux-persist'

import {
    SET_NOTIFICATION, HIDE_NOTIFICATION, REMOVE_NOTIFICATION,
    ADD_PERSON, EDIT_PERSON, ADD_PEOPLE,
    ADD_RETURN, EDIT_RETURN, ADD_RETURNS,
    TOGGLE_FORM,
    REMOVE_PERSON,
    REMOVE_RETURN, REMOVE_RETURNS_BY_PERSON,
    INITIALIZE, EXIT_APP,
    SET_LANGUAGE,
    SET_START_DATE, SET_SUBSCRIPTION_AMOUNT, SET_SUBSCRIPTION_INFO
} from './ActionTypes'

//DIRECT EDITING - WHY DOESN'T IT WORK?
//let index = state.findIndex(item => item.index === action.index);
//state[index][action.property] = action.value;

const initialState = {
    isInitialized: false,
    language: {id: 'pl', name: 'Polish', text: 'PL'},
    activeForm: {
        form: '',
        options: undefined
    },
    notifications: [],
    subscriptionInfo: {
        startDate: "2018-12-13",
        amount: 52
    },
    people: {
        isLoading: false,
        items: []
    },
    returns: {
        isLoading: false,
        items: []
    }
}

function peopleReducer(state = initialState.people, action) {
    switch(action.type) {
        case ADD_PERSON:
            return {
                isLoading: false,
                items: [
                    ...state.items,
                    {
                        id: uuid(),
                        name: action.payload.name,
                        active: true
                    }
                ]
            };
        case EDIT_PERSON:
            return  {
                isLoading: false,
                items: state.items.map(
                    item => item.id === action.payload.index
                        ? Object.assign({}, item, {[action.payload.property]: action.payload.value})
                        : item
                )
            }
        case REMOVE_PERSON:
            return {
                isLoading: false,
                items: state.items.filter(item => item.id !== action.payload.index)
            }
        case ADD_PEOPLE:
            const { people } = action.payload;
            return {
                isLoading: false,
                items: people
            };
        case PURGE:
            return initialState.people;
        default:
            return state;
    }
}

function returnsReducer(state = initialState.returns, action) {
    switch(action.type) {
        case ADD_RETURN:
            return {
                isLoading: false,
                items: [
                    ...state.items,
                    {
                        id: uuid(),
                        personId: action.payload.personId,
                        date: action.payload.date,
                        amount: action.payload.amount,
                        comment: action.payload.comment
                    }
                ]
            };
        case EDIT_RETURN:
            return  {
                isLoading: false,
                items: state.items.map(
                    item => item.id === action.payload.index
                        ? Object.assign({}, item, {[action.payload.property]: action.payload.value})
                        : item
                )
            }
        case REMOVE_RETURN:
            return {
                isLoading: false,
                items: state.items.filter(item => item.id !== action.payload.index)
            }
        case REMOVE_RETURNS_BY_PERSON:
            return {
                isLoading: false,
                items: state.items.filter(item => item.personId !== action.payload.index)
            }
        case ADD_RETURNS:
            return {
                isLoading: false,
                items: action.payload.returns
            };
        case PURGE:
            return initialState.returns;
        default:
            return state;
    }
}

function formReducer(state = initialState.activeForm, action) {
    switch(action.type) {
        case TOGGLE_FORM:
            return action.payload;
        case PURGE:
            return initialState.activeForm;
        default:
            return state;
    }
}

function notificationReducer(state = initialState.notifications, action) {
    switch(action.type) {
        case SET_NOTIFICATION:
            return [
                ...state,
                {
                    id: uuid(),
                    type: action.payload.type,
                    message: action.payload.message,
                    isVisible: true
                }
            ];
        case HIDE_NOTIFICATION:
            return state.map(notification => notification.id === action.payload.id ? Object.assign({}, notification, {isVisible: false}) : notification);
        case REMOVE_NOTIFICATION:
            return state.filter(notification => notification.id !== action.payload.id);
        case PURGE:
            return initialState.notifications;
        default:
            return state;
    }
}

function initializerReducer(state = initialState.isInitialized, action) {
    switch(action.type) {
        case INITIALIZE:
            return action.payload.isInitialized;
        case PURGE:
            return initialState.isInitialized;
        default:
            return state;
    }
}

function languageReducer(state = initialState.language, action) {
    switch(action.type) {
        case SET_LANGUAGE:
            return action.payload.language;
        default:
            return state;
    }
}

function subscriptionInfoReducer(state = initialState.subscriptionInfo, action) {
    switch(action.type) {
        case SET_SUBSCRIPTION_INFO:
            return action.payload.subscriptionInfo;
        case SET_START_DATE:
            return Object.assign({}, state, { startDate: action.payload.startDate });
        case SET_SUBSCRIPTION_AMOUNT:
            return Object.assign({}, state, { amount: action.payload.amount });
        default:
            return state;
    }
}

function reducer(state = initialState, action) {
    if(action.type === EXIT_APP)
        state = Object.assign({}, initialState, {language: state.language });

    return {
        isInitialized: initializerReducer(state.isInitialized, action),
        language: languageReducer(state.language, action),
        activeForm: formReducer(state.activeForm, action),
        notifications: notificationReducer(state.notifications, action),
        subscriptionInfo: subscriptionInfoReducer(state.subscriptionInfo, action),
        people: peopleReducer(state.people, action),
        returns: returnsReducer(state.returns, action)
    }
}

export default reducer;