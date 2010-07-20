"use strict";
(function() {
  var global = (function(){return this;}());
  if (!window.jQuery) {
    jazz.include((jazz.app_root ? jazz.app_root+"/" : "") +
                 "vendor/jquery/dist/jquery.js");
  }
  if (!window.TTT) {
    jazz.include((jazz.app_root ? jazz.app_root+"/" : "") +
                 "lib/ttt.js");
  }
}());  
