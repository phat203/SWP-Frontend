// reducer.js
import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_AREA_REQUEST,
  GET_DASHBOARD_AREA_SUCCESS,
  GET_DASHBOARD_AREA_FAILURE,
  GET_DASHBOARD_AREAS_REQUEST,
  GET_DASHBOARD_AREAS_SUCCESS,
  GET_DASHBOARD_AREAS_FAILURE,
  GET_DASHBOARD_BUYBACK_REQUEST,
  GET_DASHBOARD_BUYBACK_SUCCESS,
  GET_DASHBOARD_BUYBACK_FAILURE,
  GET_DASHBOARD_BUYBACK_AREA_REQUEST,
  GET_DASHBOARD_BUYBACK_AREA_SUCCESS,
  GET_DASHBOARD_BUYBACK_AREA_FAILURE,
  GET_DASHBOARD_BUYBACK_AREAS_REQUEST,
  GET_DASHBOARD_BUYBACK_AREAS_SUCCESS,
  GET_DASHBOARD_BUYBACK_AREAS_FAILURE,
  GET_TOP_SELLING_PRODUCTS_REQUEST,
  GET_TOP_SELLING_PRODUCTS_SUCCESS,
  GET_TOP_SELLING_PRODUCTS_FAILURE,
} from './ActionType';

const initialState = {
  all: {
    totalOrders: 0,
    totalAmount: 0,
    totalItems: 0,
  },
  area: null,
  areas: null,
  buybackAll: {
    totalBuybacks: 0,
    totalAmount: 0,
    totalItems: 0,
  },
  buybackArea: null,
  buybackAreas: null,
  topSellingProducts: [],
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_REQUEST:
    case GET_DASHBOARD_AREA_REQUEST:
    case GET_DASHBOARD_AREAS_REQUEST:
    case GET_DASHBOARD_BUYBACK_REQUEST:
    case GET_DASHBOARD_BUYBACK_AREA_REQUEST:
    case GET_DASHBOARD_BUYBACK_AREAS_REQUEST:
    case GET_TOP_SELLING_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        all: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_AREA_SUCCESS:
      return {
        ...state,
        area: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_AREAS_SUCCESS:
      return {
        ...state,
        areas: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_BUYBACK_SUCCESS:
      return {
        ...state,
        buybackAll: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_BUYBACK_AREA_SUCCESS:
      return {
        ...state,
        buybackArea: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_BUYBACK_AREAS_SUCCESS:
      return {
        ...state,
        buybackAreas: action.payload,
        loading: false,
        error: null,
      };

    case GET_TOP_SELLING_PRODUCTS_SUCCESS:
      return {
        ...state,
        topSellingProducts: action.payload,
        loading: false,
        error: null,
      };

    case GET_DASHBOARD_FAILURE:
    case GET_DASHBOARD_AREA_FAILURE:
    case GET_DASHBOARD_AREAS_FAILURE:
    case GET_DASHBOARD_BUYBACK_FAILURE:
    case GET_DASHBOARD_BUYBACK_AREA_FAILURE:
    case GET_DASHBOARD_BUYBACK_AREAS_FAILURE:
    case GET_TOP_SELLING_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
