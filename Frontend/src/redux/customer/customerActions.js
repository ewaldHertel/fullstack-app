import axios from 'axios';
import FormData from 'form-data'

import {
    GET_CUSTOMERS,
    ADD_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    UPLOAD_AVATAR
} from './customerTypes';

export const getCustomers = () => dispatch => {
    axios.get(`http://localhost:8000/api/`)
        .then(res => {
            dispatch({
                type: GET_CUSTOMERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const addCustomer = (data) => dispatch => {
    axios.post(`http://localhost:8000/api/`, data)
        .then(res => {
            dispatch({
                type: ADD_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const updateCustomer = (data) => dispatch => {
    axios.put(`http://localhost:8000/api/${data.id}`, data)
        .then(res => {
            dispatch({
                type: UPDATE_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const deleteCustomer = (id) => dispatch => {
    axios.delete(`http://localhost:8000/api/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_CUSTOMER,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

export const uploadFile = (file) => dispatch => {
    let form = new FormData();
    form.append('file', file);
    axios.post(`http://localhost:8000/upload/`, form, {
        headers: {
            'Content-Type': `multipart/form-data;`,
        }
    })
        .then(res => {
            dispatch({
                type: UPLOAD_AVATAR,
                payload: 'http://localhost:8000/upload/'+res.data.name
            });
        }).catch(err => console.log(err));
}