[![](https://nodei.co/npm/scrapy-image.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/scrapy-image)  
[![](https://david-dm.org/michaeldegroot/google-image-scraper.svg)](https://david-dm.org/michaeldegroot/google-image-scraper)
[![](https://travis-ci.org/michaeldegroot/google-image-scraper.svg?branch=master)](https://travis-ci.org/michaeldegroot/google-image-scraper)
[![](https://coveralls.io/repos/michaeldegroot/google-image-scraper/badge.svg?branch=master&service=github)](https://coveralls.io/github/michaeldegroot/google-image-scraper?branch=master)
![](https://img.shields.io/badge/Node-%3E%3D0.10-green.svg)
![](https://img.shields.io/npm/dt/scrapy-image.svg)
![](https://img.shields.io/npm/l/scrapy-image.svg)


___
# What it does
Scraps image search websites or api's and returns a list of 20 image URL's
___
# Changelog

[https://github.com/michaeldegroot/scrapy-image/commits/master](https://github.com/michaeldegroot/scrapy-image/commits/master)
___
#  Getting Started

##### 1. Start by installing the package:
    npm install scrapy-image

##### 2. Load the code
```javascript
var scrapyImage = require('scrapy-image');
scrapyImage.scraper({api:"google"});
```
##### 3. Do awesome stuff!
```javascript
scrapyImage.search({search:"cat"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 image URL's of cats
})
```
___
## API

###  .search(data, callback)
```js
data:       Object      // Object holding search query parameters (search, size, save)
callback:   Function    // Callback will return as first parameter error and second the img URL's array
````

_Search for a image, very simple._

__Example__

```javascript
scrapyImage.search({search:"cat"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 image URL's of cats
})
```

__Example__ saving the first result/image to disk

```javascript
scrapyImage.search({search:"cat",save:"c:/test"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Returns the generated filename.
})
```

__Example__ searching for a large image

```javascript
scrapyImage.search({search:"dog",size:"large"},function(err,data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 large image URL's of dogs
});
``` 
*You can choose to search for small, medium or large images*

___
## Contact
You can contact me at specamps@gmail.com
