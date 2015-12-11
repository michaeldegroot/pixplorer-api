var assert = require('assert');
var assert = require('assert-plus');
var fs = require('fs');
var path = require('path');
var googleImageSearch = require('../app');

describe("API", function(){ 
	this.timeout(5500);
	it(".search", function(done){
		googleImageSearch.search({search:"test"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search and save to file", function(done){
		googleImageSearch.search({search:"test",save:"C:/Users/CatsPC/Desktop/NPM/google-image-search/test"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search (without a callback)", function(){
		assert.throws(function(){
			googleImageSearch.search({search:"test"});
		},Error);
	});
});