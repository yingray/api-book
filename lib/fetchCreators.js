import 'isomorphic-fetch'
import _ from 'lodash'

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

const checkStatus = response  => {
    if (response.status < 300 || response.ok || response.statusText === 'OK') {
        return response
    } else {
        throw response
    }
}

const handleError = error  => {
    console.log('FetchCreator Catches Error!')
    console.log(error)
    throw error
}

export const createFetch = (param, responseMixin)  => {
    return fetch(param.url, createQuery(param.method, param.body, param.init))
        .then(response => checkStatus(response))
        .then(response => responseMixin ? response[responseMixin]() : response)
        .catch(error => handleError(error))
}