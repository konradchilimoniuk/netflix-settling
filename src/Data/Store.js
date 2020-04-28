import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './Reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export const persistor = persistStore(store);