// reducers.js

import { CALCULATE_ORDER_PRICE_FAILURE, CALCULATE_ORDER_PRICE_REQUEST, CALCULATE_ORDER_PRICE_SUCCESS, GET_AREA_ORDER_FAILURE, GET_AREA_ORDER_REQUEST, GET_AREA_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    orders:[],
    orderPriceDetails: {}
};

const areaOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AREA_ORDER_REQUEST :
        case UPDATE_ORDER_STATUS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_AREA_ORDER_SUCCESS:
            return { ...state, loading: false, orders: action.payload };

            case UPDATE_ORDER_STATUS_SUCCESS:
    const updatedOrder = action.payload;
    const updatedOrders = state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
    );
    return { ...state, loading: false, orders: updatedOrders };
        
        case GET_AREA_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
                return {...state, loading: false, error: action.error };
        default:
            return state;
    }
};

const orderPriceReducer = (state = initialState, action) => {
    switch (action.type) {
        case CALCULATE_ORDER_PRICE_REQUEST:
            return { ...state, loading: true, error: null };

        case CALCULATE_ORDER_PRICE_SUCCESS:
            return { ...state, loading: false, orderPriceDetails: action.payload };

        case CALCULATE_ORDER_PRICE_FAILURE:
            return { ...state, loading: false, error: action.error };

        default:
            return state;
    }
};


export default areaOrderReducer;