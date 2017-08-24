//! node
/*********************************************************************
 ユーティリティ
 *********************************************************************/
const fs = require('fs')

getFileName = (proc)=>{
  if(process.argv.length < 3) {
    console.log('usage node <thisfile> <targetfile>')
    return false
  }
  proc(process.argv[2])
}

doFile = (file, proc)=>{
  fs.readFile(file,'utf-8',(err, data)=>{
    if(err) { return }
    proc(data)
  })
}

exports.getFileName= getFileName
exports.doFile= doFile

