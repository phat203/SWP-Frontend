// reducers.js
import { CALCULATE_BUYBACK_PRICE_FAILURE, CALCULATE_BUYBACK_PRICE_OUT_FAILURE, CALCULATE_BUYBACK_PRICE_OUT_REQUEST, CALCULATE_BUYBACK_PRICE_OUT_SUCCESS, CALCULATE_BUYBACK_PRICE_REQUEST, CALCULATE_BUYBACK_PRICE_SUCCESS } from './Actiontype';

  
  const initialState = {
    loading: false,
    totalPrice: 0.0,
    error: null
  };
  
  const valuationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CALCULATE_BUYBACK_PRICE_REQUEST:
      case CALCULATE_BUYBACK_PRICE_OUT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case CALCULATE_BUYBACK_PRICE_SUCCESS:
        case CALCULATE_BUYBACK_PRICE_OUT_SUCCESS:
    

        return {
          ...state,
          loading: false,
          totalPrice: action.payload,
          error: null
        };
      case CALCULATE_BUYBACK_PRICE_FAILURE:
      case CALCULATE_BUYBACK_PRICE_OUT_FAILURE:
        return {
          ...state,
          loading: false,
          totalPrice: 0.0,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default valuationReducer;
  