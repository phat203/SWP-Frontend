import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ALL_ORDER_FAILURE, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";

import { api } from "../../config/api";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type:CREATE_ORDER_REQUEST });
        try {
            const { data } = await api.post(`/api/orders`, reqData.order ,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });

            const orderId = data.id;

            const callbackUrl = `${window.location.origin}/staff/jewelry/payment/success/${orderId}`;

            if (data.payment_url) {
                window.location.href = data.payment_url;
              } else {
                window.location.href = callbackUrl;
              }
            console.log("create order data",data)
            dispatch({ type: CREATE_ORDER_SUCCESS, payload:data });
        } catch (error) {
            console.log("error",error)
            dispatch({ type: CREATE_ORDER_FAILURE, payload:error});
            throw error;
        }
    };
};

export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST });
        try {
            const { data } = await api.get(`/api/orders/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("users orders",data)
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload:data });
        } catch (error) {
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload:error});
            throw error;
        }
    };
};
export const getALLsOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_ORDER_REQUEST });
        try {
            const { data } = await api.get(`/api/orders`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("users orders",data)
            dispatch({ type: GET_ALL_ORDER_SUCCESS, payload:data });
        } catch (error) {
            dispatch({ type: GET_ALL_ORDER_FAILURE, payload:error});
            throw error;
        }
    };
};

export const getOrderDetails = (orderId) => {
    return async (dispatch) => {
      dispatch({ type: GET_ORDER_BY_ID_REQUEST });
      try {
        const { data } = await api.get(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        console.log("Order",data)
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error });
        throw error;
      }
    };
  };