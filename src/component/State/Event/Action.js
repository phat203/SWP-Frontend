import { api } from '../../config/api';
import {
    CREATE_COUPON_FAILURE,
    CREATE_COUPON_REQUEST, CREATE_COUPON_SUCCESS,
    DELETE_COUPON_FAILURE,
    DELETE_COUPON_REQUEST, DELETE_COUPON_SUCCESS,
    GET_COUPONS_FAILURE,
    GET_COUPONS_REQUEST, GET_COUPONS_SUCCESS,
    GET_COUPON_FAILURE,
    GET_COUPON_REQUEST, GET_COUPON_SUCCESS,
    UPDATE_COUPON_FAILURE,
    UPDATE_COUPON_REQUEST, UPDATE_COUPON_SUCCESS
} from './ActionType';

// GET all coupons
export const getCoupons = (jwt) => async dispatch => {
    dispatch({ type: GET_COUPONS_REQUEST });
    try {
        const response = await api.get('/api/admin/coupon',  {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Events",response)
        dispatch({ type: GET_COUPONS_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error",error)
        dispatch({ type: GET_COUPONS_FAILURE, payload: error.message });
    }
};

// GET a single coupon by ID
export const getCouponById = (id,jwt) => async dispatch => {
    dispatch({ type: GET_COUPON_REQUEST });
    try {
        const response = await api.get(`/api/admin/coupon/${id}`,  {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_COUPON_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_COUPON_FAILURE, payload: error.message });
    }
};

// Create a new coupon
export const createCoupon = (couponData,jwt) => async dispatch => {
    dispatch({ type: CREATE_COUPON_REQUEST });
    try {
        const response = await api.post('/api/admin/coupon', couponData,  {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("thành công")
        dispatch({ type: CREATE_COUPON_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error", error)
        dispatch({ type: CREATE_COUPON_FAILURE, payload: error.message });
        throw error;
    }
};

// Update an existing coupon
export const updateCoupon = (id, couponData,jwt) => async dispatch => {
    dispatch({ type: UPDATE_COUPON_REQUEST });
    try {
        const response = await api.put(`/api/admin/coupon/${id}`, couponData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: UPDATE_COUPON_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_COUPON_FAILURE, payload: error.message });
        throw error;
    }
};

// Delete a coupon
export const deleteCoupon = (id,jwt) => async dispatch => {
    dispatch({ type: DELETE_COUPON_REQUEST });
    try {
        await api.delete(`/api/admin/coupon/${id}`,  {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: DELETE_COUPON_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_COUPON_FAILURE, payload: error.message });
    }
};