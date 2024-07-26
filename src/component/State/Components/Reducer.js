import {
    CREATE_COMPONENT_REQUEST,
    CREATE_COMPONENT_SUCCESS,
    CREATE_COMPONENT_FAILURE,
    GET_ALL_COMPONENT_REQUEST,
    GET_ALL_COMPONENT_SUCCESS,
    GET_ALL_COMPONENT_FAILURE,
    UPDATE_STOCK,
    UPDATE_COMPONENT_SUCCESS,
} from './ActionType';

const initialState = {
    components: [],
    update: null,
    loading: false, // Thêm trạng thái loading để quản lý việc gọi API
};

export const componentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COMPONENT_REQUEST:
            return {
                ...state,
                loading: true, // Bắt đầu loading khi gửi request
            };
        case CREATE_COMPONENT_SUCCESS:
            return {
                ...state,
                loading: false,
                components: [...state.components, action.payload], // Kết thúc loading khi request thành công
            };
        case CREATE_COMPONENT_FAILURE:
            return {
                ...state,
                loading: false, // Kết thúc loading khi request thất bại
                error: action.payload,
            };
        case GET_ALL_COMPONENT_REQUEST:
            return {
                ...state,
                loading: true, // Bắt đầu loading khi gửi request
            };
        case GET_ALL_COMPONENT_SUCCESS:
            return {
                ...state,
                loading: false, // Kết thúc loading khi request thành công
                components: action.payload, // Cập nhật danh sách components từ API
            };
        case GET_ALL_COMPONENT_FAILURE:
            return {
                ...state,
                loading: false, // Kết thúc loading khi request thất bại
            };
            case UPDATE_COMPONENT_SUCCESS:
            return {
                ...state,
                components: state.components.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case UPDATE_STOCK:
            return {
                ...state,
                components: state.components.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        default:
            return state;
    }
};

export default componentReducer;
