import { CREATE_BUYBACK_FAILURE, CREATE_BUYBACK_OUT_FAILURE, CREATE_BUYBACK_OUT_REQUEST, CREATE_BUYBACK_OUT_SUCCESS, CREATE_BUYBACK_REQUEST, CREATE_BUYBACK_SUCCESS, GET_ALL_BUYBACK_FAILURE, GET_ALL_BUYBACK_REQUEST, GET_ALL_BUYBACK_SUCCESS, GET_BUYBACK_BY_ID_FAILURE, GET_BUYBACK_BY_ID_REQUEST, GET_BUYBACK_BY_ID_SUCCESS } from "./Actiontype";

  
  const initialState = {
    buybacks : [],
    buyback: null,
    error: null,
    loading: false
    
  };
  
  const buybackReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BUYBACK_REQUEST:
      case CREATE_BUYBACK_OUT_REQUEST:
      case GET_ALL_BUYBACK_REQUEST:
      case GET_BUYBACK_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case CREATE_BUYBACK_SUCCESS:
      case CREATE_BUYBACK_OUT_SUCCESS:
        return {
          ...state,
          buyback: action.payload,
          loading: false,
          error: null
        };
      case GET_ALL_BUYBACK_SUCCESS:
      return {
        ...state,
        buybacks : action.payload,
        loading: false,
        error: null
      };
      case GET_BUYBACK_BY_ID_SUCCESS:
        return {
          ...state,
          buyback : action.payload,
          loading: false,
          error: null
        };

      case CREATE_BUYBACK_FAILURE:
      case CREATE_BUYBACK_OUT_FAILURE:
      case GET_ALL_BUYBACK_FAILURE :
      case GET_BUYBACK_BY_ID_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default buybackReducer;
  