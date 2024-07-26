
// // action.js
// import { api } from '../../config/api';
// import { CREATE_COMPONENT_SUCCESS, GET_ALL_COMPONENT_FAILURE, GET_ALL_COMPONENT_REQUEST, GET_ALL_COMPONENT_SUCCESS, GET_COMPONENTS, GET_COMPONENT_SUCCESS, UPDATE_COMPONENT_FAILURE, UPDATE_COMPONENT_REQUEST, UPDATE_COMPONENT_SUCCESS, UPDATE_STOCK } from './ActionType';

// export const getAllComponent = ({jwt}) => {
//     return async (dispatch) => {
//          dispatch({ type : GET_ALL_COMPONENT_REQUEST });
//         try {
//             const response = await api.get(
//                 `/api/admin/component`,
//                 {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });
//             console.log("get all component",response.data);
//             dispatch({
//                 type:GET_ALL_COMPONENT_SUCCESS,payload: response.data,
//             });
//         } catch (error) {
//             dispatch({ type:GET_ALL_COMPONENT_FAILURE})
//             console.log("error",error);
//         }
//     };
// };

// export const createComponent = ({data, jwt}) => {
//     return async (dispatch) => {
//         try {
//             const response = await api.post(`/api/admin/component/create`, data, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });
//             console.log("create component", response.data);
//             dispatch({
//                 type:CREATE_COMPONENT_SUCCESS,
//                 payload: response.data,
//             });
            
//         } catch (error) {
//             console.log("error",error);
//         }
//     };
// };


// export const getComponent = ({ id ,jwt }) => {
//     return async (dispatch) => {
//         try {
//             const response = await api.get(
//                 `/api/admin/components/${id}`,
//                 {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });
//             console.log("get component", response.data);
//             dispatch({
//                 type:GET_COMPONENT_SUCCESS,
//                 payload: response.data,
//             });
            
//         } catch (error) {
//             console.log("error",error);
//         }
//     };
// };

// export const updateStockOfIngredient = ({ id, jwt }) => {
//     return async (dispatch) => {
//         try {
//             const {data} = await api.put(
//                 `/api/admin/ingredients/${id}/stock`,
//                 {},
//                 {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });
            
//             dispatch({
//                 type:UPDATE_STOCK,
//                 payload: data,
//             });
//             console.log("update ingredients stock", data);
//         } catch (error) {
//             console.log("error",error);
//         }
//     };
// };

// export const updateComponent = ({data, jwt }) => {
//     return async (dispatch) => {
//         dispatch({ type : UPDATE_COMPONENT_REQUEST });
//         try {
//             const response = await api.put(
//                 `/api/admin/component/${data.id}`,
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${jwt}`,
//                     },
//                 }
//             );
//             console.log("update component", response.data);
//             dispatch({
//                 type: UPDATE_COMPONENT_SUCCESS,
//                 payload: response.data,
//             });
            
//         } catch (error) {
//             dispatch({ type:UPDATE_COMPONENT_FAILURE})
//             console.log("error", error);
//         }
//     };
// };

import { api } from '../../config/api';
import {
    CREATE_COMPONENT_SUCCESS,
    GET_ALL_COMPONENT_FAILURE,
    GET_ALL_COMPONENT_REQUEST,
    GET_ALL_COMPONENT_SUCCESS,
    GET_COMPONENT_SUCCESS,
    UPDATE_COMPONENT_FAILURE,
    UPDATE_COMPONENT_REQUEST,
    UPDATE_COMPONENT_SUCCESS,
    UPDATE_STOCK
} from './ActionType';

export const getAllComponent = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_COMPONENT_REQUEST });
        try {
            const response = await api.get(
                `/api/admin/component`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("get all component", response.data);
            dispatch({
                type: GET_ALL_COMPONENT_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: GET_ALL_COMPONENT_FAILURE })
            console.log("error", error);
        }
    };
};

export const createComponent = ({ data, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.post(`/api/admin/component/create`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create component", response.data);
            dispatch({
                type: CREATE_COMPONENT_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            console.log("error", error);
            throw error;
        }
    };
};


export const getComponent = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/api/admin/components/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("get component", response.data);
            dispatch({
                type: GET_COMPONENT_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            console.log("error", error);
        }
    };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        try {
            const { data } = await api.put(
                `/api/admin/ingredients/${id}/stock`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

            dispatch({
                type: UPDATE_STOCK,
                payload: data,
            });
            console.log("update ingredients stock", data);
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const updateComponent = ({ data, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_COMPONENT_REQUEST });
        try {
            const response = await api.put(
                `/api/admin/component/${data.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("update component", response.data);
            dispatch({
                type: UPDATE_COMPONENT_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            dispatch({ type: UPDATE_COMPONENT_FAILURE })
            console.log("error", error);
        }
    };
};
