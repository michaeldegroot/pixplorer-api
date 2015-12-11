var request = require('request');
var scraper = require('scraper');
var cheerio = require('cheerio');

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

exports.search = function(search,cb){
	if(!search) return(cb("Please define what you want to search",false));
	if(!cb) throw new Error("No callback defined");
	exports.getResponse(search,function(err,response){
		if(!response) return(cb(err,false));
		exports.scrapImage(response.body,function(err,img){
			if(!img) return(cb(err,false));
			cb(false,img);
		})
	});
}