var request = require('request');
var scraper = require('scraper');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var http = require('http');

exports.getResponse = function(search,cb){
	var url = 'http://www.google.com/search?q='+search+'&safe=off&source=lnms&tbm=isch&sa=X'
	
	request(url, function (err, response, body) {
		if (err) return(cb(err,false))
		if(response.statusCode != 200) return(cb("HTTP code is not giving a 200. Cannot continue, current HTTP code: "+response.statusCode),false);
		cb(false, {response:response,body:body});
	});
}

exports.scrapImage = function(body,cb){
	var $ = cheerio.load(body);
	var table = $('table[class=images_table]').html();
	if(!table) return(cb("Table class='images_table' could not be found in the scrapped results!",false));
	var firstImage = $('table[class=images_table] tr td a img').first()[0].attribs.src;
	cb(false,firstImage);
}

exports.saveImage = function(data,cb){
	var filename = data.img.split("/")[data.img.split("/").length-1].split("images?q=tbn:")[1] + ".png";
	request.get(data.img).on('error', function(err) {
		return(cb(err,false));
	}).pipe(fs.createWriteStream(path.join(data.save,filename)))
	cb(false,filename);
}

exports.search = function(data,cb){
	if(!data.search) return(cb("Please define what you want to search",false));
	if(!cb) throw new Error("No callback defined");
	exports.getResponse(data.search,function(err,response){
		if(!response) return(cb(err,false));
		exports.scrapImage(response.body,function(err,img){
			if(!img) return(cb(err,false));
			if(data.save){
				exports.saveImage({img:img,save:data.save},function(err,filename){
					if(!filename) return(cb(err,false));
					return(cb(false,filename));
				});
			}
			if(!data.save) cb(false,img); 
		})
	});
}