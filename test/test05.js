//! node
/*#####################################################################
 * test05.js
 *#####################################################################*/
//console.log(process.argv)
const util = require('../lib/util')
const loader = require('../lib/bizcase/bizcase_loader_cs')
const bcmd = require('../lib/bizcase/bizcase_markdown')
const bcxm = require('../lib/bizcase/bizcase_xml')

let p = (d)=>{
  console.log(d)
}
let pp = (d)=>{
  console.log(JSON.stringify(d))
}

util.getFileName((filename)=>{
  util.doFile(filename, (data) =>{
    const bc = loader.createBizCaseFromText(data)
    //p(bcmd.printHeader(bc.header))
    //p(bcxm.printHeader(bc.header))
    //p(bcmd.printChallenges(bc.challengesAndSolutions))
    //p(bcxm.printChallenges(bc.challengesAndSolutions))
    //pp(bc.chapters)
    //p(bcmd.printChapters(bc.chapters))
    //p(bcxm.printChapters(bc.chapters))
    //pp(bc.relatedInfo)
    //p(bcmd.printRelatedInfo(bc.relatedInfo))
    //p(bcxm.printRelatedInfo(bc.relatedInfo))
    //p(bcmd.printCustomerInfo(bc.customerInfo))
    //p(bcxm.printCustomerInfo(bc.customerInfo))
    //p(bcmd.printRecommendInfo(bc.recommendInfo))
    //p(bcxm.printRecommendInfo(bc.recommendInfo))
    //p(bcmd.printBizCase(bc))
    p(bcxm.printBizCase(bc))
  })
})


