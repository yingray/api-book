import _ from 'lodash'
import Mustache from 'mustache'
import { createFetch } from './fetchCreators'

const isEmpty = value => value === undefined || value === null || value === '';

const jsonToQueryString = function (obj) {
    const qs = _.reduce(obj, function (result, value, key) {
        if (!_.isNull(value) && !_.isUndefined(value)) {
            if (_.isArray(value)) {
                result += _.reduce(value, function (result1, value1) {
                    if (!_.isNull(value1) && !_.isUndefined(value1)) {
                        result1 += key + '=' + value1 + '&';
                        return result1
                    } else {
                        return result1;
                    }
                }, '')
            } else {
                result += key + '=' + value + '&';
            }
            return result;
        } else {
            return result
        }
    }, '').slice(0, -1);
    return '?' + qs;
};

const url = (host, url, path, query) => host + Mustache.render(url, path) + (isEmpty(query) ? '' : jsonToQueryString(query));

export const api = (host, config, init) => _.mapValues(config, (value, key) => (path, query, body) => createFetch({
        "url": url(host, config[key].url, path, query),
        "method": config[key].method,
        "init": init,
        "body": isEmpty(body) ? null : body
    }, config[key].response.type)
);

export const apiTest = (host, config, init) => _.mapValues(config, (value, key) => (path, query, body) => createFetch({
        "url": url(host, config[key].url, config[key].path, config[key].query),
        "method": config[key].method,
        "init": init,
        "body": isEmpty(config[key].request.body) ? null : config[key].request.body
    }, config[key].response.type)
);

export const apiRedux = (host, config, init) => _.mapValues(config, (value, key) => (path, query, body) => require('./fetchCreatorsRedux').createFetch({
        "url": url(host, config[key].url, path, query),
        "method": config[key].method,
        "init": init,
        "body": isEmpty(body) ? null : body
    }, config[key].response.type)
);

export default api;
