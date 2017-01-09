import expect from 'expect';
import * as api from '../src/api';

describe('File - api.js', () => {
    it('Validate isEmpty working', () => {
        expect(api.isEmpty(null)).toEqual(true)
    })
    it('Validate isEmpty working', () => {
        expect(api.isEmpty(undefined)).toEqual(true)
    })
    it('Validate isEmpty working', () => {
        expect(api.isEmpty('')).toEqual(true)
    })

    it('Should output the right query string', () => {
        expect(api.jsonToQueryString({
            a: 1,
            b: '2',
            c: true
        })).toEqual('?a=1&b=2&c=true')
    })
    it('Should output the right query string', () => {
        expect(api.jsonToQueryString({ a: 1 })).toEqual('?a=1')
    })
    it('Should output the right query string', () => {
        expect(api.jsonToQueryString({})).toEqual('?')
    })

    const host = 'http//localhost:9000';
    const url = '/api/test/{{id}}';
    const path = {
        id: 19234857
    };
    const query = '';

    it('Should outpuy the right URL', () => {
        expect(api.url(host, url, path, query)).toEqual('http//localhost:9000/api/test/19234857')
    })

})