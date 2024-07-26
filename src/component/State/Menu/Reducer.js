import * as actionTypes from './ActionType';

const initialState = {
    menuItems: [],
    outOfStock: [],
    loading: false,
    error: null,
    search: null,
    message: null
};

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_JEWELRY_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
        case actionTypes.GET_MENU_ITEM_BY_CODE_REQUEST:
        case actionTypes.UPDATE_JEWELRY_PRICES_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message: "Jewelry Create Successfully"
            };
        case actionTypes.GET_MENU_ITEMS_BY_JEWELRY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            };
        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    menuItem => menuItem.id!== action.payload
                ),
            };
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("updated item id",action.payload.id)
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    menuItem => menuItem.id === action.payload.id?action
                    .payload : menuItem
                ),
            };
        case actionTypes.UPDATE_JEWELRY_PRICES_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.map(menuItem =>
          menuItem.id === action.payload.id ? { ...menuItem, price: action.payload.price } : menuItem
        ),
        message: "Jewelry prices updated successfully"
      };
        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
        case actionTypes.GET_MENU_ITEM_BY_CODE_SUCCESS :
            
        return {
                ...state,
                loading: false,
                search: action.payload,
            };
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_JEWELRY_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
        case actionTypes.GET_MENU_ITEM_BY_CODE_FAILURE:
        case actionTypes.UPDATE_JEWELRY_PRICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
            case actionTypes.INSTOCK_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.INSTOCK_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    menuItem => menuItem.id === action.payload.id ? action.payload : menuItem
                ),
                message: "Item moved to instock successfully"
            };
        case actionTypes.INSTOCK_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

            case actionTypes.GET_OUT_OF_STOCk_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.GET_OUT_OF_STOCk_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                outOfStock: action.payload, // Update out of stock items in state
                message: "Out of stock items fetched successfully"
            };
        case actionTypes.GET_OUT_OF_STOCk_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };


        default:
            return state;
    }

};

export default menuItemReducer;