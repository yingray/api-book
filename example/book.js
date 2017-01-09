import api from '../index'; // import api from 'api-book'

const host = "http://localhost:9000";

const book = {
    intro: {
        url: '/api/intro/{{testId}}',
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

export default api(host, book, init);