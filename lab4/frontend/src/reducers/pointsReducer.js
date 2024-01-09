const initialState = {
    points: [],
};

function pointsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_POINT':
            return { ...state, points: [...state.points, action.payload] };
        default:
            return state;
    }
}

export default pointsReducer;