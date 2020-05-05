const article = (state = {}, action) => {
    let resultantState = state;
    if (action && action.type) {
        switch (action.type) {
            case 'FETCH_SUCCESS': {
                if (action.payload) {
                    resultantState = {
                        ...resultantState,
                        data: action.payload
                    };
                }
                break;
            }
            case 'FETCH_ERROR': {
                if (action.payload) {
                    resultantState = {
                        ...resultantState,
                        response: action.payload
                    };
                }
                break;
            }
            default: {
                resultantState = { ...state };
                resultantState.loadingData = false;
                resultantState.loadedData = false;
                break;
            }
        }
        return resultantState;
    };
}

export default article;