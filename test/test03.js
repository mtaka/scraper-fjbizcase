//console.log(process.argv)
const util = require('../lib/util')
const cheerio = require('cheerio')
const urljoin  = require('url-join')

function createBizCaseHeader($) {
  // タイトル、サブタイトル、アイコンパス、動画パス
  var title = $('h1.cs-main-visual__title').text()
  var youtube_url = $('iframe.youtubeIframe').attr('src')
  var icon_path = $('h1.cs-main-visual__title img').attr('src')
  var icon_url  = urljoin(base, this.icon_path)
  var subtitle  = $('p.cs-main-visual__description').text()
  // 適用（業種など）の設定
  var appliesToPath = 'dl.cs-main-visual__meta'
  var appliesTo = $(appliesToPath).map((e)=>{
    var name = $('dt', appliesToPath).text()
    var value = $('dd', appliesToPath).text()
    return { name: name, value: value }
  }).toArray()
  // 概要の設定
  var abstract_text = $('p.cs-lead__text').text()
  return {
    title: title, subtitle: subtitle,
    icon_path: icon_path, icon_url: icon_url, youtube_url: youtube_url,
    appliesTo: appliesTo,
    abstract_text: abstract_text
  }
}

class BizCaseHtml {
  constructor (base) {
    this.base = base
  }
  init ($) {
    this.$ = $
    return this
  }
  createBizCaseHeader () { return createBizCaseHeader(this.$) }
}

const base = 'http://www.fujitsu.com/'

util.getFileName((filename)=>{
  util.doFile(filename, (data) =>{
    const $ = cheerio.load(data)
    const bchtml = new BizCaseHtml(base).init($)
    console.log(bchtml.createBizCaseHeader())
  })
})



