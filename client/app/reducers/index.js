import { combineReducers } from 'redux'

import counter from './counter';
import modal from './modal';

const rootReducer = combineReducers({
    modal,
    counter
})

export default rootReducer
