import {
  GET_WARRANTYS_REQUEST,
  GET_WARRANTYS_SUCCESS,
  GET_WARRANTYS_FAILURE,
  GET_WARRANTY_BY_ORDER_ID_REQUEST,
  GET_WARRANTY_BY_ORDER_ID_SUCCESS,
  GET_WARRANTY_BY_ORDER_ID_FAILURE,
  GET_WARRANTY_BY_ID_REQUEST,
  GET_WARRANTY_BY_ID_SUCCESS,
  GET_WARRANTY_BY_ID_FAILURE
} from './ActionType';
  const initialState = {
    warranties: [],
    warranty: null,
    loading: false,
    error: null
  };
  
  const warrantyReducer = (state = initialState, action) => {
    switch (action.type) {
      case  GET_WARRANTYS_REQUEST:
      case GET_WARRANTY_BY_ORDER_ID_REQUEST:
      case GET_WARRANTY_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_WARRANTYS_SUCCESS:
        return {
          ...state,
          loading: false,
          warranties: action.payload,
          error: null
        };
      case GET_WARRANTY_BY_ORDER_ID_SUCCESS:
      case GET_WARRANTY_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          warranty: action.payload,
          error: null
        };
      case GET_WARRANTYS_FAILURE:
      case GET_WARRANTY_BY_ORDER_ID_FAILURE:
      case GET_WARRANTY_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default warrantyReducer;
  