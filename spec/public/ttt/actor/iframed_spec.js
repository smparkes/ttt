"use strict";
(function($){

  var debug = window.console && window.console.debug || window.debug;

  describe("ttt",function(){
    describe("iframed",function(){

      xit("should create a server",function(){
        click_link("Start server");
        expect($("a[href]:contains('Start server')").length).toBe(0);
        expect($("a:contains('Stop server')").length).toBe(1);
      });
    });

  });

}(jQuery));