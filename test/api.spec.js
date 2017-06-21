import expect from 'expect'
import * as api from '../src/tools'

describe('File - api.js', () => {
  it('Validate isEmpty working', () => {
    expect(api.isEmpty(null)).toEqual(true)
  })
})
