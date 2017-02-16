import _ from 'lodash';
import Mustache from 'mustache';
import { isEmpty, jsonToQueryString } from './tools';

const configureServices = ({
    host,
    init,
    option,
    actualRequest,
    url,
    method,
    request,
    response
}) => {

    const defaultInit = {
        "headers": {
            "Accept": "application/json",
            "Content-type": "application/json;charset=UTF-8"
        },
        "credentials": "include"
    };

    const requestChoice = option.testing ? request : actualRequest;

    const getUrl = ({ host, url, requestChoice }) => {
        let finalUrl;
        try {
            finalUrl = host + Mustache.render(url, requestChoice.path) + (isEmpty(requestChoice.query) ? '' : jsonToQueryString(requestChoice.query));
        } catch (e) {
            console.error('[Api-Book] Please give the path\'s params!')
            console.error(e);
        }
        return finalUrl
    };

    const getInit = ({ method, requestChoice, init = defaultInit }) => {

        let query = _.merge({ method }, init);

        if (requestChoice.body) {
            query = _.merge({ body: JSON.stringify(requestChoice.body) }, query);
            // JSON.stringify(body)
        }

        if (requestChoice.header) {
            query = _.merge({ headers: requestChoice.header }, query);
        }

        return query
    };

    const config = {
        url: getUrl({ host, url, requestChoice }),
        init: getInit({ method, requestChoice, init }),
        responseMixin: response.type,
        optionType: option.type
    };

    return config;

};

export default configureServices;