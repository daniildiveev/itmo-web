import {USER_LOGIN, USER_LOGOUT} from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
};

export default authReducer;