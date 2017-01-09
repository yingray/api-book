'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createFetch = undefined;

require('isomorphic-fetch');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createQuery = function createQuery(method, body, init) {

    var query = {
        "method": method
    };

    if (init) {
        query = _lodash2.default.merge(query, init);
    } else {
        query = _lodash2.default.merge(query, {
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json;charset=UTF-8"
            },
            "credentials": "include"
        });
    }

    if (body) query.body = JSON.stringify(body);

    return query;
};

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

var createFetch = exports.createFetch = function createFetch(param, responseMixin) {
    return fetch(param.url, createQuery(param.method, param.body, param.init)).then(function (response) {
        return checkStatus(response);
    }).then(function (response) {
        return responseMixin ? response[responseMixin]() : response;
    }).catch(function (error) {
        return handleError(error);
    });
};