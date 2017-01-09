import _ from 'lodash'
import Mustache from 'mustache'
import { createFetch } from './fetchCreators'

export const isEmpty = value => value === undefined || value === null || value === '';
export const objectIsEmpty = obj => Object.keys(obj).length === 0;

export const jsonToQueryString = function (obj) {
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

export const url = (host, url, path, query) => host + Mustache.render(url, path) + (isEmpty(query) ? '' : jsonToQueryString(query));

export const api = (host, book, init) => _.mapValues(book, (value, key) => (path, query, body) => createFetch({
        "url": url(host, book[key].url, path, query),
        "method": book[key].method,
        "init": init,
        "body": isEmpty(body) ? null : body
    }, book[key].response.type)
);

export const apiTest = (host, book, init) => _.mapValues(book, (value, key) => (path, query, body) => createFetch({
        "url": url(host, book[key].url, book[key].request.path, book[key].request.query),
        "method": book[key].method,
        "init": init,
        "body": isEmpty(book[key].request.body) ? null : book[key].request.body
    }, book[key].response.type)
);

export const apiRedux = (host, book, init) => _.mapValues(book, (value, key) => (path, query, body) => require('./fetchCreatorsRedux').createFetch({
        "url": url(host, book[key].url, path, query),
        "method": book[key].method,
        "init": init,
        "body": isEmpty(body) ? null : body
    }, book[key].response.type)
);

export default (host, book, init, option) => _.mapValues(book, (value, key) => (path, query, body) => {

        let useFetch = createFetch;

        let useBook = book[key];
        useBook.request = {
            path: objectIsEmpty(path) ? '' : book[key].request.path,
            query: objectIsEmpty(query) ? '' : book[key].request.query,
            body: objectIsEmpty(body) ? '' : book[key].request.body
        }

        if (option !== 'testing') {
            useBook.request = {
                path: objectIsEmpty(path) ? '' : path,
                query: objectIsEmpty(query) ? '' : query,
                body: objectIsEmpty(body) ? '' : body
            }
        } else if (option === 'redux') {
            useFetch = require('./fetchCreatorsRedux').createFetch;
        }

        return useFetch({
            "url": url(host, useBook.url, useBook.request.path, useBook.request.query),
            "method": useBook.method,
            "init": init,
            "body": isEmpty(useBook.request.body) ? null : useBook.request.body
        }, useBook.response.type)
    }
);
