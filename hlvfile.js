let requests = require('requests') // 请求包
let fs =require('fs') // 读写文件
let path = require('path') // 定义文件路径

requests('https://www.hltv.org/matches/2349666/lynn-vision-vs-renewal-dreamhack-open-june-2021-asia') // 请求路径
.on('data', function (chunk) {
  let regex = /<td class="statCell moneyCell ">(.*?)<\/td>/g
  // let regex = new RegExp('<div class="teamName">(.*?)<\/div>')
  let team
  while( team = regex.exec(chunk))
  {
    console.log(team[1], 11111)
  }
  fs.writeFile(path.resolve(__dirname,'index.html'),chunk,()=>{ //将请求得到的资源文件写入本地项目文件夹下的index.html（名字可改）中
      console.log("保存成功") // 数据爬取成功，输出“保存成功”
  })
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err)
  console.log('end')
})