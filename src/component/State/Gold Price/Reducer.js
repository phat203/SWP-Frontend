// src/redux/reducer.js

import { FETCH_COMPONENTS_FAILURE, FETCH_COMPONENTS_REQUEST, FETCH_COMPONENTS_SUCCESS } from "./ActionType";



const initialState = {
  loading: false,
  components: [],
  error: "",
};

const goldPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPONENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPONENTS_SUCCESS:
      return {
        loading: false,
        components: action.payload,
        error: "",
      };
    case FETCH_COMPONENTS_FAILURE:
      return {
        loading: false,
        components: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default goldPriceReducer;
