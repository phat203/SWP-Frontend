import { api } from "../../config/api";
import { ADD_ITEM_TO_CART_BY_CODE_FAILURE, ADD_ITEM_TO_CART_BY_CODE_REQUEST, ADD_ITEM_TO_CART_BY_CODE_SUCCESS, ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, APPLY_COUPON_FAILURE, APPLY_COUPON_REQUEST, APPLY_COUPON_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from "./ActionType";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({type:FIND_CART_REQUEST});
        try {
            const response = await api.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("my cart", response.data)
            dispatch({type:FIND_CART_SUCCESS,payload:response.data});
        } catch (error) {
            dispatch({type:FIND_CART_FAILURE,payload:error})
        }
    };
};

export const getAllCartItem = ({reqData,jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_CART_ITEMS_REQUEST});
        try {
            const response = await api.get(`/api/carts${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:GET_ALL_CART_ITEMS_SUCCESS,payload:response.data});
        } catch (error) {
            dispatch({type:GET_ALL_CART_ITEMS_FAILURE,payload:error});
            throw error;
        }
    };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/add`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("add item to cart ", data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
            throw error;
        }
    };
};

export const addItemToCartByCode = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_BY_CODE_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/addByCode`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("add item to cart ", data);
            dispatch({ type: ADD_ITEM_TO_CART_BY_CODE_SUCCESS, payload: data });
            return data;
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: ADD_ITEM_TO_CART_BY_CODE_FAILURE, payload: error });
            throw error;
        }
    };
};


export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_CARTITEM_REQUEST});
        try {
            const {data} = await api.put(`/api/cart/cart-item/update`, reqData.data,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("update cartItem ",data)
            dispatch({type:UPDATE_CARTITEM_SUCCESS,payload:data});
        } catch (error) {
            console.log("catch error ",error)
            dispatch({type:UPDATE_CARTITEM_FAILURE,payload:error.message});
            throw error;
        }
    };
};

export const removeCartItem = ({cartItemId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:REMOVE_CARTITEM_REQUEST});
        try {
            const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("remove cartItem ",data)
            dispatch({type:REMOVE_CARTITEM_SUCCESS,payload:cartItemId});
        } catch (error) {
            console.log("catch error ",error)
            dispatch({type:REMOVE_CARTITEM_FAILURE,payload:error.message});
        }
    };
};

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({type:CLEAR_CART_REQUEST});
        try {
            const {data} = await api.put(`/api/cart/clear`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            dispatch({type:CLEAR_CART_SUCCESS,payload:data});
            console.log("clear cart ",data)
        } catch (error) {
            console.log("catch error ",error)
            dispatch({type:CLEAR_CART_FAILURE,payload:error.message});
            throw error;
        }
    };
};
export const applyCoupon = (cartId, couponCode, jwt) => {
    return async (dispatch) => {
        dispatch({ type: APPLY_COUPON_REQUEST });
        try {
            const { data } = await api.post(`/api/cart/${cartId}/apply-coupon?couponCode=${couponCode}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log('apply coupon data', data);
            dispatch({ type: APPLY_COUPON_SUCCESS, payload: data });
            return data;
        } catch (error) {
            console.log("coupon error",error)
            dispatch({ type: APPLY_COUPON_FAILURE, payload: error });
            throw error;
        }
    };
};