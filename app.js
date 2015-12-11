var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var http = require('http');

exports.search = function(data,cb){
	if(!data.search) return(cb("Please define what you want to search",false));
	if(!cb) throw new Error("No callback defined");
	getResponse(data.search,function(err,response){
		if(!response) return(cb(err,null));
		scrapImage(response.body,function(err,imgs){
			if(!imgs) return(cb(err,null));
			if(data.save){
				saveImage({img:imgs[0],save:data.save},function(err,filename){
					if(!filename) return(cb(err,null));
					return(cb(null,filename));
				});
			}
			if(!data.save) cb(null,imgs); 
		})
	});
}

function getResponse(search,cb){
	request('http://www.google.com/search?q='+search+'&safe=off&source=lnms&tbm=isch&sa=X', function (err, response, body) {
		if (err) return(cb(err,null))
		if(response.statusCode != 200) return(cb("HTTP code is not giving a 200. Cannot continue, current HTTP code: "+response.statusCode),false);
		cb(null, {response:response,body:body});
	});
}

function scrapImage(body,cb){
	var $ = cheerio.load(body);
	var table = $('table[class=images_table]').html();
	if(!table) return(cb("Table class='images_table' could not be found in the scrapped results!",false));
	var arrayImage = $('table[class=images_table] tr td a img');
	var images = [];
	for(i=0;i<arrayImage.length;i++){
		images.push(arrayImage[i].attribs.src);
	}
	cb(null,images);
}

function saveImage(data,cb){
	var filename = data.img.split("/")[data.img.split("/").length-1].split("images?q=tbn:")[1] + ".png";
	request.get(data.img).on('error', function(err) {
		return(cb(err,null));
	}).pipe(fs.createWriteStream(path.join(data.save,filename)))
	cb(null,filename);
}