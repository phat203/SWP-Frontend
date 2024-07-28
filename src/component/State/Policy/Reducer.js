// policyReducer.js
import {
    CREATE_POLICY_REQUEST,
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_FAILURE,
    GET_ALL_POLICIES_REQUEST,
    GET_ALL_POLICIES_SUCCESS,
    GET_ALL_POLICIES_FAILURE,
    GET_POLICY_BY_ID_REQUEST,
    GET_POLICY_BY_ID_SUCCESS,
    GET_POLICY_BY_ID_FAILURE,
    UPDATE_POLICY_REQUEST,
    UPDATE_POLICY_SUCCESS,
    UPDATE_POLICY_FAILURE,
    DELETE_POLICY_REQUEST,
    DELETE_POLICY_SUCCESS,
    DELETE_POLICY_FAILURE,
} from './ActionType';

const initialState = {
    loading: false,
    error: null,
    policies: [],
    policy: null,
};

export const policyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_POLICY_REQUEST:
        case GET_ALL_POLICIES_REQUEST:
        case GET_POLICY_BY_ID_REQUEST:
        case UPDATE_POLICY_REQUEST:
        case DELETE_POLICY_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_POLICY_SUCCESS:
            return { ...state, loading: false, policies: [...state.policies, payload], error: null };

        case GET_ALL_POLICIES_SUCCESS:
            return { ...state, loading: false, policies: payload, error: null };

        case GET_POLICY_BY_ID_SUCCESS:
            return { ...state, loading: false, policy: payload, error: null };

        case UPDATE_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
                policies: state.policies.map(policy => policy.id === payload.id ? payload : policy),
                error: null
            };

        case DELETE_POLICY_SUCCESS:
            return {
                ...state,
                loading: false,
                policies: state.policies.filter(policy => policy.id !== payload),
                error: null
            };

        case CREATE_POLICY_FAILURE:
        case GET_ALL_POLICIES_FAILURE:
        case GET_POLICY_BY_ID_FAILURE:
        case UPDATE_POLICY_FAILURE:
        case DELETE_POLICY_FAILURE:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
