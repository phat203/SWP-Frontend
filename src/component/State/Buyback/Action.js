
import { api } from "../../config/api";
import { CREATE_BUYBACK_FAILURE, CREATE_BUYBACK_OUT_FAILURE, CREATE_BUYBACK_OUT_REQUEST, CREATE_BUYBACK_OUT_SUCCESS, CREATE_BUYBACK_REQUEST, CREATE_BUYBACK_SUCCESS, GET_ALL_BUYBACK_FAILURE, GET_ALL_BUYBACK_REQUEST, GET_ALL_BUYBACK_SUCCESS, GET_BUYBACK_BY_ID_FAILURE, GET_BUYBACK_BY_ID_REQUEST, GET_BUYBACK_BY_ID_SUCCESS } from "./Actiontype";



export const createBuyback = (buybackRequest, jewelryCode, jwt) => {
    return async dispatch => {
      dispatch({ type: CREATE_BUYBACK_REQUEST });

    try {
        const  response  = await api.post
        (`/api/buyback/create?jewelryCode=${jewelryCode}`, buybackRequest, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        const buyBackId = response.data.id;

        const callbackUrl = `${window.location.origin}/staff/jewelry/buyback-success/${buyBackId}`;

        window.location.href = callbackUrl;


        dispatch({ type: CREATE_BUYBACK_SUCCESS, payload: response.data });
        console.log("TẠO THÀNH CÔNG")
        console.log("customer" ,buybackRequest)
        // Handle success scenario if needed
      } catch (error) {
        console.log("data",buybackRequest)
        console.log("error", error)
        dispatch({ type: CREATE_BUYBACK_FAILURE, error: error.message });
        throw error;
        // Handle error scenario
      }
    };
    
  };


  export const createBuybackOut = (buybackRequest, createJewelryRequest, jwt) => {
    return async dispatch => {
        dispatch({ type: CREATE_BUYBACK_OUT_REQUEST });

        try {
          const payload = {
            buybackRequest,
            createJewelryRequest
          };
    
          console.log("Payload being sent:", JSON.stringify(payload, null, 2));
    
            const response  = await api.post('/api/buyback/create/out', {
              buybackRequest,
              createJewelryRequest
          }, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            
            const buyBackId = response.data.id;

            const callbackUrl = `${window.location.origin}/staff/jewelry/buyback-out-success/${buyBackId}`;

            window.location.href = callbackUrl;

            dispatch({ type: CREATE_BUYBACK_OUT_SUCCESS, payload: response.data });
            console.log("ĐÃ MUA LẠI THÀNH CÔNG");
            console.log("data",response.data)
        } catch (error) {
            console.log("error", error);
            console.log("buybackRequest", createJewelryRequest);

            dispatch({ type: CREATE_BUYBACK_OUT_FAILURE, error: error.message });
            throw error;
        }
    };
};

  export const getAllBuyback = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_BUYBACK_REQUEST });
        try {
            const response = await api.get(
                `/api/buyback`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("get all component", response.data);
            dispatch({
                type: GET_ALL_BUYBACK_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: GET_ALL_BUYBACK_FAILURE })
            console.log("error", error);
            throw error;
        }
    };
};


export const getBuybackById = ({ buyBackId,jwt} ) => {
    return async (dispatch) => {
        dispatch({ type: GET_BUYBACK_BY_ID_REQUEST });
        try {
            const response = await api.get(
                `/api/buyback/${buyBackId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("get buyback", response.data);
            dispatch({
                type: GET_BUYBACK_BY_ID_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: GET_BUYBACK_BY_ID_FAILURE })
            console.log("error", error);
            throw error;
        }
    };
};
