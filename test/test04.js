//console.log(process.argv)
const util = require('../lib/util')
const loader = require('../lib/bizcase/bizcase_loader_cs')
const bcmd = require('../lib/bizcase/bizcase_markdown')
const bcxm = require('../lib/bizcase/bizcase_xml')
const cheerio = require('cheerio')


util.getFileName((filename)=>{
  util.doFile(filename, (data) =>{
    const $ = cheerio.load(data)
    console.log(JSON.stringify(loader.createBizCaseHeader($)))
    //console.log(loader.createBizCaseChallenges($))
    //chsol = loader.createBizCaseChallenges($)
    //console.log(JSON.stringify(loader.createRelatedInfo($)))
    //console.log(JSON.stringify(loader.createCustomerInfo($)))
    //console.log(JSON.stringify(loader.createRecommendInfo($)))
    //console.log(JSON.stringify(loader.createChaptersInfo($)))
    //console.log(JSON.stringify(loader.createBizCase($)))
    //console.log(JSON.stringify(loader.createBizCaseFromText(data)))
    let bc = loader.createBizCaseFromText(data)
  })
})

//console.log(loader.base)

