const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


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
    console.log(`Starting crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL,{})

    printReport(pages)
}
  
main()