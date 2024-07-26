// action.js

import { api } from "../../config/api";
import { GET_AREA_ORDER_FAILURE, GET_AREA_ORDER_REQUEST, GET_AREA_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";

export const updateOrderStatus =  ({orderId,orderstatus,jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_ORDER_STATUS_REQUEST});
            const response = await api.put(
                `/api/admin/orders/${orderId}/${orderstatus}`, {}, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            const updateOrder = response.data;
            console.log("Update Order Response: ", updateOrder); 

            dispatch({
                type:UPDATE_ORDER_STATUS_SUCCESS,
                payload:updateOrder
            });
        } catch (error) {
            console.log("catch error ",error)
            console.log("order_status",orderstatus)
            
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error});
        }
    };
};

export const fetchRestaurantsOrder = ({areaId,orderStatus,jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_AREA_ORDER_REQUEST});

            const {data} = await api.get(
                `/api/admin/order/area/${areaId}`,{
                params: {order_status:orderStatus},
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const orders = data;
            console.log("reatauant order ------- ",orders);
            dispatch({
                type:GET_AREA_ORDER_SUCCESS,
                payload:orders,
            });
        } catch (error) {
            dispatch({ type: GET_AREA_ORDER_FAILURE, error});
        }
    };
};