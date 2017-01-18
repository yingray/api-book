import 'isomorphic-fetch'

const checkStatus = response => {
    if (response.status < 300 || response.ok || response.statusText === 'OK') {
        return response
    } else {
        throw response
    }
}

const handleError = error => {
    console.log('FetchCreator Catches Error!')
    console.log(error)
    throw error
}

export const createFetch = ({ url, init, responseMixin, optionType }) => {
    if(optionType === 'xhr') {
        require('./xhr');
    }
    return fetch(url, init)
        .then(response => checkStatus(response))
        .then(response => responseMixin ? response[responseMixin]() : response)
        .catch(error => handleError(error))
}

// export const createFetch = (param, responseMixin) => {
//     return fetch(param.url, createQuery(param.method, param.body, param.init))
//         .then(response => checkStatus(response))
//         .then(response => responseMixin ? response[responseMixin]() : response)
//         .catch(error => handleError(error))
// }
