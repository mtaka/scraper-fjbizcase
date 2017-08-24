//! node
/*#####################################################################
 * bizcase_markdown.js
 * 事例マークダウン化
 *#####################################################################*/
 'use strict'

function replaceCR(s, rep='\n        ') {
  if(s == undefined) return ''
  return s.replace(/\n+/g, rep)
}


/*#####################################################################
 * ヘッダーのフォーマット
 *#####################################################################*/
function printHeader(header) {
  let classifications = header.classifications.map((e)=>{
    return `- ${e.name}: ${e.value}`
  }).join('\n')

  return `####  【お客様事例】

# ${header.title}
## ${header.subtitle}

![タイトルアイコン](${header.icon_url})
![動画](${header.icon_url})
 [YouTube](${header.youtube_url})

## 概要

${header.abstract}

## 適用

${classifications}
`
}


/*#####################################################################
 * 課題と対応のフォーマット
 *#####################################################################*/
function printChallenges(csinfo) {
  let cspair_text = csinfo.items.map((e)=>{
    return `
- ${e.challenge}
  ↓
  ${e.solution}
`
  }).join('\n\n')
  return `
## ${csinfo.title}

${cspair_text}

`

}
/*#####################################################################
 * 各章のフォーマット
 *#####################################################################*/
function printChapter(chapter) {
  // サブタイトルの改行処理
  let subtitle = chapter.subtitle == undefined ? '' : '### '+chapter.subtitle.replace(/\n+/g, ' -- ')
  // 本文テキスト化
  let body_texts = chapter.body.map((e)=>{
    return `- ${e}`
  }).join('\n')

  // 顧客プロフィール／画像の個別フォーマット関数
  let printResource = (e)=>{
    var img_exp = ''
    if(e.img_url != undefined) {
      img_exp = `![${e.caption}](${e.img_url})`
    }
    return img_exp
  }
  var customer_texts = chapter.customers.map(printResource).join('\n')
  if(customer_texts != '') {
     customer_texts = '##### お客様\n\n' + customer_texts
  }
  var illustration_texts = chapter.illustrations.map(printResource).join('\n')
  if(illustration_texts != '') {
     illustration_texts = '##### 画像\n\n' + illustration_texts
  }
  return `
## ${chapter.title}

${subtitle}

${body_texts}

${customer_texts}

${illustration_texts}
`
}
/*#####################################################################
 * 章全体のフォーマット
 *#####################################################################*/
function printChapters(chapters) {
  return `
----
${chapters.map(printChapter).join('\n')}
----
`

}

/*#####################################################################
 * 関連情報のフォーマット
 *#####################################################################*/
function printRelatedInfo(relatedInfo) {
  let related_info_text = relatedInfo.map((e)=>{
    let res_text = e.resources.map((res)=>{
      return `- [${res.name}](${res.url})`
    }).join('\n')
    return `### ${e.about}

${res_text}
`
  }).join('\n')

  return `## 関連情報

${related_info_text}
`
}
/*#####################################################################
 * 顧客情報のフォーマット
 *#####################################################################*/
function printCustomerInfo(customerInfo) {
  // 顧客属性テーブルのフォーマット
  let attrs_text = customerInfo.attrs.map((pair)=>{
    return `|${pair.name}|${pair.value}|`
  }).join('\n')
  var img = ''
  if(customerInfo.img_url) {
    img = `![顧客画像](${customerInfo.img_url})`
  }
  // リターン
  return `## ${customerInfo.name} プロフィール ${customerInfo.asof}
${img}

|項目|内容|
|----|----|
${attrs_text}
`
}
/*#####################################################################
 * レコメンド情報のフォーマット
 *#####################################################################*/
function printRecommendInfo (recommendInfo) {
  //console.log(recommendInfo)
  let items_text = recommendInfo.map((item)=>{
    // 記述の改行を変換
    let description = replaceCR(item.description)
    return `
#### [${item.customer_name}](${item.link_url})
     ![イメージ](${item.img_url})
- 業種: ${item.recommendation_type}
- 説明: ${replaceCR(description)}`
  }).join('\n')
  return `### お薦め情報
${items_text}
`
}
/*#####################################################################
 * 全体のフォーマット
 *#####################################################################*/
function printBizCase(bizCase) {
  return `${printHeader(bizCase.header)}
${printChallenges(bizCase.challengesAndSolutions)}
${printChapters(bizCase.chapters)}
${printRelatedInfo(bizCase.relatedInfo)}
${printCustomerInfo(bizCase.customerInfo)}
${printRecommendInfo(bizCase.recommendInfo)}
`
}

module.exports.printHeader = printHeader
module.exports.printChallenges = printChallenges
module.exports.printChapter = printChapter
module.exports.printChapters = printChapters
module.exports.printRelatedInfo = printRelatedInfo
module.exports.printCustomerInfo = printCustomerInfo
module.exports.printRecommendInfo = printRecommendInfo
module.exports.printBizCase = printBizCase




