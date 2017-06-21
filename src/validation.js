import ApiBookError from './error'

export const isChapterConfigRequireFieldsAllDone = chapter => {
  if (!chapter.hasOwnProperty('url')) {
    throw ApiBookError[1]
  }
  if (!chapter.hasOwnProperty('method')) {
    throw ApiBookError[2]
  } else {
  }
  return true
}

export const isParametersTypeRight = parameters => {
  switch (typeof parameters) {
    case 'string':
      return false
    case 'number':
      return false
    default:
      return true
  }
}

export const isParametersMatchChapterConfig = (chapter, parameters) => {
  // console.log(chapter)
  return true
}
