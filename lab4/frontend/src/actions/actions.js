import {ADD_POINT, SET_R, USER_LOGIN, USER_LOGOUT} from './actionTypes';

export const userLogin = (user) => ({
    type: USER_LOGIN,
    payload: user,
});

export const userLogout = () => ({
    type: USER_LOGOUT
})

export const addPoint = (point) => ({
    type: ADD_POINT,
    payload: point,
})

export const setR = (r) => ({
    type: SET_R,
    payload: r,
})