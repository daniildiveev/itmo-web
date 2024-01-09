import {USER_LOGIN, USER_LOGOUT} from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    jwt: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                jwt: action.payload.jwt
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                jwt: null
            }
        default:
            return state;
    }
};

export default authReducer;