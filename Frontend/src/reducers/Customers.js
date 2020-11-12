import {
    GET_CUSTOMERS, 
    GET_CUSTOMER, 
    UPDATE_CUSTOMER, 
    DELETE_CUSTOMER,
    ADD_CUSTOMER,
    UPLOAD_AVATAR
} from '../actions/types';

const initialState = {
    customers: [],
    customer: [],
    file: []
}

const Customers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            }
        case GET_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: action.payload
            }
        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: action.payload
            }
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: action.payload 
            }
        case UPLOAD_AVATAR:
            return {
                ...state,
                file: action.payload
            }    
        default:
            return state;
    }
}

export default Customers;