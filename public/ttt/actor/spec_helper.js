"use strict";
/*jslint evil: true*/
(function(){
  if (window.Envjs && !!window.Ruby.ENV.JAZZ_JS_PATH) {
    return;
  }
  window.jazz = window.jazz || {};
  window.jazz.app_root = window.jazz.app_root || "../../..";
  window.jazz.root = window.jazz.root || window.jazz.app_root+"/vendor/jazz";
  window.jazz.helper = window.jazz.helper || window.jazz.root+"/lib/jazz/spec_helper.js";
  document.write("<script type='text/javascript' src='"+window.jazz.helper+"'></script>");
}());
