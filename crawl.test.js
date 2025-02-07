const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
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

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody = `
    <html>
        <body> 
            <a href="https://irene.home.org">Irene's Home</a>
        </body>
    </html>
    `
    const inputBaseURL = "https://irene.home.org"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://irene.home.org/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody = `
    <html>
        <body> 
            <a href="/path/">Irene's Home</a>
        </body>
    </html>
    `
    const inputBaseURL = "https://irene.home.org"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://irene.home.org/path/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', ()=>{
    const inputHTMLBody = `
    <html>
        <body> 
            <a href="https://irene.home.org">Irene's Home</a>
            <a href="/path/">Irene's Home</a>
        </body>
    </html>
    `
    const inputBaseURL = "https://irene.home.org"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://irene.home.org/", "https://irene.home.org/path/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalidURL', ()=>{
    const inputHTMLBody = `
    <html>
        <body> 
            <a href="invalid">Invalid</a>
        </body>
    </html>
    `
    const inputBaseURL = "https://irene.home.org"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []

    expect(actual).toEqual(expected)
})