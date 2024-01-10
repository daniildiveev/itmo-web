import {ADD_POINT, SET_POINTS, SET_R, USER_LOGIN, USER_LOGOUT} from './actionTypes';
import {getAllPoints} from "../services/pointService";

export const userLogin = (jwt) => ({
    type: USER_LOGIN,
    payload: jwt,
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

export const setDefaultPoints = async (jwt) => ({
    type: SET_POINTS,
    payload: await getAllPoints(jwt)
})