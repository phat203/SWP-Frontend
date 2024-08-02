// action.js

import { api } from "../../config/api";
import { CALCULATE_ORDER_PRICE_FAILURE, CALCULATE_ORDER_PRICE_REQUEST, CALCULATE_ORDER_PRICE_SUCCESS, GET_AREA_ORDER_FAILURE, GET_AREA_ORDER_REQUEST, GET_AREA_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType";

export const updateOrderStatus =  ({orderId,orderStatus,jwt}) => {
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_ORDER_STATUS_REQUEST});
            const response = await api.put(
                `/api/admin/orders/${orderId}/${orderStatus}`, {}, {
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
            console.log("order_status",orderStatus)
            
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


export const calculateOrderPrice = ({ orderRequest, jwt }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CALCULATE_ORDER_PRICE_REQUEST });
            const response = await api.post(
                '/api/orders/calculate', 
                orderRequest, 
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            const result = response.data;
            console.log("Calculate Order Price Response: ", result);

            dispatch({
                type: CALCULATE_ORDER_PRICE_SUCCESS,
                payload: result
            });
        } catch (error) {
            console.log("Error calculating order price: ", error);
            dispatch({ type: CALCULATE_ORDER_PRICE_FAILURE, error });
        }
    };
};