import { api } from '../src/api'; // import api from 'api-book'

export default api({
    host: "http://localhost:9000",
    init: {
        headers: {
            Accept: "application/json",
            'Content-type': "application/json;charset=UTF-8",
        },
        credentials: "include"
    },
    book: {
        intro: {
            url: '/api/intro/{{testId}}',
            method: 'GET',
            request: {
                header: { clientId: 'tsfhlkjswifqWERWERGvdsfaf' },
                path: { testId: '123456' },
                query: { a: 1 },
                body: { b: 2 }
            },
            response: { type: 'json' }
        },
        message: {
            url: '/api/message',
            method: 'GET',
            response: { type: 'json' }
        }
    },
    option: {
        type: 'xhr',
        testing: false
    }
});