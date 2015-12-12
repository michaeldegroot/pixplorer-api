var assert = require('assert');
var assert = require('assert-plus');
var fs = require('fs');
var path = require('path');
var scrapyImage = require('../app');

describe("GOOGLE API", function(){ 
	this.timeout(15000);
	before(function() {
		scrapyImage.scraper({api:"google"});
	});
	it(".search", function(done){
		scrapyImage.search({search:"test"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search and save to file", function(done){
		scrapyImage.search({search:"cat",save:"./test"},function(err,data){
			fs.unlinkSync("./test/"+data);
			assert.equal(err,null);
			done();
		});
	});
	it(".search (without a callback)", function(){
		assert.throws(function(){
			scrapyImage.search({search:"lol"});
		},Error);
	});
	it(".search large image", function(done){
		scrapyImage.search({search:"test",size:"large"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search medium image", function(done){
		scrapyImage.search({search:"test",size:"medium"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search small image", function(done){
		scrapyImage.search({search:"test",size:"small"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
});

describe("PIXPLORER API", function(){ 
	this.timeout(15000);
	before(function() {
		scrapyImage.scraper({api:"pixplorer"});
	});
	it(".search", function(done){
		scrapyImage.search({search:"test"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search and save to file", function(done){
		scrapyImage.search({search:"dog",save:"./test"},function(err,data){
			fs.unlinkSync("./test/"+data);
			assert.equal(err,null);
			done();
		});
	});
	it(".search (without a callback)", function(){
		assert.throws(function(){
			scrapyImage.search({search:"lol"});
		},Error);
	});
	it(".search large image", function(done){
		scrapyImage.search({search:"test",size:"large"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search medium image", function(done){
		scrapyImage.search({search:"test",size:"medium"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
	it(".search small image", function(done){
		scrapyImage.search({search:"test",size:"small"},function(err,data){
			assert.equal(err,null);
			done();
		});
	});
});