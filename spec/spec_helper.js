jazrb_root = this.jazrb_root || "..";
(function(){
  var run = !!this.Envjs;
  var match = /\?([^?]+)$/.exec(window.location.href);
  if(match){
    var pairs = match[1].split("&");
    $.each(pairs,function(){
      var kv = this.split("=");
      var k = kv[0];
      var v = kv[1];
      if(k == "specs"){
        run = true;
      }
    });
  }
  if(run) {
    if(!this.jasmine){
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/base.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/util.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Env.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Reporter.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Block.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/JsApiReporter.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Matchers.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/mock-timeout.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/MultiReporter.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/NestedResults.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/PrettyPrinter.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Queue.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Reporters.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Runner.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Spec.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/Suite.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/WaitsBlock.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/src/WaitsForBlock.js'></script>");
      document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/lib/TrivialReporter.js'></script>");
      if(this.Envjs){
        document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jazrb/vendor/jasmine/lib/EnvjsReporter.js'></script>");
      }
      (function(){
        var headID = document.getElementsByTagName("head")[0];         
        var cssNode = document.createElement('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = jazrb_root + "/vendor/jazrb/vendor/jasmine/lib/jasmine.css";
        cssNode.media = 'screen';
        headID.appendChild(cssNode);
      })();
    };
    !this.jQuery && document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jquery/dist/jquery.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/underscore/underscore.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/session.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/link_locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/field_locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/field_by_id_locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/field_named_locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/locators/field_labeled_locator.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/scope.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/elements/element.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/elements/field.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/elements/link.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jsrat/src/jsrat/elements/label.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/vendor/jquery.print/dist/jquery.print.js'></script>");
    document.write("<script type='text/javascript' src='" + jazrb_root + "/spec/spec_runner.js'></script>");
  }
})();