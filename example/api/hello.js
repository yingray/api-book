import api from '../../index';

const host = "http://localhost:9000";

const api_doc = {
    intro: {
        url: '/api/intro',
        method: 'GET',
        request: {
            path: {},
            query: {},
            body: {}
        },
        response: {
            type: 'json'
        }
    }
};

const init = {
    "headers": {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8",
    },
    "credentials": "include"
};

export default api(host, api_doc, init);