const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', ()=>{
    const input = {
        'https://irene.home.org/path' : 1,
        'https://irene.home.org' : 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://irene.home.org', 3],
        ['https://irene.home.org/path', 1]
    ]

    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', ()=>{
    const input = {
        'https://irene.home.org/path1' : 1,
        'https://irene.home.org/path2' : 3,
        'https://irene.home.org/path3' : 15,
        'https://irene.home.org/path4' : 18,
        'https://irene.home.org/path5' : 2,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://irene.home.org/path4', 18],
        ['https://irene.home.org/path3', 15],
        ['https://irene.home.org/path2', 3],
        ['https://irene.home.org/path5', 2],
        ['https://irene.home.org/path1', 1]
    ]

    expect(actual).toEqual(expected)
})