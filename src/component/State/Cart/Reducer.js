import { LOGOUT } from '../Authentication/ActionType';
import * as actionTypes from './ActionType';

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
    appliedCouponOrder: null,
};

// Hàm tính tổng giá của các sản phẩm trong giỏ hàng
const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CARTITEM_REQUEST:
        case actionTypes.REMOVE_CARTITEM_REQUEST:
        case actionTypes.ADD_ITEM_TO_CART_BY_CODE_REQUEST:
        case actionTypes.APPLY_COUPON_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

            case actionTypes.FIND_CART_SUCCESS:
                return {
                    ...state,
                    cart: {
                        ...action.payload,
                        total: calculateCartTotal(action.payload.items),
                    },
                    cartItems: action.payload.items,
                    loading: false,
                    error: null,
                };
            
        case actionTypes.CLEAR_CART_SUCCESS:
            if (!action.payload || !Array.isArray(action.payload.items)) {
                console.error("Payload items is not an array:", action.payload.items);
                return {
                    ...state,
                    loading: false,
                    error: 'Invalid payload format',
                };
            }
            return {
                ...state,
                cart: action.payload,
                loading: false,
                cartItems: action.payload.items,
                cart: {
                    ...state.cart,
                    total: calculateCartTotal(action.payload.items), // Tính tổng khi tải
                },
            };

            case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
case actionTypes.ADD_ITEM_TO_CART_BY_CODE_SUCCESS:
    if (!action.payload) {
        console.error("Payload is invalid:", action.payload);
        return {
            ...state,
            loading: false,
            error: 'Invalid payload format',
        };
    }

    const newCartItems = state.cartItems.map(item => {
        if (item.id === action.payload.id) {
            return {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + action.payload.totalPrice
            };
        }
        return item;
    });

    const isExistingItem = state.cartItems.some(item => item.id === action.payload.id);

    if (!isExistingItem) {
        newCartItems.push(action.payload);
    }

    return {
        ...state,
        loading: false,
        cartItems: newCartItems,
        cart: {
            ...state.cart,
            total: calculateCartTotal(newCartItems),
            items: newCartItems,
        },
    };

                

        case actionTypes.UPDATE_CARTITEM_SUCCESS:
            if (!action.payload) {
                console.error("Payload is invalid:", action.payload);
                return {
                    ...state,
                    loading: false,
                    error: 'Invalid payload format',
                };
            }
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            return {
                ...state,
                loading: false,
                cartItems: updatedCartItems,
                cart: {
                    ...state.cart,
                    total: calculateCartTotal(updatedCartItems), // Cập nhật tổng sau khi cập nhật sản phẩm
                },
            };

        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            if (!action.payload) {
                console.error("Payload is invalid:", action.payload);
                return {
                    ...state,
                    loading: false,
                    error: 'Invalid payload format',
                };
            }
            const remainingCartItems = state.cartItems.filter((item) =>
                item.id !== action.payload
            );
            return {
                ...state,
                loading: false,
                cartItems: remainingCartItems,
                cart: {
                    ...state.cart,
                    total: calculateCartTotal(remainingCartItems), // Cập nhật tổng sau khi xóa sản phẩm
                },
            };

        case actionTypes.APPLY_COUPON_SUCCESS:
            if (!action.payload) {
                console.error("Payload is invalid:", action.payload);
                return {
                    ...state,
                    loading: false,
                    error: 'Invalid payload format',
                };
            }
            return {
                ...state,
                loading: false,
                error: null,
                appliedCouponOrder: action.payload,
                cart: {
                    ...state.cart,
                    ...action.payload, // Cập nhật lại giỏ hàng với dữ liệu mới từ payload
                },
            };

        case actionTypes.ADD_ITEM_TO_CART_BY_CODE_FAILURE:
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.UPDATE_CARTITEM_FAILURE:
        case actionTypes.REMOVE_CARTITEM_FAILURE:
        case actionTypes.APPLY_COUPON_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            localStorage.removeItem("jwt");
            return { ...initialState, success: "logout success" };

        default:
            return state;
    }
};

export default cartReducer;
