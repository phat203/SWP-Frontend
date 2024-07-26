// reducers.js

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

const initialState = {
  customers: [],
  customer: null,
  loading: false,
  error: null
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_REQUEST:
    case GET_CUSTOMER_REQUEST:
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: null
      };

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        loading: false,
        error: null
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        loading: false,
        error: null
      };

    case GET_ALL_CUSTOMERS_FAILURE:
    case GET_CUSTOMER_FAILURE:
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default customerReducer;
