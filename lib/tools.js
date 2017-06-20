'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToQueryString = exports.objectIsEmpty = exports.isEmpty = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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