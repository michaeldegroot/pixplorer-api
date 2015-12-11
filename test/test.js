var assert = require('assert');
var assert = require('assert-plus');
var fs = require('fs');
var path = require('path');
var googleImageSearch = require('../app');
var html;

describe("Internal Functions", function(){
	this.timeout(5500);
	it('.getResponse()', function(done){
		googleImageSearch.getResponse("kappa",function(err,data){
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
		googleImageSearch.search("keepo",function(err,data){
			assert.equal(err,false);
			html = data
			done();
		});
	});
	it(".search (without a callback)", function(){
		assert.throws(function(){
			googleImageSearch.search("kappa");
		},Error);
	});
});