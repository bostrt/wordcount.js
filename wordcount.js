(function(root){
    var WordCount = function() {
    };

    /**
     * When a file is uploaded using the file input element with the given input
     * selector then the number of the bytes in the uploaded file is calculated
     * and then callback is called.
     * 
     * @param {string} inputSelector - The selector for a file input element.
     * @param {type} callback - Called when a file has been completely uploaded
     * and bytes have been calculated. The callback should take three parameters:
     * 
     * <p><pre>
     * callback(size, file, inputSelector)<br/>
     * &nbsp;<b>size</b> - The file size in bytes<br/>
     * &nbsp;<b>file</b> - The file that was uploaded<br/>
     * &nbsp;<b>inputSelector</b> - The original input selector for the file input element<br/>
     * &nbsp;&nbsp;being monitored.
     * </pre></p>
     * @returns {undefined}
     */
    WordCount.bytes = function(inputSelector, callback){
        addFileChangeListener(inputSelector, function(file) {
            callback(file.size, file, inputSelector);           
        });
    };

    /**
     * When a file is uploaded using the file input element with the given input
     * selector then the longest line in the file is located and the callback
     * is called.
     * 
     * @param {type} inputSelector - The selector for a file input element.
     * @param {type} callback - Called when a file has been completely uploaded
     * and the longest line has been found (if any lines). A callback should
     * take three parameters:
     * <p><pre>
     * callback(longestLine, file, inputSelector)<br/>
     * &nbsp;<b>longestLine</b> - The longest line in the file<br/>
     * &nbsp;<b>file</b> - The file that was uploaded<br/>
     * &nbsp;<b>inputSelector</b> - The original input selector for the file<br/>
     * &nbsp;&nbsp;input element being monitored.
     * </pre></p>
     * @returns {undefined}
     */
    WordCount.longest = function(inputSelector, callback) {
        addFileChangeListener(inputSelector, function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.readyState === 2) {
                    var text = e.target.result;
                    
                    var split = text.split(/\n/g);
                    if (split != null) {
                        if (split.length > 1) {
                            var longest = split[0];
                            for (var i = 1; i < split.length; i++) {
                                if (longest.length < split[i].length) {
                                    longest = split[i];
                                }
                            }
                            callback(longest, file, inputSelector);
                        } else {
                            callback(split[0], file, inputSelector);
                        }
                     } else {
                         // Call back with the only line...
                         callback(text, file, inputSelector);
                     }
                }
            };
            
            reader.readAsText(file);
        });
    };

    /**
     * When a file is uploaded using the file input element with the given input
     * selector then the number of words in the file is calculated and the
     * callback is called. A word is a non-zero-length sequence of characters
     * delimited by white space.
     * @param {type} inputSelector - The selector for a file input element.
     * @param {type} callback - Called after a file is available and the number
     * of words have been calculated. A callback should take three parameters:
     * <p><pre>
     * callback(words, file, inputSelector)<br/>
     * &nbsp;<b>words</b> - The number of words in the file<br/>
     * &nbsp;<b>file</b> - The file that was uploaded<br/>
     * &nbsp;<b>inputSelector</b> - The original input selector for the file<br/>
     * &nbsp;&nbsp;input element being monitored.
     * </pre></p>
     * @returns {undefined}
     */
    WordCount.words = function(inputSelector, callback) {
        addFileChangeListener(inputSelector, function(file) {
           var reader = new FileReader() ;
           reader.onload = function(e) {
             if (e.target.readyState === 2) {
                 var text = e.target.result;
                 if (text != undefined) {
                     text = text.trim(); // Clear ends.
                     var split = text.split(/\s+/g);
                     if (split.length === 1) {
                         if (split[0].trim() === '') {
                             callback(0, file, inputSelector);
                         } else {
                             callback(1, file, inputSelector);
                         }
                     } else {
                         callback(split.length, file, inputSelector);
                     }
                 }
             }  
           };
           
           reader.readAsText(file);
        });
    };

    /**
     * When a file is uploaded using the file input element with the given input
     * selector then the number of chars in the file are calculated and the
     * callback is called.
     * @param {type} inputSelector - The selector for a file input element.
     * @param {type} callback - Called after a file is available and the
     * number of chars in that file have been calculated. A callback should
     * take three parameters:
     * <p><pre>
     * callback(chars, file, inputSelector)<br/>
     * &nbsp;<b>chars</b> - The number of chars in the file<br/>
     * &nbsp;<b>file</b> - The file that was uploaded<br/>
     * &nbsp;<b>inputSelector</b> - The original input selector for the file<br/>
     * &nbsp;&nbsp;input element being monitored.
     * </pre></p>
     * @returns {int}
     */    
    WordCount.chars = function(inputSelector, callback) {
        addFileChangeListener(inputSelector, function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.readyState === 2) {
                    var text = e.target.result;
		    var charsLength = text.split(/./g).length;
		    callback(charsLength, file, inputSelector);
                }
            };
            
            reader.readAsText(file);
        });
    };

    /**
     * When a file is uploaded using the file input element with the given input
     * selector then the number of lines in the file are calculated and the
     * callback is called.
     * @param {type} inputSelector - The selector for a file input element.
     * @param {type} callback - Called after a file is available and the
     * number of lines in that file have been calculated. A callback should
     * take three parameters:
     * <p><pre>
     * callback(lines, file, inputSelector)<br/>
     * &nbsp;<b>lines</b> - The number of lines in the file<br/>
     * &nbsp;<b>file</b> - The file that was uploaded<br/>
     * &nbsp;<b>inputSelector</b> - The original input selector for the file<br/>
     * &nbsp;&nbsp;input element being monitored.
     * </pre></p>
     * @returns {undefined}
     */
    WordCount.lines = function(inputSelector, callback) {
        addFileChangeListener(inputSelector, function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.readyState === 2) {
                    // upload is complete.
                    if (e.loaded > 0) {
                        // File has contents
                        var string = e.target.result;
                        if (string != undefined) {
                            var matching = string.match(/\n/g);
                            if (matching != null) {
                                callback(matching.length, file, inputSelector);
                            } else {
                                // File has content but no newlines...must be 
                                // single line!
                                callback(1, file, inputSelector);
                            }
                        }
                    } else {
                        // File is empty
                        callback(0, file, inputSelector);
                    }
                }
            };
            reader.readAsBinaryString(file);
        });
    };

    /**
     * Schedules a "change" event listener on a file input element.
     * When the "change" event is fired, the callback is called for each
     * file that was supplied.
     */
    function addFileChangeListener(inputSelector, callback) {
        var input = document.getElementById(inputSelector);
        input.addEventListener("change", function(event) {
            var files = event.target.files;
            if (files != undefined) {
                for (var i = 0; i < files.length; i++) {
                    callback(files[i]);
                }
            }
        });
    };
    
    // Export the wc.js class to the world!
    if (typeof define !== 'undefined' && define.amd) {
        define(WordCount);
    } else if (typeof exports === 'object') {
        module.exports = WordCount;
    } else {
        root.WordCount = WordCount;
    }    
})(this);
