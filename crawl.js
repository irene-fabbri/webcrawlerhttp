/* 
    We need a function that accepts as input a URL string
    And returns a "normalized" URL. To "normalize" means to "make the same". So, for example, all of these URLs are the "same page" according to most websites and HTTP standards:

    https://wagslane.dev/path/
    https://wagsLane.Dev/path
    https://wagslane.dev/path
    http://wagslane.dev/path
    
    We want our normalizeURL() function to map all of those same inputs to a single normalized output: wagslane.dev/path
*/

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
    normalizeURL
}