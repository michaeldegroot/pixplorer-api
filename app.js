'use strict'

var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')
var http = require('http')
var sha256 = require('sha256')
var options = {api:"pixplorer"}

exports.scraper = function(sets){
  if(sets.api){
    if(sets.api != "pixplorer" && sets.api != "google") throw new Error("Unknown api: "+sets.api)
  }
  options = sets
}

exports.search = function(data,cb){
  if(!data.size) setSize("medium")
  if(data.size) setSize(data.size)
  if(!data.search) return(cb("Please define what you want to search",null))
  if(!cb) throw new Error("No callback defined")
  getResponse(data.search,function(err,response){
    if(!response) return(cb(err,null))
    scrapImage(response.body,function(err,imgs){
      if(!imgs) return(cb(err,null))
      if(data.save){
        saveImage({img:imgs[0],save:data.save},function(err,filename){
          if(!filename) return(cb(err,null))
          return(cb(null,filename))
        })
      }
      if(!data.save) cb(null,imgs) 
    })
  })
}

function setSize(set){
  if(options.api=="google"){
    if(set == "small") options.size = "i"
    if(set == "medium") options.size = "m"
    if(set == "large") options.size = "l"
  }
  if(options.api=="pixplorer"){
    if(set == "small") options.size = "s"
    if(set == "medium") options.size = "m"
    if(set == "large") options.size = "l"
  }
}

function getResponse(search,cb){
  var url
  if(options.api=="google") url = 'http://www.google.com/search?q='+search+'&safe=off&source=lnms&tbm=isch&sa=X&tbs=isz:'+options.size
  if(options.api=="pixplorer") url = 'http://api.pixplorer.co.uk/image?word='+search+'&amount=20&size='+options.size
  request(url, function (err, response, body) {
    if (err) return(cb(err,null))
    if(response.statusCode != 200) return(cb("HTTP code is not giving a 200. Cannot continue, current HTTP code: "+response.statusCode),null)
    cb(null, {response:response,body:body})
  })
}

function scrapImage(body,cb){
  if(options.api=="google"){
    var $ = cheerio.load(body)
    var table = $('table[class=images_table]').html()
    if(!table) return(cb("Table class='images_table' could not be found in the scrapped results!",null))
    var arrayImage = $('table[class=images_table] tr td a img')
    var images = []
    for(i=0;i<arrayImage.length;i++){
      images.push(arrayImage[i].attribs.src)
    }
    cb(null,images)
  }
  
  if(options.api=="pixplorer"){
    try {
      var body = JSON.parse(body)
    } catch (e) {
      return(cb(e,null))
    }
    var images = []
    for(var i=0;i<body.images.length;i++){
      images.push(body.images[i].imageurl)
    }
    cb(null,images)
  }
}

function saveImage(data,cb){
  var filename = sha256(data.img) + path.extname(data.img.split("%")[0].split("?")[0])
  var stream = request.get(data.img).on('error', function(err) {
    return(cb(err,null))
  }).pipe(fs.createWriteStream(path.join(data.save,filename)))
  stream.on('finish', function () {
    cb(null,filename)
  })
  stream.on('error', function (err) {
    cb(err,null)
  })
} 