//! node
/*#####################################################################
 * bizcase_loader_cs.js
 * CS事例ローダー
 *#####################################################################*/
const cheerio = require('cheerio')
const urljoin  = require('url-join')

const base = 'http://www.fujitsu.com/'


/*#####################################################################
 * ヘッダーの取得
 *#####################################################################*/
function createBizCaseHeader($) {
  // タイトル、サブタイトル、アイコンパス、動画パス
  let title = $('h1.cs-main-visual__title').text()
  let youtube_url = $('iframe.youtubeIframe').attr('src')
  let icon_path = $('h1.cs-main-visual__title img').attr('src')
  let icon_url  = urljoin(base, icon_path)
  let subtitle  = $('p.cs-main-visual__description').text()
  // 適用（業種など）の設定
  let classifications = $('dl.cs-main-visual__meta').map((i, e)=>{
    let name = $(e).find('dt').text()
    let value = $(e).find('dd').text()
    return { name: name, value: value }
  }).toArray()
  // 概要の設定
  var abstract_text = $('p.cs-lead__text').text()
  return {
    title: title, subtitle: subtitle,
    icon_path: icon_path, icon_url: icon_url, youtube_url: youtube_url,
    classifications: classifications,
    abstract: abstract_text
  }
}
/*#####################################################################
 * 各章の情報取得
 * このメソッドだけ配列を返す
 *#####################################################################*/
function createChaptersInfo($) {
  return $('div.cs-content').has('p.cs-text').map((i, e)=>{
    // タイトル
    const title = $(e).find('h2.cs-heading__title').text()
    // サブタイトル
    const subtitle = $(e).find('p.cs-heading__description').text()
    // 文章
    const body = $(e).find('p.cs-text').map((ii, ee)=>{
      return $(ee).text()
    }).toArray()

    // お客様情報と図表情報の共通関数
    const img_getter = (ii, ee)=>{
      const img_path = $(ee).find('img').attr('src')
      const img_url = urljoin(base, img_path)
      const caption = $(ee).find('p.cs-profile__caption').text().replace(/\n/g, ';')
      return {
        img_url: img_url, caption: caption
      }
    }
    // お客様情報
    const customers = $(e).find('li.cs-profile__item').map(img_getter).toArray()
    // 図表の取得
    const illustrations = $(e).find('li.cs-illustration__item').map(img_getter).toArray()

    return {
      title: title, subtitle: subtitle, body: body,
      customers: customers, illustrations: illustrations
    }
  }).toArray()
}
/*#####################################################################
 * 課題と対応の取得
 *#####################################################################*/
function createBizCaseChallenges($) {
  const strip = (str)=>{
    return str.replace(/^\s*|\s*$/g, "")
  }
  const s2a = (str)=>{
    return str.split(/\n/)
    return str.split('\n').map((s)=>{
      return strip(s)
    }).toArray()
  }
  // 課題アイテムの特定
  const chap = $('div.cs-content').has('.cs-effects')
  // タイトルの設定
  const title = chap.find('.cs-heading__title').text()
  const challengesAndSolutions = $('li.cs-effects__item').map((i, e)=>{
    const challenge = s2a($(e).find('dt').text())
    const solution = s2a($(e).find('dd').text())
    return {challenge: challenge, solution: solution}
  }).toArray()
  return {
    title: title,
    items: challengesAndSolutions
  }
}
/*#####################################################################
 * 関連情報の取得
 *#####################################################################*/
function createRelatedInfo($) {
  var relatedInfo = []
  $('dl.cs-summary__items').each((i, dl)=>{
    $(dl).children().each((j, e)=>{
      if(e.name=='dt') {
        const about = $(e).text()
        var info = {about: about, resources: []}
        relatedInfo.push(info)
      } else if(e.name=='dd') {
        const res_url = $(e).find('a').attr('href')
        const res_name = $(e).find('a').text()
        const res = {name: res_name, url: res_url}
        relatedInfo[relatedInfo.length-1].resources.push(res)
      }
    })
  })
  return relatedInfo
}
/*#####################################################################
 * 顧客情報の取得
 *#####################################################################*/
function createCustomerInfo($) {
  const cust = $('div.cs-co-info')
  // 名前
  const name = cust.find('dl.cs-co-info__name dd').text()
  // 情報掲載日
  const asof = cust.find('p.textright').text()
  // 属性リストをテーブルから作成
  const attrs = cust.find('table.cs-co-info__detail tr').map((i, e)=>{
    const attr_name = $(e).find('th').text()
    const attr_val  = $(e).find('td').text()
    return {name: attr_name, value: attr_val}
  }).toArray()
  // 顧客画像があれば
  const img_path = $('div.cs-co-info__figure img').attr('src')
  var img_url=''
  if(img_path!=null) {
    img_url = urljoin(base, img_path)
  }
  return { name: name, attrs: attrs, asof: asof, img_url: img_url}
}
/*#####################################################################
 * レコメンド情報の設定
 * 動的に追加しているのであれば、ここで設定する意味はないかもしれない
 *#####################################################################*/
function createRecommendInfo ($) {
  return $('li.cs-recommendation__item').map((i, e)=>{
    const link_path = $(e).find('a').attr('href')
    const link_url  = urljoin(base, link_path)
    const img_path  = $(e).find('img').attr('src')
    const img_url   = urljoin(base, img_path)
    const cname_elem = $(e).find('span.cs-recommendation__co-name')
    const cname = cname_elem.text()
    const reco_type = cname_elem.next().text()
    const desc = $(e).find('span.cs-recommendation__text').text()
    return {
      link_url: link_url, img_url: img_url,
      customer_name: cname, recommendation_type: reco_type, description: desc
    }
  }).toArray()
}
/*#####################################################################
 * 全体の取得
 *#####################################################################*/
function createBizCase($) {
  return {
    className: 'bizCase',
    header: createBizCaseHeader($),
    challengesAndSolutions: createBizCaseChallenges($),
    chapters: createChaptersInfo($),
    relatedInfo: createRelatedInfo($),
    customerInfo: createCustomerInfo($),
    recommendInfo: createRecommendInfo($)
  }
}
/*#####################################################################
 * 全体の取得（本文渡し）
 *#####################################################################*/
function createBizCaseFromText(text) {
  const $ = cheerio.load(text)
  return createBizCase($)
}

module.exports.base = base
module.exports.createBizCaseHeader = createBizCaseHeader
module.exports.createBizCaseChallenges = createBizCaseChallenges
module.exports.createChaptersInfo = createChaptersInfo
module.exports.createRelatedInfo = createRelatedInfo
module.exports.createCustomerInfo = createCustomerInfo
module.exports.createRecommendInfo = createRecommendInfo
module.exports.createBizCase = createBizCase
module.exports.createBizCaseFromText = createBizCaseFromText


