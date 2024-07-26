import {
    GET_COUPONS_REQUEST, GET_COUPONS_SUCCESS, GET_COUPONS_FAILURE,
    GET_COUPON_REQUEST, GET_COUPON_SUCCESS, GET_COUPON_FAILURE,
    CREATE_COUPON_REQUEST, CREATE_COUPON_SUCCESS, CREATE_COUPON_FAILURE,
    UPDATE_COUPON_REQUEST, UPDATE_COUPON_SUCCESS, UPDATE_COUPON_FAILURE,
    DELETE_COUPON_REQUEST, DELETE_COUPON_SUCCESS, DELETE_COUPON_FAILURE
} from './ActionType';

const initialState = {
    coupons: [],
    coupon: null,
    loading: false,
    error: null,
};

const couponReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUPONS_REQUEST:
        case GET_COUPON_REQUEST:
        case CREATE_COUPON_REQUEST:
        case UPDATE_COUPON_REQUEST:
        case DELETE_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_COUPONS_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: action.payload,
            };
        case GET_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                coupon: action.payload,
            };
        case CREATE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: [...state.coupons, action.payload],
            };
        case UPDATE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: state.coupons.map(coupon =>
                    coupon.id === action.payload.id ? action.payload : coupon
                ),
            };
        case DELETE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: state.coupons.filter(coupon => coupon.id !== action.payload),
            };
        case GET_COUPONS_FAILURE:
        case GET_COUPON_FAILURE:
        case CREATE_COUPON_FAILURE:
        case UPDATE_COUPON_FAILURE:
        case DELETE_COUPON_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default couponReducer;