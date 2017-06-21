import { jsonToQueryString } from './tools'
import ApiBookError from './error'
import * as Validation from './validation'
import _ from 'lodash'
import Mustache from 'mustache'
import 'whatwg-fetch'
class ApiCreator {
  constructor(book, options) {
    this.setMethods(book)
    this.options = options
  }

  setMethods(book) {
    _.mapKeys(book, (chapter, key) => {
      if (Validation.isChapterConfigRequireFieldsAllDone(chapter)) {
        this[key] = this.getFetchObject.bind(this, chapter)
      }
    })
  }

  getFetchURL(injectedChapter) {
    let fetchURL = injectedChapter.url
    if (this.options && this.options.hasOwnProperty('host')) {
      fetchURL = this.options.host + fetchURL
    }
    if (
      injectedChapter.payload &&
      injectedChapter.payload.hasOwnProperty('query') &&
      injectedChapter.payload.query
    ) {
      fetchURL = fetchURL + jsonToQueryString(injectedChapter.payload.query)
    }
    return fetchURL
  }

  getFetchInit(injectedChapter) {
    const init = {
      method: injectedChapter.method,
      headers: injectedChapter.headers,
      ...injectedChapter.options
    }
    if (
      injectedChapter.payload &&
      injectedChapter.payload.hasOwnProperty('body') &&
      injectedChapter.payload.body
    ) {
      init.body = JSON.stringify(injectedChapter.payload.body)
    }
    return init
  }

  setMiddleware(fetchPromiseObject) {
    const funcs = Object.create(this.options.fetchAndThen)
    while (funcs.length > 0) {
      const func = funcs.shift()
      fetchPromiseObject = fetchPromiseObject.then(func)
    }
    return fetchPromiseObject
  }

  getFetchObject(chapter, parameters) {
    const injectedChapter = this.getInjectedChapter(chapter, parameters)
    const fetchURL = this.getFetchURL(injectedChapter)
    const fetchInit = this.getFetchInit(injectedChapter)
    let fetchPromiseObject = fetch(fetchURL, fetchInit)
    if (this.options && this.options.hasOwnProperty('fetchAndThen')) {
      fetchPromiseObject = this.setMiddleware(fetchPromiseObject)
    }
    return fetchPromiseObject
  }

  getInjectedChapter(chapter, parameters) {
    if (
      Validation.isChapterConfigRequireFieldsAllDone(chapter) &&
      Validation.isParametersTypeRight(parameters) &&
      Validation.isParametersMatchChapterConfig(chapter, parameters)
    ) {
      this.setObjectInjectedChapter(chapter, parameters)
      const stringifyChapter = JSON.stringify(chapter)
      const injectedStringifyChapter = Mustache.render(stringifyChapter, parameters)
      const injectedChapter = JSON.parse(injectedStringifyChapter)
      return injectedChapter
    }
  }

  setObjectInjectedChapter(chapter, parameters) {
    _.map(parameters, (parametersValue, parametersKey) => {
      if (typeof parametersValue === 'object') {
        const findId = `{{${parametersKey}}}`
        const replaceObj = parametersValue
        if (chapter.payload) {
          this.findStringAndInject(chapter.payload, findId, replaceObj)
        }
      }
    })
  }

  findStringAndInject(obj, findId, replaceObj) {
    _.map(obj, (value, key) => {
      if (typeof value === 'object') {
        this.findStringAndInject(value, findId, replaceObj)
      } else if (typeof value === 'string' && value === findId) {
        obj[key] = replaceObj
      }
    })
  }
}

module.exports = {
  ApiCreator
}
