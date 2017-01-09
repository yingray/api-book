'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiRedux = exports.apiTest = exports.api = exports.url = exports.jsonToQueryString = exports.objectIsEmpty = exports.isEmpty = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _fetchCreators = require('./fetchCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = exports.isEmpty = function isEmpty(value) {
    return value === undefined || value === null || value === '';
};
var objectIsEmpty = exports.objectIsEmpty = function objectIsEmpty(obj) {
    return Object.keys(obj).length === 0;
};

var jsonToQueryString = exports.jsonToQueryString = function jsonToQueryString(obj) {
    var qs = _lodash2.default.reduce(obj, function (result, value, key) {
        if (!_lodash2.default.isNull(value) && !_lodash2.default.isUndefined(value)) {
            if (_lodash2.default.isArray(value)) {
                result += _lodash2.default.reduce(value, function (result1, value1) {
                    if (!_lodash2.default.isNull(value1) && !_lodash2.default.isUndefined(value1)) {
                        result1 += key + '=' + value1 + '&';
                        return result1;
                    } else {
                        return result1;
                    }
                }, '');
            } else {
                result += key + '=' + value + '&';
            }
            return result;
        } else {
            return result;
        }
    }, '').slice(0, -1);
    return '?' + qs;
};

var url = exports.url = function url(host, _url, path, query) {
    return host + _mustache2.default.render(_url, path) + (isEmpty(query) ? '' : jsonToQueryString(query));
};

var api = exports.api = function api(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (path, query, body) {
            return (0, _fetchCreators.createFetch)({
                "url": url(host, book[key].url, path, query),
                "method": book[key].method,
                "init": init,
                "body": isEmpty(body) ? null : body
            }, book[key].response.type);
        };
    });
};

var apiTest = exports.apiTest = function apiTest(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (path, query, body) {
            return (0, _fetchCreators.createFetch)({
                "url": url(host, book[key].url, book[key].request.path, book[key].request.query),
                "method": book[key].method,
                "init": init,
                "body": isEmpty(book[key].request.body) ? null : book[key].request.body
            }, book[key].response.type);
        };
    });
};

var apiRedux = exports.apiRedux = function apiRedux(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (path, query, body) {
            return require('./fetchCreatorsRedux').createFetch({
                "url": url(host, book[key].url, path, query),
                "method": book[key].method,
                "init": init,
                "body": isEmpty(body) ? null : body
            }, book[key].response.type);
        };
    });
};

exports.default = function (host, book, init, option) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (path, query, body) {

            var useFetch = _fetchCreators.createFetch;

            var useBook = book[key];
            useBook.request = {
                path: objectIsEmpty(path) ? '' : book[key].request.path,
                query: objectIsEmpty(query) ? '' : book[key].request.query,
                body: objectIsEmpty(body) ? '' : book[key].request.body
            };

            if (option !== 'testing') {
                useBook.request = {
                    path: objectIsEmpty(path) ? '' : path,
                    query: objectIsEmpty(query) ? '' : query,
                    body: objectIsEmpty(body) ? '' : body
                };
            } else if (option === 'redux') {
                useFetch = require('./fetchCreatorsRedux').createFetch;
            }

            return useFetch({
                "url": url(host, useBook.url, useBook.request.path, useBook.request.query),
                "method": useBook.method,
                "init": init,
                "body": isEmpty(useBook.request.body) ? null : useBook.request.body
            }, useBook.response.type);
        };
    });
};