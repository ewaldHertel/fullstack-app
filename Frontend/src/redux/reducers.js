import { combineReducers } from 'redux';
import customerReducer from './customer/customerReducer';

const rootReducer = combineReducers({
    customers: customerReducer,
});

export default rootReducer;