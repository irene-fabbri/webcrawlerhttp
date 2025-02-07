const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')

async function main(){
    const CLIs = argv.length - 2
    if (CLIs < 1){
        console.log("no website provided")
        process.exit(1)
    } else if (CLIs > 1) {
        console.log("too many command line arguments")
        process.exit(1)
    } 
    const baseURL = argv[2]
    console.log(`Starting crowl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL,{})

    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}
  
main()