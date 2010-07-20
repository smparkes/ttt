/*jslint evil:true*/
"use strict";
(function(){
  var global = (function(){return this;}());
  var console = global.console || { debug: global.debug };

  var include = function(fn,prefix) {
    // console.debug("inc",fn,global.jazz,window.ttt_top);
    if (global.jazz) {
      global.jazz.include((global.jazz.app_root ? global.jazz.app_root+"/" : "") + fn);
    } else {
      global.document.write("<script src='"+window.ttt_top+fn+"'></script>");
    }
  };

  var each = function(object, fn) {
    return (function each(prefix, object, fn) {
      if(typeof object === "string" ||
         typeof object === "object" && object instanceof String) {
        fn(prefix.concat(object).join("/"),prefix);
      } else if(object instanceof Array) {
        for(var i=0; i < object.length; i++) {
          each(prefix,object[i],fn);
        }
      } else {
        for(var key in object) {
          each(prefix.concat(key),object[key],fn);
        }
      }
    }([], object, fn));
  };

  var css = {}; // { "public/ttt": [ "ttt", {actor:["ttt"]}]};
  each(css, function(fn) {
    if (!global.Envjs) {
      global.document.write("<link href='/"+fn+".css' rel='stylesheet' type='text/css'>");
    }
  });

  var javascript = {
    "vendor": {
      "jquery/dist": [ "jquery" ],
      "jquery.svg": [
        "jquery.svg",
        "jquery.svgdom",
        "jquery.svganim"
      ],
      underscore: ["underscore"],
      "jsrat/src": [
        "jsrat",
        {jsrat: [
          "session",
          "locators",
          {locators: [
            "locator",
            "link_locator",
            "field_locator",
            "field_by_id_locator",
            "field_by_named_locator",
            "field_named_locator",
            "field_labeled_locator"
          ]},
          "scope",
          {elements:[
            "element",
            "field",
            "link",
            "label"
          ]}
        ]}
      ],
      "jquery.print/src": [ "jquery.print" ],
      "strophejs/src": [ "base64", "md5", "core" ],
      "dramatis/lib": 
      [ "dramatis", 
        { "dramatis": [
        "class",
        "publisher",
        "actor",
        {"actor": "type"},
        {"actor":
         [ "behavior",
           "name",
           { "name": "type" },
           "interface"
         ] },
        "director",
        "runtime",
        { "runtime": [
          "callable",
          {"callable": [ "method" ]},
          "reactor",
          { "reactor": [
            "channel",
            { "channel": [
              "xmpp"
            ] }
          ] }
        ] },
        "future",
        "continuation",
        "subscriber"
      ] } ]
    }, "lib": [
      {ttt: [
        "ttt",
        "class",
        "publisher",
        "subscriber",
        "game",
        {game:["view",
              {view:["table", "svg",
                    {table:["actor"]},
                    {svg:["actor"]}
                    ]},
              "actor"]},
        "server",
        {server: ["view", "actor", {view: ["actor"]}]},
        "player",
        {player: ["actor", "view"]}
      ]
      } ]};
  each(javascript,function(fn,prefix) {
    include(fn+".js",prefix);
  });

}());