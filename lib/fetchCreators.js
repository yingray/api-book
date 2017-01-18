'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createFetch = undefined;

require('isomorphic-fetch');

var checkStatus = function checkStatus(response) {
    if (response.status < 300 || response.ok || response.statusText === 'OK') {
        return response;
    } else {
        throw response;
    }
};

var handleError = function handleError(error) {
    console.log('FetchCreator Catches Error!');
    console.log(error);
    throw error;
};

var createFetch = exports.createFetch = function createFetch(_ref) {
    var url = _ref.url,
        init = _ref.init,
        responseMixin = _ref.responseMixin,
        optionType = _ref.optionType;

    if (optionType === 'xhr') {
        require('./xhr');
    }
    return fetch(url, init).then(function (response) {
        return checkStatus(response);
    }).then(function (response) {
        return responseMixin ? response[responseMixin]() : response;
    }).catch(function (error) {
        return handleError(error);
    });
};

// export const createFetch = (param, responseMixin) => {
//     return fetch(param.url, createQuery(param.method, param.body, param.init))
//         .then(response => checkStatus(response))
//         .then(response => responseMixin ? response[responseMixin]() : response)
//         .catch(error => handleError(error))
// }