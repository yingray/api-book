'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiRedux = exports.apiTest = exports.api = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _fetchCreators = require('./fetchCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = function isEmpty(value) {
    return value === undefined || value === null || value === '';
};

var jsonToQueryString = function jsonToQueryString(obj) {
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

var url = function url(host, _url, path, query) {
    return host + _mustache2.default.render(_url, path) + (isEmpty(query) ? '' : jsonToQueryString(query));
};

var api = exports.api = function api(host, config, init) {
    return _lodash2.default.mapValues(config, function (value, key) {
        return function (path, query, body) {
            return (0, _fetchCreators.createFetch)({
                "url": url(host, config[key].url, path, query),
                "method": config[key].method,
                "init": init,
                "body": isEmpty(body) ? null : body
            }, config[key].response.type);
        };
    });
};

var apiTest = exports.apiTest = function apiTest(host, config, init) {
    return _lodash2.default.mapValues(config, function (value, key) {
        return function (path, query, body) {
            return (0, _fetchCreators.createFetch)({
                "url": url(host, config[key].url, config[key].path, config[key].query),
                "method": config[key].method,
                "init": init,
                "body": isEmpty(config[key].request.body) ? null : config[key].request.body
            }, config[key].response.type);
        };
    });
};

var apiRedux = exports.apiRedux = function apiRedux(host, config, init) {
    return _lodash2.default.mapValues(config, function (value, key) {
        return function (path, query, body) {
            return require('./fetchCreatorsRedux').createFetch({
                "url": url(host, config[key].url, path, query),
                "method": config[key].method,
                "init": init,
                "body": isEmpty(body) ? null : body
            }, config[key].response.type);
        };
    });
};

exports.default = api;