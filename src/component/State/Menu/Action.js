import { api } from "../../config/api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_JEWELRY_ID_FAILURE, GET_MENU_ITEMS_BY_JEWELRY_ID_REQUEST, GET_MENU_ITEMS_BY_JEWELRY_ID_SUCCESS, GET_MENU_ITEM_BY_CODE_FAILURE, GET_MENU_ITEM_BY_CODE_REQUEST, GET_MENU_ITEM_BY_CODE_SUCCESS, GET_OUT_OF_STOCk_ITEM_FAILURE, GET_OUT_OF_STOCk_ITEM_REQUEST, GET_OUT_OF_STOCk_ITEM_SUCCESS, INSTOCK_ITEM_FAILURE, INSTOCK_ITEM_REQUEST, INSTOCK_ITEM_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_JEWELRY_PRICES_FAILURE, UPDATE_JEWELRY_PRICES_REQUEST, UPDATE_JEWELRY_PRICES_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";

export const createMenuItem = ({menu,jwt}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.post('/api/admin/jewelry', menu,
                {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("created menu", data);
            dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data});
        } catch (error) {
            console.log("created error", error);
            dispatch({type:CREATE_MENU_ITEM_FAILURE,payload:error});
            throw error;
        }
    };
};

export const getMenuItemsByJewelryId = ({jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_REQUEST});
        try {
            const response = await api.get(
                `/api/jewelry/getAll`,
                {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("menu item  ", response.data);
            dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("created error", error);
            dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_FAILURE,payload:error});
        }
    };
};

  

export const searchMenuItem = ({keyword, jwt }) => {
    return async (dispatch) => {
        dispatch({type:SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.get(`/api/jewelry/search?keyword=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("data --------- ", data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});
        }
    };
};

export const getAllMenuItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_REQUEST});
        try {
            const {data} = await api.get(
                `/api/jewelry/getAll`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`
                    },
                }
            )
            console.log("menu item by restaurants ", data);
            dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_SUCCESS,payload:data});
        } catch (error) {
            console.log("created error", error);
            dispatch({type:GET_MENU_ITEMS_BY_JEWELRY_ID_FAILURE,payload:error});
        }
    };
};

export const updateMenuItemsAvailability = ({ jewelryId, jwt }) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(
                `/api/admin/jewelry/${jewelryId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("update menuItems Availability ", data);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data});
        } catch (error) {
            console.log("created error", error);
            dispatch({
                type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
                payload:error,
            });
        }
    };
}

export const deleteFoodAction = ({ jewelryId, jwt }) =>
    async (dispatch) => {
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.delete(`/api/admin/jewelry/${jewelryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("delete jewelry ", data);
            dispatch({type:DELETE_MENU_ITEM_SUCCESS, payload: jewelryId});
        } catch (error) {
            console.log("error", error);
            dispatch({
                type:DELETE_MENU_ITEM_FAILURE, payload: error });
        }
    };

    export const getMenuItemByCode = ({code, jwt} ) => {
        return async (dispatch) => {
            dispatch({type:GET_MENU_ITEM_BY_CODE_REQUEST});
            try {
                const {data} = await api.get(`api/jewelry/findByCode?code=${code}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                console.log("data --------- ", data);
                dispatch({type:GET_MENU_ITEM_BY_CODE_SUCCESS,payload:data});
                return data;
            } catch (error) {
                console.log("get error",error)
                dispatch({type:GET_MENU_ITEM_BY_CODE_FAILURE,payload:error});
            }
        };
    };

    export const updateJewelryPrice = ({jwt}) => {
        return async (dispatch) => {
          dispatch({ type: UPDATE_JEWELRY_PRICES_REQUEST });
      
          try {
            const { data } = await api.put(
                `/api/admin/jewelry/updatePrices`, 
                null, // Bỏ tham số thứ hai (body) vì không có dữ liệu gửi đi
                {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                }
              );
            console.log("Updated jewelry price: ", data);
      
            dispatch({
              type: UPDATE_JEWELRY_PRICES_SUCCESS,
              payload: data, // Assuming the backend returns updated jewelry data
            });
          } catch (error) {
            console.error("Failed to update jewelry price: ", error);
      
            dispatch({
              type: UPDATE_JEWELRY_PRICES_FAILURE,
              payload: error,
            });
          }
        };
      };

      export const instockItem = ({ jewelryId, jwt }) => {
        return async (dispatch) => {
            dispatch({ type: INSTOCK_ITEM_REQUEST });
            try {
                const { data } = await api.put(
                    `/api/admin/jewelry/instock/${jewelryId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                console.log("instocked item ", data);
                dispatch({ type: INSTOCK_ITEM_SUCCESS, payload: data });
            } catch (error) {
                console.log("instock error", error);
                dispatch({ type: INSTOCK_ITEM_FAILURE, payload: error });
            }
        };
    };


    export const getOutOfStockItems = ({jwt}) => {
        return async (dispatch) => {
            dispatch({ type: GET_OUT_OF_STOCk_ITEM_REQUEST });
            try {
                const { data } = await api.get('/api/jewelry/getAll/OutOfStock', {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                console.log("Out of stock items: ", data);
                dispatch({ type: GET_OUT_OF_STOCk_ITEM_SUCCESS, payload: data });
            } catch (error) {
                console.log("Error fetching out of stock items", error);
                dispatch({ type: GET_OUT_OF_STOCk_ITEM_FAILURE, payload: error });
            }
        };
    };