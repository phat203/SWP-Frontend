// orderReducer.js
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ALL_ORDER_FAILURE, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    orders: [],
    order: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_ORDER_REQUEST:
        case GET_USERS_ORDERS_REQUEST:
        case GET_ALL_ORDER_REQUEST :
        case GET_ORDER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, error: null, orders: [...state.orders, payload] };

        case GET_USERS_ORDERS_SUCCESS:
        case GET_ALL_ORDER_SUCCESS:
            return { ...state, loading: false, error: null, orders: payload };
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, order: payload };
        case CREATE_ORDER_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
        case GET_ALL_ORDER_FAILURE :
        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
