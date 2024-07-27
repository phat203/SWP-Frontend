import * as actionTypes from "./ActionType";

const initialState = {
    areas : [],
    userArea  : null,
    area : null,
    // categories: null,
    loading : false,
    error : null,
};

const areaReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_AREA_REQUEST:
        case actionTypes.GET_ALL_AREA_REQUEST:
        case actionTypes.DELETE_AREA_REQUEST:
        case actionTypes.UPDATE_AREA_REQUEST:
        case actionTypes.GET_AREA_BY_USER_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error : null,
            };
    case actionTypes.CREATE_AREA_SUCCESS:
            return {
                ...state,
                loading : false,
                userArea : action.payload
            };
    case actionTypes.GET_ALL_AREA_SUCCESS:
            return{
                ...state,
                loading : false,
                areas : action.payload,
            };
    case actionTypes.GET_AREA_BY_ID_SUCCESS:
        return{
            ...state,
            loading: false,
            area : action.payload,
        };
    case actionTypes.GET_AREA_BY_USER_ID_SUCCESS:
    case actionTypes.UPDATE_AREA_STATUS_SUCCESS:
    case actionTypes.UPDATE_AREA_SUCCESS:
            return{
                ...state,
                loading:false,
                userArea : action.payload,
            };
    case actionTypes.DELETE_AREA_SUCCESS:
        return {
            ...state,
            error : null,
            loading: false,
            areas : state.areas.filter(
                (item) => item.id !== action.payload
            ),
            usersArea : state.usersArea.filter(
                (item) => item.id !== action.payload
            ),
        };

        case actionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading : false,
                events: [...state.events, action.payload],
                areaEvents : [...state.areaEvents,action.payload],
            };
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events : action.payload,
            };
        case actionTypes.GET_AREA_EVENTS_SUCCESS:
            return {
                ...state,
                loading : false,
                areaEvents : action.payload,
            };
        case actionTypes.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading : false,
                events: state.events.filter((item) => item.id !== action.payload),
                areaEvents: state.areaEvents.filter(
                    (item) => item.id !== action.payload
                ),
            };

        case actionTypes.CREATE_AREA_FAILURE:
        case actionTypes.GET_ALL_AREA_FAILURE:
        case actionTypes.DELETE_AREA_FAILURE:
        case actionTypes.UPDATE_AREA_FAILURE:
        case actionTypes.GET_AREA_BY_ID_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            default:
                return state;
    }
};

export default areaReducer;