[![](https://nodei.co/npm/pixplorer-api.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/pixplorer-api)  
[![](https://david-dm.org/michaeldegroot/pixplorer-api.svg)](https://david-dm.org/michaeldegroot/pixplorer-api)
[![](https://travis-ci.org/michaeldegroot/pixplorer-api.svg?branch=master)](https://travis-ci.org/michaeldegroot/pixplorer-api)
[![](https://coveralls.io/repos/michaeldegroot/pixplorer-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/michaeldegroot/pixplorer-api?branch=master)
![](https://img.shields.io/badge/Node-%3E%3D0.10-green.svg)
![](https://img.shields.io/npm/dt/pixplorer-api.svg)
![](https://img.shields.io/npm/l/pixplorer-api.svg)


___
# What it does
Retrieves data from the [pixplorer](http://pixplorer.co.uk/) api
___
# Changelog

[https://github.com/michaeldegroot/pixplorer-api/commits/master](https://github.com/michaeldegroot/pixplorer-api/commits/master)
___
#  Getting Started

##### 1. Start by installing the package:
    npm install pixplorer-api

##### 2. Load the code
```javascript
var pixplorer = require('pixplorer-api');
```
##### 3. Do awesome stuff!
```javascript
pixplorer.search({search:"cat"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 image URL's of cats
})
```
___
## API

###  .search(options, callback)
```js
options:    Object      // Object holding search query parameters (search, size, save)
callback:   Function    // Callback will return as first parameter error and second the img URL's array
````

_Search for a image, very simple._

__Example__

```javascript
pixplorer.search({search:"cat"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 image URL's of cats
})
```

__Example__ saving the first result/image to disk

```javascript
pixplorer.search({search:"cat",save:"c:/test"}, function(err, data){
    if(err) throw new Error(err);
    console.log(data) // Returns the generated filename.
})
```

__Example__ searching for a large image

```javascript
pixplorer.search({search:"dog",size:"large"},function(err,data){
    if(err) throw new Error(err);
    console.log(data) // Showing a array with 20 large image URL's of dogs
});
``` 
*You can choose to search for thumbnail, small, medium or large images*
___
## Contact
You can contact me at specamps@gmail.com
