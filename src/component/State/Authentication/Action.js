import axios from "axios"
import { API_URL, api } from "../../config/api"
import { BAN_USER_FAILURE, BAN_USER_REQUEST, BAN_USER_SUCCESS, CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, GET_ALL_BAN_USER_FAILURE, GET_ALL_BAN_USER_REQUEST, GET_ALL_BAN_USER_SUCCESS, GET_ALL_STAFF_AND_MANAGER_FAILURE, GET_ALL_STAFF_AND_MANAGER_REQUEST, GET_ALL_STAFF_AND_MANAGER_SUCCESS, GET_ALL_STAFF_USER_FAILURE, GET_ALL_STAFF_USER_REQUEST, GET_ALL_STAFF_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"


export const registerUser=(reqDate) =>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}= await axios.post(`${API_URL}/auth/signup`,reqDate.userData)
        // if(data.jwt)localStorage.setItem("jwt",data.jwt);
        // if(data.role==="ROLE_MANAGER"){
        //     reqDate.navigate("/admin/jewelry")
        // }
        // else{
        //     reqDate.navigate("/")
        //}
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success",data)
    
    } catch(error){
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log(error,error)
        throw error;
    }
    }

export const loginUser = (reqDate) => async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const { data } = await axios.post(`${API_URL}/auth/signin`, reqDate.userData);
            if (data.jwt) localStorage.setItem("jwt", data.jwt);
            if (data.role === "ROLE_MANAGER") {
                reqDate.navigate("/manager/jewelry");
            } else if(data.role === "ROLE_STAFF") {
                reqDate.navigate("staff/jewelry/area/:title/:id");
            }else{
                reqDate.navigate("/admin/jewelry");
            }

            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
            console.log("login success")
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload:  error });
            console.log(error);
            throw error;
        }
    };

export const getUser=(jwt)=> async(dispatch)=> {
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`, {
            headers:{
                Authorization :`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_USER_SUCCESS,payload:data })
        console.log("user profile",data)
    }  catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error })
        console.log("error",error)
 }
}


export const logout = () => async (dispatch) => {
    try {
      localStorage.clear();
      dispatch({ type: LOGOUT });
      console.log("logout success");
    } catch (error) {
      console.log("error", error);
    }
  };
  

    export const getAllStaffUser=(jwt)=> async(dispatch)=> {
        dispatch({type:GET_ALL_STAFF_USER_REQUEST})
        try {
            const {data} = await api.get(`/api/users/staff`, {
                headers:{
                    Authorization :`Bearer ${jwt}`
                }
            })
            dispatch({type:GET_ALL_STAFF_USER_SUCCESS,payload:data })
            console.log("user profile",data)
        }  catch (error) {
            dispatch({type:GET_ALL_STAFF_USER_FAILURE,payload:error })
            console.log("error",error)
     }
    }

export const createUser = (reqdata,jwt) => {
    return async (dispatch) => {
        dispatch({type:CREATE_USER_REQUEST})
        try{
            const {data} = await api.post(`/api/users/create`, reqdata, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_USER_SUCCESS, payload:data});
            console.log("created restaurant ", data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_USER_FAILURE, payload:error})
            throw error;
        }
    }
 };
 export const deleteStaffUser = (jwt, username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    console.log(`Deleting user ${username} with JWT ${jwt}`);
    await axios.delete(`/api/users/${username}`, config);
    console.log(`Deleted user ${username} successfully`);

    // Dispatch an action to update the state
    dispatch({
      type: 'DELETE_USER_SUCCESS',
      payload: username,
    });
  } catch (error) {
    console.error(`Failed to delete user ${username}:`, error.response.data.message);
    dispatch({
      type: 'DELETE_USER_FAILURE',
      payload: error.response.data.message,
    });
  }
};

export const banUser = (jwt, userId) => async (dispatch) => {
    dispatch({ type: BAN_USER_REQUEST });
    try {
        const { data } = await api.put(`/api/users/ban/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: BAN_USER_SUCCESS, payload: data });
        console.log("User banned successfully", data);
    } catch (error) {
        dispatch({ type: BAN_USER_FAILURE, payload: error.response.data.message });
        console.error("Error banning user", error.response.data.message);
        return Promise.reject(error);
    }
};

export const getAllStaffAndManagerUsers = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_STAFF_AND_MANAGER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/staff-and-managers`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_ALL_STAFF_AND_MANAGER_SUCCESS, payload: data });
        console.log("Fetched staff and manager users successfully", data);
    } catch (error) {
        dispatch({ type: GET_ALL_STAFF_AND_MANAGER_FAILURE, payload: error.response.data.message });
        console.error("Error fetching staff and manager users", error.response.data.message);
    }
};

export const getAllBanUsers = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ALL_BAN_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/ban-users`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_ALL_BAN_USER_SUCCESS, payload: data });
        console.log("Fetched staff and manager users successfully", data);
    } catch (error) {
        dispatch({ type: GET_ALL_BAN_USER_FAILURE, payload: error.response.data.message });
        console.error("Error fetching staff and manager users", error.response.data.message);
        throw error;
    }
};