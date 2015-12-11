var assert = require('assert');
var assert = require('assert-plus');
var fs = require('fs');
var path = require('path');
var googleImageSearch = require('../app');
var html;

describe("Internal Functions", function(){
	this.timeout(5500);
	it('.getResponse()', function(done){
		googleImageSearch.getResponse("test",function(err,data){
			assert.equal(data.response.statusCode,200);
			html = data.body;
			done();
		});
	});
	it(".scrapImage()", function(done){
		googleImageSearch.scrapImage(html,function(err,data){
			assert.equal(err,false);
			html = data;
			done();
		});
	});
});

describe("API", function(){ 
	this.timeout(5500);
	it(".search", function(done){
		googleImageSearch.search({search:"test"},function(err,data){
			assert.equal(err,false);
			html = data
			done();
		});
	});
	it(".search and save to file", function(done){
		googleImageSearch.search({search:"test",save:"C:/Users/CatsPC/Desktop/NPM/google-image-search/test"},function(err,data){
			assert.equal(data,"ANd9GcSXNJw-kfJrMV6drb80jGapDlCC_wcuniW_FUlX-q3WkBgdUGAyWuVvzkM.png");
			html = data
			done();
		});
	});
	it(".search (without a callback)", function(){
		assert.throws(function(){
			googleImageSearch.search({search:"test"});
		},Error);
	});
});