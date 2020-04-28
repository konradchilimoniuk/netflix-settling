import {
    SET_NOTIFICATION, HIDE_NOTIFICATION, REMOVE_NOTIFICATION,
    ADD_PERSON, EDIT_PERSON, REMOVE_PERSON, ADD_PEOPLE,
    ADD_RETURN, EDIT_RETURN, REMOVE_RETURN, REMOVE_RETURNS_BY_PERSON, ADD_RETURNS,
    TOGGLE_FORM,
    LOAD_FILE_REQUEST,
    INITIALIZE, EXIT_APP,
    SET_LANGUAGE,
    SET_START_DATE, SET_SUBSCRIPTION_AMOUNT, SET_SUBSCRIPTION_INFO
} from './ActionTypes'

import {
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATION_TYPE_SUCCESS
} from './NotificationTypes'

import { persistor } from './Store'

/*
 * Error Actions
 */

export function setNotification(type, message) {
    return {
        type: SET_NOTIFICATION,
        payload: {
            type,
            message
        }
    }
}

export function hideNotification(id) {
    return dispatch => {
        dispatch({
            type: HIDE_NOTIFICATION,
            payload: {
                id
            }
        });
        setTimeout(() => dispatch(removeNotification(id)), 300);
    }
}

export function removeNotification(id) {
    return {
        type: REMOVE_NOTIFICATION,
        payload: {
            id
        }
    }
}

/*
 * People Actions
 */

export function addPerson(name) {
    return dispatch => {
        dispatch({
            type: ADD_PERSON,
            payload: {
                name
            }
        });
        dispatch(setNotification(NOTIFICATION_TYPE_SUCCESS, "successAddedPerson"));
    }
}

export function editPerson(index, property, value) {
    return {
        type: EDIT_PERSON,
        payload: {
            index,
            property,
            value
        }
    }
}

export function removePerson(index) {
    return dispatch => {
        dispatch({
            type: REMOVE_PERSON,
            payload: {
                index
            }
        });

        dispatch(removeReturnsByPerson(index));
    }
}

export function addPeople(people) {
    return {
        type: ADD_PEOPLE,
        payload: {
            people
        }
    }
}

/*
 * Return Actions
 */

export function addReturn(personId, date, amount, comment) {
    return dispatch => {
        dispatch({
            type: ADD_RETURN,
            payload: {
                personId,
                date,
                amount,
                comment
            }
        })
        dispatch(setNotification(NOTIFICATION_TYPE_SUCCESS, "successAddedReturn"));
    }
}

export function editReturn(index, property, value) {
    return {
        type: EDIT_RETURN,
        payload: {
            index,
            property,
            value
        }
    }
}

export function removeReturn(index) {
    return {
        type: REMOVE_RETURN,
        payload: {
            index
        }
    }
}

export function removeReturnsByPerson(index) {
    return {
        type: REMOVE_RETURNS_BY_PERSON,
        payload: {
            index
        }
    }
}

export function addReturns(returns) {
    return {
        type: ADD_RETURNS,
        payload: {
            returns
        }
    }
}

/*
 * Form Actions
 */

export function toggleForm(form, options) {
    return {
        type: TOGGLE_FORM,
        payload: {
            form,
            options
        }
    }
}

/*
 * Load File Actions
 */

export function loadFileRequest() {
    return {
        type: LOAD_FILE_REQUEST,
        payload: {
            people: {
                isLoading: true
            },
            returns: {
                isLoading: true
            }
        }
    }
}

export function loadFileSuccess(data, message) {
    return dispatch => {
        dispatch(addPeople(data.people));
        dispatch(addReturns(data.returns));
        dispatch(setSubscriptionInfo(data.subscriptionInfo));
        dispatch(setNotification(NOTIFICATION_TYPE_SUCCESS, message));
        dispatch(initialize());
    }
}

export function loadFileError(message) {
    return dispatch => dispatch(setNotification(NOTIFICATION_TYPE_ERROR, message));
}

export function initialize() {
    return {
        type: INITIALIZE,
        payload: {
            isInitialized: true
        }
    }
}

export function startNew(message) {
    return dispatch => {
        dispatch(setNotification(NOTIFICATION_TYPE_SUCCESS, message));
        dispatch(initialize());
    }
}

export function exit() {
    return dispatch => {
        persistor.purge().then(() => {
            dispatch({ type: EXIT_APP })
            dispatch(setNotification("notification", "closedEditor"))
        });
    }
}

/*
 * Language Actions
 */

export function setLanguage(language) { 
    return {
        type: SET_LANGUAGE,
        payload: {
            language
        }
    }
}

/*
 * Subscription Actions
 */ 

export function setSubscriptionInfo(subscriptionInfo) {
    return {
        type: SET_SUBSCRIPTION_INFO,
        payload: {
            subscriptionInfo
        }
    }
}

export function setStartDate(startDate) {
    return {
        type: SET_START_DATE,
        payload: {
            startDate
        }
    }
}

export function setSubscriptionAmount(amount) {
    return {
        type: SET_SUBSCRIPTION_AMOUNT,
        payload: {
            amount
        }
    }
}