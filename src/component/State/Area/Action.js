
import { api } from "../../config/api";

import { CREATE_AREA_FAILURE, CREATE_AREA_REQUEST,CREATE_AREA_SUCCESS,CREATE_EVENTS_FAILURE,CREATE_EVENTS_REQUEST
    ,CREATE_EVENTS_SUCCESS, DELETE_AREA_FAILURE,DELETE_AREA_REQUEST,DELETE_AREA_SUCCESS,DELETE_EVENTS_FAILURE
    ,DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS,GET_ALL_AREA_FAILURE,GET_ALL_AREA_REQUEST,GET_ALL_AREA_SUCCESS
    ,GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_AREA_BY_ID_FAILURE, GET_AREA_BY_ID_REQUEST
    ,GET_AREA_BY_ID_SUCCESS, GET_AREA_BY_USER_ID_FAILURE, GET_AREA_BY_USER_ID_REQUEST, GET_AREA_BY_USER_ID_SUCCESS
    ,GET_AREA_EVENTS_FAILURE,GET_AREA_EVENTS_REQUEST
    ,GET_AREA_EVENTS_SUCCESS,UPDATE_AREA_FAILURE,UPDATE_AREA_REQUEST,UPDATE_AREA_STATUS_FAILURE,UPDATE_AREA_STATUS_REQUEST,UPDATE_AREA_STATUS_SUCCESS, 
    UPDATE_AREA_SUCCESS
 } from "./ActionType";

 export const getAllAreaAction = (token) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_AREA_REQUEST});
        try {
            const {data} = await api.get("/api/areas", {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({type:GET_ALL_AREA_SUCCESS,payload:data});
            console.log("all area" , data);
        } catch(error){
            console.log("catch error", error)
            dispatch({type:GET_ALL_AREA_FAILURE,payload:error});
        }
    }
 };
 
 export const getAreaById = (reqData) => {
    return async(dispatch) => {
        dispatch({type:GET_AREA_BY_ID_REQUEST})
        try{
            const response = await api.get(`api/areas/${reqData.areaId}`, {
                headers: {
                    Authorization : `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:GET_AREA_BY_ID_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error)
            dispatch({type:GET_AREA_BY_ID_FAILURE, payload:error});
        }
    }
 };

 export const getAreaByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({type:GET_AREA_BY_USER_ID_REQUEST});
        try{
            const{data} = await api.get(`/api/admin/area/user`, {
                headers : {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            console.log("get area by user id", data);
            dispatch({type: GET_AREA_BY_USER_ID_SUCCESS,payload: data});
        } catch (error){
            console.log("catch error" ,error);
                dispatch({
                    type: GET_AREA_BY_USER_ID_FAILURE, payload: error.message,
                });
        }
    };
 };

 export const createArea = (Data,jwt) => {
    console.log("token--------",jwt);
    return async (dispatch) => {
        dispatch({type:CREATE_AREA_REQUEST})
        try{
            const {data} = await api.post(`/api/admin/area`, Data, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_AREA_SUCCESS, payload:data});
            console.log("created restaurant ", data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_AREA_FAILURE, payload:error})
            throw error;
        }
    }
 };
 export const updateArea = ({areaId, areaData,jwt }) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_AREA_REQUEST});

    try {
        const res = await api.put(`api/admin/area/${areaId}`,areaData,{
            headers: {
                Authorization : `Bearer ${jwt}`,
            },
        });
        dispatch({type:UPDATE_AREA_SUCCESS,payload:res.data});
    } catch(error){
        dispatch({type:UPDATE_AREA_FAILURE,payload:error});
    }   
    };
 }; 
 export const deleteArea = ({ areaId, jwt}) => {
    return async (dispatch) =>{
        dispatch({type:DELETE_AREA_REQUEST});
        try{
            const res = await api.delete(`/api/admin/area/${areaId}`, {
                headers : {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            console.log("delete area" , res.data);
            dispatch({type:DELETE_AREA_SUCCESS, payload:areaId});
        } catch (error) {
            console.log("catch error", error);
            dispatch({type:DELETE_AREA_FAILURE, payload:error});
        }
    };
 };

 export const updateAreaStatus =({areaId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type: UPDATE_AREA_STATUS_REQUEST});
        try{
            const res = await api.put(
                `api/admin/area/${areaId}/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },                    
                }
            );
            console.log("ressssss", res.data);
            dispatch({type: UPDATE_AREA_STATUS_SUCCESS, payload:res.data})
        }catch(error){
            console.log("error", error)
            dispatch({type:UPDATE_AREA_STATUS_FAILURE, payload:error});
        }
    };
};


// chua lam
 export const createEventAction=({data, jwt, restaurantId})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_EVENTS_REQUEST});
        try{
            const res = await api.post(
            `api/admin/events/restaurant/${restaurantId}`, data,
            {
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            }
            );
            console.log("created events", res.data);
            dispatch({type:CREATE_EVENTS_SUCCESS, payload:res.data});
    }catch(error){
        console.log("catch - ", error);
        dispatch({type: CREATE_EVENTS_FAILURE,payload:error});
    }
};
};
 
export const getAllEvents = ({jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try{
            const res = await api.get(`api/events`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("get all events" , res.data);
            dispatch({type: GET_ALL_EVENTS_SUCCESS,payload:res.data});
        }catch(error){
            dispatch({type: GET_ALL_EVENTS_FAILURE,payload:error});
        }
    };
};

export const deleteEventAction =({eventId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_EVENTS_REQUEST});
        try{
            const res = await api.delete(`api/admin/events/${eventId}`,{
                headers:{
                    Authorization:`Bearer${jwt}`,
                }
            });
            console.log("DELETE events", res.data);
            dispatch({type: DELETE_EVENTS_SUCCESS, payload:eventId});
        } catch(error){
            console.log("catch - ",error);
            dispatch({type: DELETE_EVENTS_FAILURE, payload:error});
        }
    }
};

export const getRestaurantsEvents =({restaurantId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_AREA_EVENTS_REQUEST});
        try{
            const res = await api.get(
                `/api/admin/events/restaurants/${restaurantId}`,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    },
                }
            );

            console.log()
            dispatch({type:GET_AREA_EVENTS_SUCCESS,payload:res.data});
        }catch(error){
            dispatch({type:GET_AREA_EVENTS_FAILURE,payload:error});
        }
    };
};
// chua lam

// export const createCategoryAction=({reqData,jwt})=>{
//     return async(dispatch)=>{
//         dispatch({type:CREATE_CATEGORY_REQUEST});
//         try{
//             const res = await api.post(`/api/admin/category/create`,reqData,
//                 {
//                     headers:{
//                         Authorization:`Bearer ${jwt}`,
//                     }
//                 }
//             )
//             console.log("create category",res.data);
//             dispatch({type: CREATE_CATEGORY_SUCCESS, payload:res.data});
//         }catch(error){
//             console.log("catch - ", error);
//             dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
//         }
//     };
// };



// export const getAllCategory = ({jwt}) => {
//     return async (dispatch) => {
//       dispatch({ type: GET_CATEGORY_REQUEST });
//       try {
//         const res = await api.get(`/api/admin/category/getAll`, {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         });
//         console.log("get all category", res.data);
//         dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data });
//       } catch (error) {
//         dispatch({ type: GET_CATEGORY_FAILURE, payload: error });
//       }
//     };
//   };


  