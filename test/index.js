var assert = require('assert');
var fs = require('fs');
var wc = require('../wordcount.js');

file1 = fs.readFileSync('test/file1.txt', 'utf-8');
file2 = fs.readFileSync('test/file2.txt', 'utf-8');

describe('WordCount', function() {
    describe('longest', function() {
	it('should find longest lines', function() {
	    assert.equal(wc.longestInText(file1).length, 25);
	    assert.equal(wc.longestInText(file2).length, 1038);
	});
    });
    
    describe('words', function() {
	it('should find number of words', function() {
	    assert.equal(wc.wordsInText(file1), 9);
	    assert.equal(wc.wordsInText(file2), 13433);
	});
    });
    
    describe('lines', function() {
	it('should find number of lines', function() {
	    assert.equal(wc.linesInText(file1), 3);
	    assert.equal(wc.linesInText(file2), 299);
	});
    });

    describe('chars', function() {
	it('should find number of chars', function() {
	    assert.equal(wc.charsInText(file1), 38);
	    assert.equal(wc.charsInText(file2), 91217);
	});
    });
});
