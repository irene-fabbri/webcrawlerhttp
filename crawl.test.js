const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://irene.home.org/path'
    const actual = normalizeURL(input)
    const expected = 'irene.home.org/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol http', ()=>{
    const input = 'http://irene.home.org/path'
    const actual = normalizeURL(input)
    const expected = 'irene.home.org/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://irene.home.org/path/'
    const actual = normalizeURL(input)
    const expected = 'irene.home.org/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', ()=>{
    const input = 'https://IRENE.home.org/path'
    const actual = normalizeURL(input)
    const expected = 'irene.home.org/path'

    expect(actual).toEqual(expected)
})