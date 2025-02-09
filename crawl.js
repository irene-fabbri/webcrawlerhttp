const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){

    // count only URLs in same domain
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if( baseURLObj.hostname !== currentURLObj.hostname ) {
        return pages
    }

    // check if already crawled this page
    const normalizedCurrentURL = normalizeURL(currentURL)

    if(pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    // init this page in map
    pages[normalizedCurrentURL] = 1

    console.log(`Actively crawling: ${currentURL}`)
    let htmlBody = ''
    try {
        const resp = await fetch(currentURL)

        if ( resp.status > 399 ) {
            console.log(`HTTP error with status code: ${resp.status}, on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if ( !contentType.includes("text/html") ) {
            console.log(`no html response, content type: ${contentType}, on page ${currentURL}`)
            return pages
        }

        htmlBody = await resp.text()
    } catch (err) {
        console.log(`Error in fetch: ${err.message}, on page ${currentURL}`)
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL,nextURL,pages)
        }

        return pages
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/') {
            // relative url
            try {
                const urlObj = new URL(linkElement.href, baseURL)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`error with relative URL: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`error with absolute URL: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0,-1)
    }
    return hostPath 
}

// make the normalizeURL function available to other js files
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}