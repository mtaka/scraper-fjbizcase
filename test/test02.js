const cheerio = require('cheerio')
const $ = cheerio.load("<h2 class='title'>Hello</h2>")

$('h2.title').text('Hello there')
$('h2').addClass('welcome')

console.log($.html())