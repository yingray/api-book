'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureServices = function configureServices(_ref) {
    var host = _ref.host,
        init = _ref.init,
        option = _ref.option,
        actualRequest = _ref.actualRequest,
        url = _ref.url,
        method = _ref.method,
        request = _ref.request,
        response = _ref.response;


    var defaultInit = {
        "headers": {
            "Accept": "application/json",
            "Content-type": "application/json;charset=UTF-8"
        },
        "credentials": "include"
    };

    var requestChoice = option.testing ? request : actualRequest;

    var getUrl = function getUrl(_ref2) {
        var host = _ref2.host,
            url = _ref2.url,
            requestChoice = _ref2.requestChoice;

        var finalUrl = void 0;
        try {
            finalUrl = host + _mustache2.default.render(url, requestChoice.path) + ((0, _tools.isEmpty)(requestChoice.query) ? '' : (0, _tools.jsonToQueryString)(requestChoice.query));
        } catch (e) {
            console.error('[Api-Book] Please give the path\'s params!');
            console.error(e);
        }
        return finalUrl;
    };

    var getInit = function getInit(_ref3) {
        var method = _ref3.method,
            requestChoice = _ref3.requestChoice,
            _ref3$init = _ref3.init,
            init = _ref3$init === undefined ? defaultInit : _ref3$init;

        var query = _.merge({ method: method }, init);

        if (requestChoice.body) {
            query = _.merge({ body: requestChoice.body }, query);
        }

        if (requestChoice.header) {
            query = _.merge({ headers: requestChoice.header }, query);
        }

        return query;
    };

    var config = {
        url: getUrl({ host: host, url: url, requestChoice: requestChoice }),
        init: getInit({ method: method, requestChoice: requestChoice, init: init }),
        responseMixin: response.type
    };

    return config;
};

exports.default = configureServices;