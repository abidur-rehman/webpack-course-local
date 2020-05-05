import fetch from 'cross-fetch'

export const fetchArticle = () => async (dispatch, getState) => {
    console.log('fetchArticle called......');
    fetch(`https://jsonplaceholder.typicode.com/comments/1`)
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/1`)
        const items = await response.json()
        dispatch(fetchSuccess(items))
    } catch (err) {
        dispatch(fetchError(err))
    }
}

const fetchSuccess = response => {
    return {
        type: 'FETCH_SUCCESS',
        payload: response
    }
}

const fetchError = error => {
    return {
        type: 'FETCH_ERROR',
        payload: error
    }
}