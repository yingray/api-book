import _ from 'lodash';
import { createFetch } from './fetchCreators';
import configureServices from './configureServices';

export const api = ({ host, init, book, option }) => {

    const apiObj = _.mapValues(book, (value, key) => (actualRequest = {}) =>
        createFetch(configureServices({
            host,
            init,
            option,
            actualRequest,
            url: book[key].url,
            method: book[key].method,
            request: book[key].request,
            response: book[key].response
        }))
    );

    return apiObj
}