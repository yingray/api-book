'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.api = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fetchCreators = require('./fetchCreators');

var _configureServices = require('./configureServices');

var _configureServices2 = _interopRequireDefault(_configureServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = exports.api = function api(_ref) {
    var host = _ref.host,
        init = _ref.init,
        book = _ref.book,
        option = _ref.option;


    var apiObj = _lodash2.default.mapValues(book, function (value, key) {
        return function () {
            var actualRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return (0, _fetchCreators.createFetch)((0, _configureServices2.default)({
                host: host,
                init: init,
                option: option,
                actualRequest: actualRequest,
                url: book[key].url,
                method: book[key].method,
                request: book[key].request,
                response: book[key].response
            }));
        };
    });

    return apiObj;
};