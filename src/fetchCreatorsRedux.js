import 'isomorphic-fetch'
import _ from 'lodash'

const loadingStartAction = () => ({ type: 'UTILS_LOADING_START' })

const loadingEndAction = () => ({ type: 'UTILS_LOADING_END' })

const createQuery = (method, body, init) => {

    let query = {
        "method": method
    };

    if(init) {
        query = _.merge(query, init);
    } else {
        query = _.merge(query, {
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json;charset=UTF-8"
            },
            "credentials": "include"
        });
    }

    if(body) query.body = JSON.stringify(body)

    return query
}

const checkStatus = response => dispatch => {
    if (response.status < 300 || response.ok || response.statusText === 'OK') {
        dispatch(loadingEndAction())
        return response
    } else {
        throw response
    }
}

const handleError = error => dispatch => {
    console.log('FetchCreator Catches Error!')
    console.log(error)
    dispatch(loadingEndAction())
    throw error
}

export const createFetch = (param, responseMixin) => dispatch => {
    dispatch(loadingStartAction())
    return fetch(param.url, createQuery(param.method, param.body, param.init))
        .then(response => dispatch(checkStatus(response)))
        .then(response => responseMixin ? response[responseMixin]() : response)
        .catch(error => dispatch(handleError(error)))
}