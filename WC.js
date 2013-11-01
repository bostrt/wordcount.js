(function(root){
    var WC = function() {
    };
    
    WC.bytes = function(inputSelector, callback){
        scheduleFileChange(inputSelector, function(file) {
            callback(file.size, file, inputSelector);           
        });
    };
    
    WC.longest = function(inputSelector, callback) {
        scheduleFileChange(inputSelector, function(file) {
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
    
    WC.words = function(inputSelector, callback) {
        scheduleFileChange(inputSelector, function(file) {
           var reader = new FileReader() ;
           reader.onload = function(e) {
             if (e.target.readyState === 2) {
                 var text = e.target.result;
                 if (text != undefined) {
                     text = text.trim(); // Clear ends.
                     var split = text.split(/\s{1,}/g);
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
    
    WC.chars = function(inputSelector, callback) {
        scheduleFileChange(inputSelector, function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.readyState === 2) {
                    var text = e.target.result;
                    // TODO: Complete..UNICODE vs. UTF-8???
                }
            };
            
            reader.readAsText(file);
        });
    };

    WC.lines = function(inputSelector, callback) {
        scheduleFileChange(inputSelector, function(file) {
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
    
    function scheduleFileChange(inputSelector, callback) {
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
        define(WC);
    } else if (typeof exports === 'object') {
        module.exports = WC;
    } else {
        root.WC = WC;
    }    
})(this);