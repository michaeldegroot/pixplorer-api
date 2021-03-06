'use strict'

var request = require('request')
var fs = require('fs')
var path = require('path')
var http = require('http')
var sha256 = require('sha256')
var not = require('nott')

var options = {}

exports.search = function(data,cb){
  if(not(cb)) throw new Error("No callback defined")
  if(not(data.size)) setSize("tb")
  if(not(data.search)) return(cb("Please define what you want to search",null))
  if(data.size) setSize(data.size)
  options.amount = 20;
  if(data.amount) options.amount = data.amount;
  getResponse(data.search,function(err,response){
    if(not(response)) return(cb(err,null))
    scrapImage(response.body,function(err,imgs){
      if(not(imgs)) return(cb(err,null))
      if(data.save){
        saveImage({img:imgs[0],save:data.save},function(err,filename){
          if(not(filename)) return(cb(err,null))
          return(cb(null,filename))
        })
      }
      if(not(data.save)) cb(null,imgs) 
    })
  })
}

function setSize(set){
  if(set == "thumbnail") options.size = "tb"
  if(set == "small") options.size = "s"
  if(set == "medium") options.size = "m"
  if(set == "large") options.size = "l"
}

function getResponse(search,cb){
  request('http://api.pixplorer.co.uk/image?word='+search+'&amount='+options.amount+'&size='+options.size, function (err, response, body) {
    if (err) return(cb(err,null))
    if(response.statusCode != 200) return(cb("HTTP code is not giving a 200. Cannot continue, current HTTP code: "+response.statusCode),null)
    cb(null, {response:response,body:body})
  })
}

function scrapImage(body,cb){
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

function saveImage(data,cb){
  var filename = sha256(data.img) + path.extname(data.img.split("%")[0].split("?")[0]);
  var stream = request.get(data.img).on('error', function(err) {
    return(cb(err,null))
  }).pipe(fs.createWriteStream(path.join(data.save,filename))).on('finish', function () {
      cb(null,filename)
  }).on('error', function(err) {
    return(cb(err,null))
  })
}