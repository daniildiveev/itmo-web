const initialState = {
    r: 1,
};

function rReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_R':
            return {...state, r: action.payload};
        default:
            return state;
    }
}

export default rReducer;