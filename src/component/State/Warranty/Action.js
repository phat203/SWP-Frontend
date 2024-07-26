// actions/warrantyActions.js

import { api } from '../../config/api';
import {
  GET_WARRANTYS_REQUEST,
  GET_WARRANTYS_SUCCESS,
  GET_WARRANTYS_FAILURE,
  GET_WARRANTY_BY_ORDER_ID_REQUEST,
  GET_WARRANTY_BY_ORDER_ID_SUCCESS,
  GET_WARRANTY_BY_ORDER_ID_FAILURE,
  GET_WARRANTY_BY_ID_REQUEST,
  GET_WARRANTY_BY_ID_SUCCESS,
  GET_WARRANTY_BY_ID_FAILURE
} from './ActionType';

// Action creators for getting all warranties
export const getWarranties = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_WARRANTYS_REQUEST });

    try {
      const response = await api.get('/api/warranties', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      dispatch({
        type: GET_WARRANTYS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_WARRANTYS_FAILURE,
        payload: error.message
      });
    }
  };
};

// Action creators for getting warranty by order ID
export const getWarrantyByOrderId = (orderId, jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_WARRANTY_BY_ORDER_ID_REQUEST });

    try {
      const response = await api.get(`/api/warranties/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      dispatch({
        type: GET_WARRANTY_BY_ORDER_ID_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_WARRANTY_BY_ORDER_ID_FAILURE,
        payload: error.message
      });
    }
  };
};

// Action creators for getting warranty by ID
export const getWarrantyById = (id, jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_WARRANTY_BY_ID_REQUEST });

    try {
      const response = await api.get(`/api/warranties/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      dispatch({
        type: GET_WARRANTY_BY_ID_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_WARRANTY_BY_ID_FAILURE,
        payload: error.message
      });
    }
  };
};
