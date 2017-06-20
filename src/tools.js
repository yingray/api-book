import _ from 'lodash'

export const isEmpty = value => value === undefined || value === null || value === ''

export const objectIsEmpty = obj => Object.keys(obj).length === 0

export const jsonToQueryString = function(obj) {
  const qs = _.reduce(
    obj,
    function(result, value, key) {
      if (!_.isNull(value) && !_.isUndefined(value)) {
        if (_.isArray(value)) {
          result += _.reduce(
            value,
            function(result1, value1) {
              if (!_.isNull(value1) && !_.isUndefined(value1)) {
                result1 += key + '=' + value1 + '&'
                return result1
              } else {
                return result1
              }
            },
            ''
          )
        } else {
          result += key + '=' + value + '&'
        }
        return result
      } else {
        return result
      }
    },
    ''
  ).slice(0, -1)
  return '?' + qs
}
