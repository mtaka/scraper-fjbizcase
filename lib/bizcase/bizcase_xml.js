//! node
/*#####################################################################
 * bizcase_xml.js
 * 事例マークダウン化
 *#####################################################################*/
 'use strict'


function tagCR(s) {
  if(s == undefined) return ''
  return s.replace(/\n/g, '<br/>')
}

/*#####################################################################
 * ヘッダーのフォーマット
 *#####################################################################*/
function printHeader(arg) {
  let classifications = arg.classifications.map((e)=>{
    return `      <classification key='${e.name}'>${e.value}</classification>`
   }).join('\n')

  return `
  <header>
    <title>${arg.title}</title>
    <subtitle>${arg.subtitle}</subtitle>
    <icon_url>${arg.icon_url}</icon_url>
    <youtube_url>${arg.youtube_url}</youtube_url>
    <abstract>${arg.abstract}</abstract>
    <classifications>
${classifications}
    </classifications>
  </header>
`
}
/*#####################################################################
 * 課題と対応のフォーマット
 *#####################################################################*/
function printChallenges(csinfo) {
  let cspair_text = csinfo.items.map((e)=>{
    return `      <item>
        <challenge>${e.challenge}</challenge>
        <solution>${e.solution}</solution>
      </item>`
  }).join('\n')
  return `

  <challengesAndSolutions>
    <title>${csinfo.title}</title>
    <items>
${cspair_text}
    </items>
  </challengesAndSolutions>

`
}
/*#####################################################################
 * 各章のフォーマット
 *#####################################################################*/
function printChapter(chapter) {
  // 本文テキスト化
  let body_texts = chapter.body.map((e)=>{
    return `      <p>${e}</p>`
  }).join('\n')

  // 顧客プロフィール／画像の個別フォーマット関数
  let printResource = (e)=>{
    let caption = tagCR(e.caption)
    return `      <resource>
        <img_url>${e.img_url}</img_url>
        <caption>${caption}</caption>
      </resource>`
  }

  // 顧客プロフィール
  var customer_texts = chapter.customers.map(printResource).join('\n')
  // 顧客プロフィールが存在するときだけ、タグで囲む
  if(customer_texts != ''){
    customer_texts = `
    <customers>
${customer_texts}
    </customers>
`
  }
  // 画像
  var illustration_texts = chapter.illustrations.map(printResource).join('\n')
  // 画像が存在するときだけ、タグで囲む
  if(illustration_texts != ''){
    illustration_texts = `
    <illustrations>
${illustration_texts}
    </illustrations>
`
  }
  return `
  <chapter>
    <title>${chapter.title}</title>
    <subtitle>${tagCR(chapter.subtitle)}</subtitle>
    <body>
${body_texts}
    </body>${customer_texts}${illustration_texts}
  </chapter>
`
}
/*#####################################################################
 * 章全体のフォーマット
 *#####################################################################*/
function printChapters(chapters) {
  return `
  <chapters>

${chapters.map(printChapter).join('\n')}

  </chapters>
`

}
/*#####################################################################
 * 関連情報のフォーマット
 *#####################################################################*/
function printRelatedInfo(relatedInfo) {

  let related_info_text = relatedInfo.map((e)=>{
    let res_text = e.resources.map((res)=>{
      return `      <resource>
        <name>${res.name}</name>
        <url>${res.url}</url>
      </resource>`
    }).join('\n')
    return `    <resources about='${e.about}'>
${res_text}
    </resources>`
  }).join('\n')

  return `  <relatedInfo>
${related_info_text}
  </relatedInfo>`
}
/*#####################################################################
 * 顧客情報のフォーマット
 *#####################################################################*/
function printCustomerInfo(customerInfo) {
  // 顧客属性テーブルのフォーマット
  let attrs_text = customerInfo.attrs.map((pair)=>{
    return `    <attribute>
      <name>${pair.name}</name>
      <value>${pair.value}</value>
    </attribute>`
  }).join('\n')
  // リターン
  return `
  <customerInfo>
    <name>${customerInfo.name}</name>
    <img_url>${customerInfo.img_url}</img_url>
    <attributes asof='${customerInfo.asof}'>
${attrs_text}
    </attributes>
  </customerInfo>
`
}
/*#####################################################################
 * レコメンド情報のフォーマット
 *#####################################################################*/
function printRecommendInfo (recommendInfo) {
  let items_text = recommendInfo.map((item)=>{
    // 記述の改行を変換
    let description = tagCR(item.description)
    return `    <recommendedArticle>
      <link_url>${item.link_url}</link_url>
      <img_url>${item.img_url}</img_url>
      <customerName>${item.customer_name}</customerName>
      <recommendationType>${item.recommendation_type}</recommendationType>
      <description>${description}</description>
    </recommendedArticle>`
  }).join('\n')
  return `  <recommendInfo>
${items_text}
  </recommendInfo>`
}
/*#####################################################################
 * 全体のフォーマット
 *#####################################################################*/
function printBizCase(bizCase) {
  return `<bizCase>
${printHeader(bizCase.header)}
${printChallenges(bizCase.challengesAndSolutions)}
${printChapters(bizCase.chapters)}
${printRelatedInfo(bizCase.relatedInfo)}
${printCustomerInfo(bizCase.customerInfo)}
${printRecommendInfo(bizCase.recommendInfo)}
</bizCase>`
}



module.exports.printHeader = printHeader
module.exports.printChallenges = printChallenges
module.exports.printChapter = printChapter
module.exports.printChapters = printChapters
module.exports.printRelatedInfo = printRelatedInfo
module.exports.printCustomerInfo = printCustomerInfo
module.exports.printRecommendInfo = printRecommendInfo
module.exports.printBizCase = printBizCase





