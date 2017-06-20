import { jsonToQueryString } from './tools'
import _ from 'lodash'
import Mustache from 'mustache'
import 'whatwg-fetch'

const newBook = {
  GetPosts: {
    url: '/posts/{{name}}',
    method: 'GET',
    payload: {
      query: {
        id: '{{id}}'
      },
      body: {
        form1: '{{form}}',
        form2: {
          a: '{{a}}',
          b: '{{b}}'
        },
        form3: ['{{c}}', '{{d}}']
      }
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer {{accessToken}}'
    },
    options: {
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    }
  }
}

export class ApiCreator {
  constructor(book, options) {
    this.setMethods(book)
    this.options = options
    this.ApiBookError = ['Need url']
  }

  setMethods(book) {
    _.mapKeys(book, (chapter, key) => {
      this[key] = this.getFetchObject.bind(this, chapter)
    })
  }

  getFetchURL(injectedChapter) {
    let fetchURL = injectedChapter.url
    if (this.options && this.options.hasOwnProperty('host')) {
      fetchURL = this.options.host + fetchURL
    }
    if (injectedChapter.payload.hasOwnProperty('query') && injectedChapter.payload.query) {
      fetchURL = fetchURL + jsonToQueryString(injectedChapter.payload.query)
    }
    return fetchURL
  }

  getFetchInit(injectedChapter) {
    return ({
      method: injectedChapter.method,
      headers: injectedChapter.headers,
      body: JSON.stringify(injectedChapter.payload.body),
      ...injectedChapter.options
    })
  }

  getFetchObject(chapter, parameters) {
    const injectedChapter = this.getInjectedChapter(chapter, parameters)
    const fetchURL = this.getFetchURL(injectedChapter)
    const fetchInit = this.getFetchInit(injectedChapter)
    const fetchPromiseObject = fetch(fetchURL, fetchInit)
    return fetchPromiseObject
  }

  isChapterConfigRequireFieldsAllDone(chapter) {
    if (!chapter.hasOwnProperty('url')) {
      throw this.ApiBookError[0]
    }
    if (!chapter.hasOwnProperty('method')) {
      throw this.ApiBookError[0]
    } else {
    }
    return true
  }

  isParametersTypeRight(parameters) {
    switch (typeof parameters) {
      case 'string':
        return false
      case 'number':
        return false
      default:
        return true
    }
  }

  isParametersMatchChapterConfig(chapter, parameters) {
    // console.log(chapter)
    return true
  }

  getInjectedChapter(chapter, parameters) {
    if (
      this.isChapterConfigRequireFieldsAllDone(chapter) &&
      this.isParametersTypeRight(parameters) &&
      this.isParametersMatchChapterConfig(chapter, parameters)
    ) {
      const stringifyChapter = JSON.stringify(chapter)
      const injectedStringifyChapter = Mustache.render(stringifyChapter, parameters)
      const injectedChapter = JSON.parse(injectedStringifyChapter)
      return injectedChapter
    }
  }
}

module.exports = {
  ApiCreator,
}