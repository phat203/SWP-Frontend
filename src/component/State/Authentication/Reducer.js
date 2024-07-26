
import { BAN_USER_FAILURE, BAN_USER_REQUEST, BAN_USER_SUCCESS, CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, GET_ALL_BAN_USER_FAILURE, GET_ALL_BAN_USER_REQUEST, GET_ALL_BAN_USER_SUCCESS, GET_ALL_STAFF_AND_MANAGER_FAILURE, GET_ALL_STAFF_AND_MANAGER_REQUEST, GET_ALL_STAFF_AND_MANAGER_SUCCESS, GET_ALL_STAFF_USER_FAILURE, GET_ALL_STAFF_USER_REQUEST, GET_ALL_STAFF_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState={
    users : [],
    user: null,
    isLoading : false,
    error : null,
    jwt: null,
    success: null
};
export const authReducer = (state = initialState,action) =>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_STAFF_USER_REQUEST:
        case BAN_USER_REQUEST:
        case GET_ALL_STAFF_AND_MANAGER_REQUEST:
        case GET_ALL_BAN_USER_REQUEST:
            return{...state,
                isLoading:true,
                error:null,
                success:null
            };   
    
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        return {...state,
            isLoading: false,
            jwt : action.payload,
            success:"Register Success"
        };
        case GET_USER_SUCCESS :
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case GET_ALL_STAFF_USER_SUCCESS :
        case GET_ALL_STAFF_AND_MANAGER_SUCCESS:
        case GET_ALL_BAN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users : action.payload,
            };

            case LOGOUT :
                return initialState;
        
            case REGISTER_FAILURE:
            case LOGIN_FAILURE:
            case GET_USER_FAILURE:
            case BAN_USER_FAILURE:
            case GET_ALL_STAFF_USER_FAILURE:
            case GET_ALL_STAFF_AND_MANAGER_FAILURE:
            case GET_ALL_BAN_USER_FAILURE:
                    return{
                        ...state,
                        isLoading: false,
                        error: action.payload,
                        success:null,
                    };   
                    
                    case CREATE_USER_REQUEST:
                        return {
                            ...state,
                            loading: true, // Bắt đầu loading khi gửi request
                        };
                    case CREATE_USER_SUCCESS:
                        return {
                            ...state,
                            loading: false,
                            users: [...state.users, action.payload], // Kết thúc loading khi request thành công
                        };
                    case CREATE_USER_FAILURE:
                        return {
                            ...state,
                            loading: false, // Kết thúc loading khi request thất bại
                            error: action.payload,
                        };

                        case BAN_USER_SUCCESS:
                return {
                ...state,
                isLoading: false,
                success: "User banned successfully",
                users: state.users.map((user) => 
                    user.id === action.payload.id ? action.payload : user
                ),
            };

            default:
            return state;

    }
};