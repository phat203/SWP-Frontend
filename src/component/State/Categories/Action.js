import { api } from "../../config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
} from "./ActionType";
// chua lam

export const createCategoryAction=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const res = await api.post(`/api/admin/category/create`,reqData,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            console.log("create category",res.data);
            dispatch({type: CREATE_CATEGORY_SUCCESS, payload:res.data});
        }catch(error){
            console.log("catch - ", error);
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
            throw error;
          }
    };
};



export const getAllCategory = ({jwt}) => {
    return async (dispatch) => {
      dispatch({ type: GET_CATEGORY_REQUEST }); // Dispatching an action to indicate request start
      try {
        const res = await api.get(`/api/admin/category/getAll`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("get all category", res.data); // Logging the response data to console
        dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data }); // Dispatching action with success and data
      } catch (error) {
        dispatch({ type: GET_CATEGORY_FAILURE, payload: error }); // Dispatching action with failure and error payload
      }
    };
  };
  

  