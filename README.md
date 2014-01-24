WordCount.js [![Build Status](https://travis-ci.org/bostrt/wordcount.js.png?branch=master)](https://travis-ci.org/bostrt/wordcount.js) <img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">
============
*&copy; 2013 Robert Bost*

**Author:** Robert Bost <bostrt at gmail dot com>

**Demo:** http://bostrt.github.io/wordcount.js/

WordCount.js is a client-side JS and Node.js library that counts bytes, words, lines
chars, and calculates the longest line of a file using the HTML5 File API.

Install
=======

    bower install wordcount.js

Examples
========

```
<html>
  <head>
    <script type="text/javascript" src="wordcount.js"></script>
  </head>
  <body>
    <input type="file" id="input"/>
  </body>
</html>
...

WordCount.bytes("input", function(size, file, inputSelector) {
  console.log("Number of bytes: " + size);
});


WordCount.chars("input", function(chars) {
  console.log("Number of characters: " + chars);
});
```

Tests
=====

    npm install -g mocha
    mocha

# Callbacks
Callbacks are passed into each of WordCount's
functions. Each callback should accept 3 parameters, (1) the value that the
function is calculating or finding, (2) the File object that was uploaded,
(3) and the ID selector of the file input element.
`callback(value, file, selector)`


API
===

WordCount.bytes(selector, callback)
-----------------------------------
When a file is uploaded using the file input element with the given input
selector then the number of the bytes in the uploaded file is calculated
and then callback is called.


**Parameters**

**selector**:  *String*,  - The ID selector for a file input element.

**callback**:  *Function*,  - Called when a file has been completely uploaded and bytes have been calculated.

WordCount.longest(selector, callback)
-------------------------------------
When a file is uploaded using the file input element with the given input
selector then the longest line in the file is located and the callback
is called.



**Parameters**

**selector**:  *String*,  - The ID selector for a file input element.

**callback**:  *Function*,  - Called when a file has been completely uploaded and the longest line has been found.

WordCount.words(selector, callback)
-----------------------------------
When a file is uploaded using the file input element with the given input
selector then the number of words in the file is calculated and the
callback is called. A word is a non-zero-length sequence of characters
delimited by white space.


**Parameters**

**selector**:  *String*,  - The ID selector for a file input element.

**callback**:  *Function*,  - Called after a file is available and the number of words have been calculated.

WordCount.chars(selector, callback)
-----------------------------------
When a file is uploaded using the file input element with the given input
selector then the number of chars in the file are calculated and the
callback is called.


**Parameters**

**selector**:  *String*,  - The ID selector for a file input element.

**callback**:  *Function*,  - Called after a file is available and the number of chars in that file have been calculated.

WordCount.lines(selector, callback)
-----------------------------------
When a file is uploaded using the file input element with the given input
selector then the number of lines in the file are calculated and the
callback is called.


**Parameters**

**selector**:  *String*,  - The ID selector for a file input element.

**callback**:  *Function*,  - Called after a file is available and the number of lines in that file have been calculated.
