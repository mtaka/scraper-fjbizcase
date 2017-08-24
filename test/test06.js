//! node
/*#####################################################################
 * test05.js
 *#####################################################################*/
//console.log(process.argv)
const util = require('../lib/util')
const loader = require('../lib/bizcase/bizcase_loader_cs')
const bcmd = require('../lib/bizcase/bizcase_markdown')
const bcxm = require('../lib/bizcase/bizcase_xml')
const client = require('cheerio-httpcli')

let p = (d)=>{
  console.log(d)
}
let pp = (d)=>{
  console.log(JSON.stringify(d))
}

//util.getFileName((filename)=>{
  //util.doFile(filename, (data) =>{
    //const bc = loader.createBizCaseFromText(data)
    //p(bcxm.printBizCase(bc))
  //})
//})


//const u = 'http://www.fujitsu.com/jp/about/resources/case-studies/cs-201707-lottecard.html'
const u = 'http://www.fujitsu.com/jp/about/resources/case-studies/cs-201707-metawater.html'
client.fetch(u, (err, $, res, body)=>{
  //console.log($('.maincontents').html())
  const bc = loader.createBizCase($)
  p(bcmd.printBizCase(bc))
})


