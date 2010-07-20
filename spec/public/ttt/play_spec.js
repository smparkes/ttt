"use strict";
(function($){

  describe("play",function(){

    it("should exist",function(){
      expect($("title:contains('Play')").size()).toBeGreaterThan(0);
    });

    it("should have a sign in control",function(){
      expect($("#client").size()).toBe(1);
    });

    it("should have an object associated with the sign in control",function(){
      expect($("#client").data("behavior")).toBeDefined();
    });

    it("should have a join control",function(){
      expect($("#server").size()).toBe(1);
    });

    it("should have an object associated with the server control",function(){
      expect($("#server").data("behavior")).toBeDefined();
    });

    it("should disable link until connect has a string",function(){
      $("#client .value input").val("").change();
      expect($("#client .control a").attr("href")).toBeUndefined();
    });

    it("should enable the link when it has a string",function(){
      $("#client .value a").eq(0).click();
      expect($("#client .control a").attr("href")).toBeDefined();
    });

  });


}(jQuery));