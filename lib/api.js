'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.api = exports.apiRedux = exports.apiTest = exports._api = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _fetchCreators = require('./fetchCreators');

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _api = exports._api = function _api(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (_ref) {
            var path = _ref.path,
                query = _ref.query,
                body = _ref.body;
            return (0, _fetchCreators.createFetch)({
                "url": url(host, book[key].url, path, query),
                "method": book[key].method,
                "init": init,
                "body": (0, _tools.isEmpty)(body) ? null : body
            }, book[key].response.type);
        };
    });
};

var apiTest = exports.apiTest = function apiTest(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (_ref2) {
            var path = _ref2.path,
                query = _ref2.query,
                body = _ref2.body;
            return (0, _fetchCreators.createFetch)({
                "url": url(host, book[key].url, book[key].request.path, book[key].request.query),
                "method": book[key].method,
                "init": init,
                "body": (0, _tools.isEmpty)(book[key].request.body) ? null : book[key].request.body
            }, book[key].response.type);
        };
    });
};

var apiRedux = exports.apiRedux = function apiRedux(host, book, init) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (_ref3) {
            var path = _ref3.path,
                query = _ref3.query,
                body = _ref3.body;
            return require('./fetchCreatorsRedux').createFetch({
                "url": url(host, book[key].url, path, query),
                "method": book[key].method,
                "init": init,
                "body": (0, _tools.isEmpty)(body) ? null : body
            }, book[key].response.type);
        };
    });
};

var api = exports.api = function api(host, book, init, option) {
    return configureServices(host, book, init, option);
};

var configureServices = function configureServices(host, book, init, option) {

    return _lodash2.default.mapValues(book, function (value, key) {
        return function () {
            var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                path = _ref4.path,
                query = _ref4.query,
                body = _ref4.body,
                header = _ref4.header;

            var bookChild = book[key];

            var requestChoice = option === 'testing' ? bookChild.request : { path: path, query: query, body: body, header: header };

            var fetchParams = {
                url: getUrl({
                    host: host,
                    url: bookChild.url,
                    path: requestChoice.path,
                    query: requestChoice.query
                }),
                method: getMethod(bookChild.method),
                init: init,
                body: (0, _tools.isEmpty)(requestChoice.body) ? null : requestChoice.body,
                responseType: bookChild.response.type
            };

            return (0, _fetchCreators.createFetch)(fetchParams, fetchParams.responseType);
        };
    });
};

var getUrl = function getUrl(_ref5) {
    var host = _ref5.host,
        url = _ref5.url,
        path = _ref5.path,
        query = _ref5.query;

    var finalUrl = void 0;
    try {
        finalUrl = host + _mustache2.default.render(url, path) + ((0, _tools.isEmpty)(query) ? '' : (0, _tools.jsonToQueryString)(query));
    } catch (e) {
        console.error('[Api-Book] Please give the path\'s params!');
        console.error(e);
    }
    return finalUrl;
};

var getMethod = function getMethod(method) {
    if (method) {
        return method;
    } else {
        console.warn('[Api-Book] Please give this API method.(ex. GET, POST)');
        return 'GET';
    }
};

var getBody = function getBody() {};

exports.default = function (host, book, init, option) {
    return _lodash2.default.mapValues(book, function (value, key) {
        return function (_ref6) {
            var path = _ref6.path,
                query = _ref6.query,
                body = _ref6.body;


            var useFetch = _fetchCreators.createFetch;

            var useBook = book[key];
            useBook.request = {
                path: (0, _tools.objectIsEmpty)(path) ? '' : book[key].request.path,
                query: (0, _tools.objectIsEmpty)(query) ? '' : book[key].request.query,
                body: (0, _tools.objectIsEmpty)(body) ? '' : book[key].request.body
            };

            if (option !== 'testing') {
                useBook.request = {
                    path: (0, _tools.objectIsEmpty)(path) ? '' : path,
                    query: (0, _tools.objectIsEmpty)(query) ? '' : query,
                    body: (0, _tools.objectIsEmpty)(body) ? '' : body
                };
            } else if (option === 'redux') {
                useFetch = require('./fetchCreatorsRedux').createFetch;
            }

            return useFetch({
                "url": url(host, useBook.url, useBook.request.path, useBook.request.query),
                "method": useBook.method,
                "init": init,
                "body": (0, _tools.isEmpty)(useBook.request.body) ? null : useBook.request.body
            }, useBook.response.type);
        };
    });
};