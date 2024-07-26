// actions.js

import { api } from '../../config/api';
import {
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE
} from './Actiontype';

// Action creators for fetching all customers
export const getAllCustomers = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_CUSTOMERS_REQUEST });

  try {
    const response = await api.get('/api/customer', {
      headers: {
          Authorization: `Bearer ${jwt}`,
      },
  });
    dispatch({
      type: GET_ALL_CUSTOMERS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log("jwt",jwt)
    console.log("error",error)
    dispatch({
      type: GET_ALL_CUSTOMERS_FAILURE,
      error: error.message
    });
  }
};

// Action creator for fetching a single customer by id
export const getCustomerById = (id, jwt) => async (dispatch) => {
  dispatch({ type: GET_CUSTOMER_REQUEST });

  try {
    const response = await api.get(`/api/customer/${id}`, {
      headers: {
          Authorization: `Bearer ${jwt}`,
      },
  });
    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAILURE,
      error: error.message
    });
  }
};

// Action creator for updating a customer
export const updateCustomer = (id, updatedCustomer, jwt) => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_REQUEST });

  try {
    const response = await api.put(`/api/customer/${id}`, updatedCustomer, {
      headers: {
          Authorization: `Bearer ${jwt}`,
      },
  });
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAILURE,
      error: error.message
    });
  }
};
