var assert = require('assert');
var assert = require('assert-plus');
var fs = require('fs');
var path = require('path');
var scrapyImage = require('../app');

var unlink = true; // delete files after creation?

describe("API", function(){ 
  this.timeout(15000);
  it(".search", function(done){
    scrapyImage.search({search:"test"},function(err,data){
      assert.equal(err,null);
      done();
    });
  });
  it(".search only 1 result", function(done){
    scrapyImage.search({search:"test",amount:1},function(err,data){
      assert.equal(data.length,1);
      done();
    });
  });
  it(".search and save to file", function(done){
    scrapyImage.search({search:"dog",save:"./test"},function(err,data){
      if(unlink) fs.unlinkSync("./test/"+data);
      assert.equal(data.length,64);
      done();
    });
  });
  it(".search (without a callback and search)", function(){
    assert.throws(function(){
      scrapyImage.search();
    },Error);
  });
  it(".search (without a search)", function(){
      scrapyImage.search(false,function(err){
        assert.notEqual(err,null);
      });
  });
  it(".search large image", function(done){
    scrapyImage.search({search:"asdf",size:"large"},function(err,data){
      console.log(data);
      assert.equal(data.length,20);
      done();
    });
  });
  it(".search medium image", function(done){
    scrapyImage.search({search:"test",size:"medium"},function(err,data){
      assert.equal(data.length,20);
      done();
    });
  });
  it(".search small image", function(done){
    scrapyImage.search({search:"test",size:"small"},function(err,data){
      assert.equal(data.length,20);
      done();
    });
  });
  it(".search thumbnail image", function(done){
    scrapyImage.search({search:"test",size:"thumbnail"},function(err,data){
      assert.equal(data.length,20);
      done();
    });
  });
});