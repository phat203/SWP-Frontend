// policyActions.js
import {
    GET_ALL_POLICIES_REQUEST,
    GET_ALL_POLICIES_SUCCESS,
    GET_ALL_POLICIES_FAILURE,
    GET_POLICY_BY_ID_REQUEST,
    GET_POLICY_BY_ID_SUCCESS,
    GET_POLICY_BY_ID_FAILURE,
    CREATE_POLICY_REQUEST,
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_FAILURE,
    UPDATE_POLICY_REQUEST,
    UPDATE_POLICY_SUCCESS,
    UPDATE_POLICY_FAILURE,
    DELETE_POLICY_REQUEST,
    DELETE_POLICY_SUCCESS,
    DELETE_POLICY_FAILURE,
} from './ActionType';
import { api } from "../../config/api"; // Đảm bảo rằng bạn đã cấu hình axios hoặc bất kỳ API client nào

export const getAllPolicies = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_POLICIES_REQUEST });
        try {
            const { data } = await api.get('/api/policies', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_ALL_POLICIES_SUCCESS, payload: data });
            console.log("data",data)
        } catch (error) {
            dispatch({ type: GET_ALL_POLICIES_FAILURE, payload: error.message });
        }
    };
};

export const getPolicyById = (id, jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_POLICY_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/policies/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_POLICY_BY_ID_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_POLICY_BY_ID_FAILURE, payload: error.message });
        }
    };
};

export const createPolicy = (policy, jwt) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_POLICY_REQUEST });
        try {
            const { data } = await api.post('/api/policies', policy, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: CREATE_POLICY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CREATE_POLICY_FAILURE, payload: error.message });
            console.log("error",error)
        }
    };
};

export const updatePolicy = (policyDetails, jwt) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_POLICY_REQUEST });
        try {
            const { data } = await api.put(`/api/policies/${policyDetails.id}`, policyDetails , {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_POLICY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_POLICY_FAILURE, payload: error.message });
            console.log("error",error);
        }
    };
};

export const deletePolicy = (id, jwt) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_POLICY_REQUEST });
        try {
            await api.delete(`/api/policies/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: DELETE_POLICY_SUCCESS, payload: id });
        } catch (error) {
            dispatch({ type: DELETE_POLICY_FAILURE, payload: error.message });
        }
    };
};
