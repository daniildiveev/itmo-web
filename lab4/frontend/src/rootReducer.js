import {combineReducers} from 'redux';
import authReducer from "./reducers/authReducer";
import pointsReducer from "./reducers/pointsReducer";
import rReducer from "./reducers/rReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = persistReducer(persistConfig, combineReducers({
    auth: authReducer,
    points: pointsReducer,
    r: rReducer,
}));

export default rootReducer;